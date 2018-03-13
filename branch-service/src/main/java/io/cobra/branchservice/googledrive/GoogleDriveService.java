package io.cobra.branchservice.googledrive;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

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
            System.exit(1);
        }
    }
    
    public String createFolder(String name) throws IOException {
        File fileMetadata = new File();
        
        fileMetadata.setName(name);
        fileMetadata.setParents(Collections.singletonList(GOOGLE_DRIVE_IMAGES_FOLDER_ID));
        fileMetadata.setMimeType(MimeType.FOLDER);
        
        File file = googleDrive.files()
                               .create(fileMetadata)
                               .setFields("id")
                               .execute();
        return file.getId();
    }
}