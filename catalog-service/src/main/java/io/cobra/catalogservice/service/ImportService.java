package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.repository.SustenanceHasIngredientRepository;
import io.cobra.catalogservice.repository.SustenanceRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static io.cobra.catalogservice.constant.ImportConstants.*;

@Service
public class ImportService {
    private static final String DEFAULT_IMAGE_ID = "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m";

    private final SustenanceRepository sustenanceRepository;
    private final SustenanceHasIngredientRepository sustenanceHasIngredientRepository;

    private final SustenanceService sustenanceService;

    public ImportService(SustenanceRepository sustenanceRepository,
                         SustenanceHasIngredientRepository sustenanceHasIngredientRepository,
                         SustenanceService sustenanceService) {
        this.sustenanceRepository = sustenanceRepository;
        this.sustenanceHasIngredientRepository = sustenanceHasIngredientRepository;
        this.sustenanceService = sustenanceService;
    }

    public void importData(MultipartFile excel) {
        File file = this.sustenanceService.handleMultipartFile(excel);
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            Sheet sheet = workbook.getSheetAt(0);
            Row headers = sheet.getRow(ROW_HEADERS_INDEX);
            forRow : for (int i = ROW_DATA_INDEX; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                Sustenance sustenance = new Sustenance();
                String ingredientIdsString = "";
                for (int j = 0; j < CELL_DATA_END; j++) {
                    Cell cell = row.getCell(j);
                    Cell header = headers.getCell(j);
                    switch (header.getStringCellValue()) {
                        case HEADER_NAME: {
                            if (cell.getCellType() == Cell.CELL_TYPE_BLANK) {
                                continue forRow;
                            }
                            sustenance.setName(cell.getStringCellValue());
                            break;
                        }
                        case HEADER_PRICE: {
                            if (cell.getCellType() == Cell.CELL_TYPE_BLANK || cell.getCellType() != Cell.CELL_TYPE_NUMERIC) {
                                sustenance.setPrice(DEFAULT_PRICE);
                            } else {
                                sustenance.setPrice(cell.getNumericCellValue());
                            }
                            break;
                        }
                        case HEADER_DISCOUNT: {
                            if (cell.getCellType() == Cell.CELL_TYPE_BLANK || cell.getCellType() != Cell.CELL_TYPE_NUMERIC) {
                                sustenance.setDiscount(DEFAULT_DISCOUNT);
                            } else {
                                sustenance.setDiscount(cell.getNumericCellValue());
                            }
                            break;
                        }
                        case HEADER_UNIT: {
                            if (cell.getCellType() == Cell.CELL_TYPE_BLANK || cell.getCellType() != Cell.CELL_TYPE_NUMERIC) {
                                sustenance.setUnit(DEFAULT_UNIT);
                            } else {
                                sustenance.setUnit((int) cell.getNumericCellValue());
                            }
                            break;
                        }
                        case HEADER_TYPE: {
                            if (cell.getCellType() == Cell.CELL_TYPE_BLANK || cell.getCellType() != Cell.CELL_TYPE_NUMERIC) {
                                sustenance.setTypeId(DEFAULT_TYPE_ID);
                            } else {
                                sustenance.setTypeId((int) cell.getNumericCellValue());
                            }
                            break;
                        }
                        case HEADER_INGREDIENTS: {
                            if (cell.getCellType() != Cell.CELL_TYPE_BLANK) {
                                if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                                    ingredientIdsString = Integer.toString((int) cell.getNumericCellValue());
                                } else {
                                    ingredientIdsString = cell.getStringCellValue();
                                }
                            }
                            break;
                        }
                    }
                }
                sustenance.setImageId(DEFAULT_IMAGE_ID);
                sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
                this.sustenanceRepository.save(sustenance);
                this.sustenanceRepository.flush();
                if (!ingredientIdsString.equals("")) {
                    setIngredients(sustenance.getId(), ingredientIdsString);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        file.delete();
    }

    private void setIngredients(int sustenanceId, String ingredientIdsString) {
        String[] ingredientIds = ingredientIdsString.split(", ");
        for (String id : ingredientIds) {
            int ingredientId = Integer.parseInt(id);
            this.sustenanceHasIngredientRepository.save(new SustenanceHasIngredient(ingredientId, sustenanceId));
        }
    }
}
