package io.cobra.branchservice.googledrive;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

import static com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.load;

@Component
public class GoogleDriveServiceFactory {
    
    private static final String APPLICATION_NAME = "Cobra Branch Service";
    
    private static final File CREDENTIALS_STORE_DIRECTORY = new File(System.getProperty("user.home"),
                                                                     ".credentials/drive-java-quickstart");
    
    private static FileDataStoreFactory DATA_STORE_FACTORY;
    
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    
    private static HttpTransport HTTP_TRANSPORT;
    
    private static final List<String> SCOPES = Arrays.asList(DriveScopes.DRIVE_FILE, DriveScopes.DRIVE_METADATA);
    
    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(CREDENTIALS_STORE_DIRECTORY);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }
    
    private static Credential authorize() throws IOException {
        InputStream inputStream = GoogleDriveService.class.getResourceAsStream("/client_secret.json");
        GoogleClientSecrets clientSecrets = load(JSON_FACTORY, new InputStreamReader(inputStream));
        
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT,
                                                                                   JSON_FACTORY,
                                                                                   clientSecrets,
                                                                                   SCOPES)
                                                   .setDataStoreFactory(DATA_STORE_FACTORY)
                                                   .setAccessType("offline")
                                                   .build();
        
        Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
        
        System.out.println("Credentials saved to " + CREDENTIALS_STORE_DIRECTORY.getAbsolutePath());
        return credential;
    }
    
    static Drive googleDriveService() throws IOException {
        Credential credential = authorize();
        return new Drive.Builder(HTTP_TRANSPORT,
                                 JSON_FACTORY,
                                 credential)
                       .setApplicationName(APPLICATION_NAME)
                       .build();
    }
}
