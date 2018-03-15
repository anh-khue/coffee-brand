package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.service.ImportService;
import io.cobra.catalogservice.service.SustenanceService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Controller
public class ImportController {
//    private static final String DEFAULT_EXCEL_TEMPLATE_FILE_NAME = "Template_Import_Sustenance.xlsm";

    private final ImportService importService;
    private final SustenanceService sustenanceService;

    public ImportController(ImportService importService,
                            SustenanceService sustenanceService) {
        this.importService = importService;
        this.sustenanceService = sustenanceService;
    }

    @PostMapping("/import")
    public void createSustenanceFromExcel(@RequestParam("file") MultipartFile excel) {
        this.importService.importData(this.sustenanceService.handleMultipartFile(excel));
    }
}
