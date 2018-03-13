package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.service.ImportService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.File;

@Controller
public class ImportController {
    private final ImportService importService;

    public ImportController(ImportService importService) {
        this.importService = importService;
    }

    @GetMapping("/import")
    public void createSustenanceFromExcel() {
        this.importService.importData(new File("Template_Import_Sustenance.xlsx"));
    }
}
