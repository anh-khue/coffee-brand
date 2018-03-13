package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.repository.SustenanceRepository;
import io.cobra.catalogservice.service.ImportService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.File;
import java.sql.Timestamp;
import java.util.List;

@Controller
public class ImportController {
    private static final String DEFAULT_IMAGE_ID = "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m";

    private final SustenanceRepository sustenanceRepository;
    private final ImportService importService;

    public ImportController(SustenanceRepository sustenanceRepository,
                            ImportService importService) {
        this.sustenanceRepository = sustenanceRepository;
        this.importService = importService;
    }

    @PostMapping("/import")
    public void createSustenanceFromExcel(File excel) {
        List<Sustenance> sustenances = importService.read(excel);
        for (Sustenance sustenance : sustenances) {
            sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            sustenance.setImageId(DEFAULT_IMAGE_ID);
            this.sustenanceRepository.save(sustenance);
        }
    }
}
