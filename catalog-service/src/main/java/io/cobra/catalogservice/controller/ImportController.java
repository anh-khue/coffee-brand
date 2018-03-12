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
    private final SustenanceRepository sustenanceRepository;
    private final ImportService importService;

    public ImportController(SustenanceRepository sustenanceRepository,
                            ImportService importService) {
        this.sustenanceRepository = sustenanceRepository;
        this.importService = importService;
    }

    @PostMapping("/importExcel")
    public void createSustenanceFromExcel(File excel) {
        List<Sustenance> sustenances = importService.read(excel);
        System.out.println("DuyDPD - List sustenance size: " + sustenances.size());
        for (Sustenance sustenance : sustenances) {
            System.out.println("DuyDPD - Sustenance: " + sustenance.getName());
            sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.sustenanceRepository.save(sustenance);
        }
    }
}
