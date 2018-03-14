package io.cobra.branchservice.service.googledrive;

import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static io.cobra.branchservice.constant.GoogleDriveConstants.GOOGLE_DRIVE_IMAGES_FOLDER_ID;
import static io.cobra.branchservice.constant.GoogleDriveConstants.MimeType;

@Service
public class GoogleDriveService {
    
    private static Drive googleDrive;
    
    static {
        try {
            googleDrive = GoogleDriveServiceFactory.googleDriveService();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public String createFolder(String folderName) throws IOException {
        File fileMetadata = new File();
        
        fileMetadata.setName(folderName);
        fileMetadata.setParents(Collections.singletonList(GOOGLE_DRIVE_IMAGES_FOLDER_ID));
        fileMetadata.setMimeType(MimeType.FOLDER);
        
        File file = googleDrive.files()
                               .create(fileMetadata)
                               .setFields("id")
                               .execute();
        return file.getId();
    }
    
    public List<String> getChildFiles(String folderId) throws IOException {
        List<String> idList = new ArrayList<>();
        
        String pageToken = null;
        do {
            FileList fileList = googleDrive.files().list()
                                           .setQ("'" + folderId + "' in parents")
                                           .setSpaces("drive")
                                           .setFields("nextPageToken, files(id, name, parents)")
                                           .setPageToken(pageToken)
                                           .execute();
            for (File file : fileList.getFiles()) {
                idList.add(file.getId());
            }
            pageToken = fileList.getNextPageToken();
        } while (pageToken != null);
        
        return idList;
    }
    
    public String uploadImage(java.io.File image, String folderId) throws IOException {
        File fileMetadata = new File();
        
        fileMetadata.setName(image.getName());
        fileMetadata.setParents(Collections.singletonList(folderId));
        
        FileContent mediaContent = new FileContent("image/jpeg", image);
        File file = googleDrive.files().create(fileMetadata, mediaContent)
                               .setFields("id, parents")
                               .execute();
        return file.getId();
    }
}