package io.cobra.orderservice.controller;


import io.cobra.orderservice.constant.Constant;
import io.cobra.orderservice.model.Receipt;
import io.cobra.orderservice.service.ReceiptService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class ReceiptController {

    private final ReceiptService receiptService;


    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @PostMapping(value = "/receipt", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertOrder(@RequestBody Receipt receipt) {
        receipt.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
        receipt.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        receipt.setStatus(Constant.ON_GOING);
        receiptService.createReceipt(receipt);
    }

    @GetMapping("/receipt")
    public List<Receipt> viewAllReciept() {
        return this.receiptService.getAll();
    }

    @GetMapping("/receipt/{id}")
    public Receipt getReceitById(@PathVariable("id") int id) {
        return this.receiptService.findReceiptById(id);
    }

    @DeleteMapping(value = "/receipt/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void removeReceipt(@PathVariable("id") int id) {
        this.receiptService.deleteReceipt(id);
    }

    @PutMapping(value = "/receipt/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateReceipt(@RequestBody Receipt receipt) {
        if (this.receiptService.findReceiptById(receipt.getId()) != null) {
            receipt.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
            receipt.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
            receipt.setStatus(Constant.ON_GOING);
            this.receiptService.updateReceipt(receipt);
        }
    }
}
