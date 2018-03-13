package io.cobra.orderservice.controller;


import io.cobra.orderservice.model.ReceiptEntity;
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

    @PostMapping(value = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertOrder(@RequestBody ReceiptEntity receiptEntity) {
        receiptEntity.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
        receiptEntity.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        receiptService.createOrder(receiptEntity);
    }

    @GetMapping("/order")
    public List<ReceiptEntity> viewAllSustenance() {
        return this.receiptService.getAll();
    }

    @GetMapping("/order/{id}")
    public ReceiptEntity getOrderById(@PathVariable("id") int id) {
        return this.receiptService.findOrderById(id);
    }

    @PostMapping(value = "/order/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void removeReceipt(@PathVariable("id") int id){
        this.receiptService.deleteReceipt(id);
    }
}
