package io.cobra.orderservice.service;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    public void createOrderDetail(OrderDetail orderDetail) {
        this.orderDetailRepository.save(orderDetail);
    }

    public void updateOrderDetail(OrderDetail orderDetail){
        if (this.orderDetailRepository
                .findBySustenanceIdAndOrderId(orderDetail.getSustenanceId()
                        , orderDetail.getOrderId()) != null) {
            this.orderDetailRepository.save(orderDetail);
        }
    }

    public List<OrderDetail> getALl() {
        return this.orderDetailRepository.findAll();
    }

    public OrderDetail getOrderDetailById(int id) {
        return this.orderDetailRepository.findById(id);
    }

    public void deleteOrderDetail(int id) {
        this.orderDetailRepository.deleteById(id);
    }

    public List<OrderDetail> getOrderDetailByReceiptId(int receiptId){
        return this.orderDetailRepository.findAllByOrderId(receiptId);
    }
}
