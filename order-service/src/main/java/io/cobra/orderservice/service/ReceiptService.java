package io.cobra.orderservice.service;

import io.cobra.orderservice.model.ReceiptEntity;
import io.cobra.orderservice.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<ReceiptEntity> getAll(){
        return this.receiptRepository.findAll();
    }

    public void createOrder(ReceiptEntity receiptEntity){
        this.receiptRepository.save(receiptEntity);
    }

    public ReceiptEntity findOrderById(int id){
        return this.receiptRepository.findById(id);
    }

    public void deleteReceipt(int id){
        this.receiptRepository.deleteById(id);
    }
}
