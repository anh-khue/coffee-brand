package io.cobra.orderservice.service;

import io.cobra.orderservice.model.Receipt;
import io.cobra.orderservice.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<Receipt> getAll(){
        return this.receiptRepository.findAll();
    }

    public void createReceipt(Receipt receipt){
        this.receiptRepository.save(receipt);
    }

    public Receipt findReceiptById(int id){
        return this.receiptRepository.findById(id);
    }

    public void deleteReceipt(int id){
        this.receiptRepository.deleteById(id);
    }

    public void updateReceipt(Receipt receipt){
        if(this.receiptRepository.
                findByCashierIdAndMemberId(receipt.getCashierId()
                        , receipt.getMemberId())!=null){
            this.receiptRepository.save(receipt);
        }
    }

}
