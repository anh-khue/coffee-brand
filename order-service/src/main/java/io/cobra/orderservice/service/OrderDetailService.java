package io.cobra.orderservice.service;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {
    
    private final OrderDetailRepository orderDetailRepository;
    
    private final OrderService orderService;
    
    public OrderDetailService(OrderDetailRepository orderDetailRepository, OrderService orderService) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderService = orderService;
    }
    
    public List<OrderDetail> getAll() {
        return this.orderDetailRepository.findAll();
    }
    
    public Optional<OrderDetail> getById(int id) {
        return this.orderDetailRepository.findById(id);
    }
    
    public Integer create(OrderDetail orderDetail, Double memberDiscountRate) {
        
        Optional<OrderDetail> optionalDetail = orderDetailRepository
                                                       .findByOrderIdAndSustenanceId(orderDetail.getOrderId(),
                                                                                     orderDetail.getSustenanceId());
        optionalDetail.map(foundOrderDetail -> {
            foundOrderDetail.setQuantity(foundOrderDetail.getQuantity() + 1);
            return foundOrderDetail.getId();
        });
        
        orderDetailRepository.save(orderDetail);
        orderDetailRepository.flush();
        return orderDetail.getId();
        
//        Order order = this.orderService.getById(orderDetail.getOrderId()).get();
//        List<OrderDetail> orderDetails = getByOrderId(order.getId());
//        double total = orderDetail.getPrice() * orderDetail.getQuantity();
//
//        if (memberDiscountRate == 0) {
//            orderDetail.setTotal(total);
//            total = updateTotal(orderDetails, total);
//            order.setTotal(total);
//        } else {
//            double discount = orderDetail.getDiscountRate() > memberDiscountRate ? orderDetail.getDiscountRate()
//                                                                                 : memberDiscountRate;
//            orderDetail.setTotal(total * discount);
//            total = updateTotal(orderDetails, total);
//            order.setTotal(total);
//        }
//
//
//        this.orderDetailRepository.save(orderDetail);
    }
    
    private double updateTotal(List<OrderDetail> orderDetails, double total) {
        for (OrderDetail eachOrderDetail : orderDetails) {
            total += eachOrderDetail.getTotal();
        }
        return total;
    }
    
    public void update(OrderDetail orderDetail) {
        if (this.orderDetailRepository.findByOrderIdAndSustenanceId(orderDetail.getSustenanceId()
                , orderDetail.getOrderId()) != null) {
            this.orderDetailRepository.save(orderDetail);
        }
    }
    
    public void delete(int id) {
        this.orderDetailRepository.deleteById(id);
    }
    
    public List<OrderDetail> getByOrderId(int receiptId) {
        return this.orderDetailRepository.findByOrderId(receiptId);
    }
}
