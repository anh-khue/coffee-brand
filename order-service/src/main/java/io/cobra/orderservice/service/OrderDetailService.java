package io.cobra.orderservice.service;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {
    
    private final OrderDetailRepository orderDetailRepository;
    
    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }
    
    public List<OrderDetail> getAll() {
        return this.orderDetailRepository.findAll();
    }
    
    public Optional<OrderDetail> getById(int id) {
        return this.orderDetailRepository.findById(id);
    }
    
    public Integer create(OrderDetail orderDetail, double sustenanceDiscountRate, double memberDiscountRate) {
        return orderDetailRepository.findByOrderIdAndSustenanceId(orderDetail.getOrderId(),
                                                                  orderDetail.getSustenanceId())
                                    .map(foundOrderDetail -> {
                                        foundOrderDetail.setQuantity(foundOrderDetail.getQuantity() + 1);
                                        updateTotal(foundOrderDetail);
                                        return foundOrderDetail.getId();
                                    })
                                    .orElseGet(() -> {
                                        double discountRate = sustenanceDiscountRate > memberDiscountRate ?
                                                              sustenanceDiscountRate : memberDiscountRate;
            
                                        orderDetail.setDiscountRate(discountRate);
                                        updateTotal(orderDetail);
                                        orderDetailRepository.save(orderDetail);
                                        orderDetailRepository.flush();
                                        return orderDetail.getId();
                                    });
    }
    
    public void delete(int id) {
        this.orderDetailRepository.deleteById(id);
    }
    
    List<OrderDetail> getByOrderId(int receiptId) {
        return this.orderDetailRepository.findByOrderId(receiptId);
    }
    
    private void updateTotal(OrderDetail orderDetail) {
        double total = orderDetail.getDiscountRate() != 0
                       ? orderDetail.getPrice() * (((100 - orderDetail.getDiscountRate())) / 100) * orderDetail.getQuantity()
                       : orderDetail.getPrice() * orderDetail.getQuantity();
        orderDetail.setTotal(total);
    }
}
