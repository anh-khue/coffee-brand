package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.repository.SustenanceRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static io.cobra.catalogservice.constant.ImportConstants.*;

@Service
public class ImportService {
    private static final String DEFAULT_IMAGE_ID = "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m";

    private final SustenanceRepository sustenanceRepository;

    public ImportService(SustenanceRepository sustenanceRepository) {
        this.sustenanceRepository = sustenanceRepository;
    }

    private List<Sustenance> readData(File file) {
        List<Sustenance> sustenances = null;
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            Sheet sheet = workbook.getSheetAt(0);
            Row headers = sheet.getRow(ROW_HEADERS_INDEX);
            sustenances = new ArrayList<>();
            for (int i = ROW_DATA_INDEX; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                Sustenance sustenance = new Sustenance();
                for (int j = 0; j < CELL_DATA_END; j++) {
                    Cell cell = row.getCell(j);
                    Cell header = headers.getCell(j);
                    switch (header.getStringCellValue()) {
                        case HEADER_NAME: {
                            sustenance.setName(cell.getStringCellValue());
                            break;
                        }
                        case HEADER_PRICE: {
                            sustenance.setPrice(cell.getNumericCellValue());
                            break;
                        }
                        case HEADER_DISCOUNT: {
                            sustenance.setDiscount(cell.getNumericCellValue());
                            break;
                        }
                        case HEADER_UNIT: {
                            sustenance.setUnit((int) cell.getNumericCellValue());
                            break;
                        }
                        case HEADER_TYPE_ID: {
                            sustenance.setTypeId((int) cell.getNumericCellValue());
                            break;
                        }
                    }
                }
                sustenances.add(sustenance);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sustenances;
    }

    public void importData(File file) {
        List<Sustenance> sustenances = readData(file);
        for (Sustenance sustenance : sustenances) {
            sustenance.setImageId(DEFAULT_IMAGE_ID);
            sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.sustenanceRepository.save(sustenance);
        }
    }
}
