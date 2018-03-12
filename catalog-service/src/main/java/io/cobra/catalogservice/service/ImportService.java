package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Sustenance;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImportService {
    private static final String HEADER_NAME = "Name";
    private static final String HEADER_PRICE = "Price (VND)";
    private static final String HEADER_DISCOUNT = "Discount (%)";
    private static final String HEADER_UNIT = "Unit";
    private static final String HEADER_TYPE = "Type (Select)";

    private static final int ROW_HEADERS_INDEX = 0;
    private static final int ROW_DATA_INDEX = 1; //Skip title, headers...
    private static final int CELL_DATA_END = 5;

    public List<Sustenance> read(File file) {
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
                        case HEADER_TYPE: {
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
}
