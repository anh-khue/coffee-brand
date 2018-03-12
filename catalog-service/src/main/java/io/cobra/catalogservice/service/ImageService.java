package io.cobra.catalogservice.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

@Service
public class ImageService {

    private static final String APPLICATION_NAME = "Drive API Java Quickstart";

    private static final java.io.File DATA_STORE_DIR = new java.io.File(
            System.getProperty("user.home"), ".credentials/drive-java-quickstart");

    private static FileDataStoreFactory DATA_STORE_FACTORY;

    private static final JsonFactory JSON_FACTORY =
            JacksonFactory.getDefaultInstance();

    private static HttpTransport HTTP_TRANSPORT;

    private static final List<String> SCOPES =
            Collections.singletonList(DriveScopes.DRIVE);

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }

    public static Credential authorize() throws IOException {
        // Load client secrets.
        InputStream in =
                ImageService.class.getResourceAsStream("/client_secret.json");
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                        .setDataStoreFactory(DATA_STORE_FACTORY)
                        .setAccessType("offline")
                        .build();
        Credential credential = new AuthorizationCodeInstalledApp(
                flow, new LocalServerReceiver()).authorize("user");
        System.out.println(
                "Credentials saved to " + DATA_STORE_DIR.getAbsolutePath());
        return credential;
    }

    public static Drive getDriveService() throws IOException {
        Credential credential = authorize();
        return new Drive.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public static String generateImageId() {
        String fileId = null;
        try {
            // Build a new authorized API client service.
            Drive service = getDriveService();

            String folderId = "1MNWE5ECjTs1FHSJPMsfRhDKnOJ9whUb0";
            File fileMetadata = new File();
            fileMetadata.setName("cappuccino.jpg");
            fileMetadata.setParents(Collections.singletonList(folderId));
            java.io.File filePath = new java.io.File("images/cappuccino.jpg");
            FileContent mediaContent = new FileContent("image/jpeg", filePath);
            File file = service.files().create(fileMetadata, mediaContent)
                    .setFields("id, parents")
                    .execute();
            fileId = file.getId();
            System.out.println("File ID: " + fileId);

//            File searchFile = service.files().get("1pHBBOK2V5ZYTWW_tLZ_-4hsKwfUX7ULS").execute();
//            System.out.println(searchFile.getName());
//            System.out.println(searchFile.getThumbnailLink());
//            System.out.println(searchFile.getIconLink());
//            System.out.println(searchFile.getWebContentLink());
//            System.out.println(searchFile.getWebViewLink());
//            System.out.println(searchFile.getMimeType());
//
//            // Print the names and IDs for up to 10 files.
//            FileList result = service.files().list()
//                    .setPageSize(10)
//                    .setFields("nextPageToken, files(id, name)")
//                    .execute();
//            List<File> files = result.getFiles();
//            if (files == null || files.size() == 0) {
//                System.out.println("No files found.");
//            } else {
//                System.out.println("Files:");
//                for (File file : files) {
//                    System.out.printf("%s (%s)\n", file.getName(), file.getId());
//                }
//            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileId;
    }
}