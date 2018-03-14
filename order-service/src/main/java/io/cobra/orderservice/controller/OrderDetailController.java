package io.cobra.orderservice.controller;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.model.Receipt;
import io.cobra.orderservice.service.OrderDetailService;
import io.cobra.orderservice.service.ReceiptService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderDetailController {

    private final OrderDetailService orderDetailService;
    private final ReceiptService receiptService;

    public OrderDetailController(OrderDetailService orderDetailService, ReceiptService receiptService) {
        this.orderDetailService = orderDetailService;
        this.receiptService = receiptService;
    }


    @PostMapping(value = "/order_detail", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insetOrderDetail(@RequestBody OrderDetail orderDetail) {
        double total = 0;
        double discount = 0;
        total = orderDetail.getPrice() * orderDetail.getQuantity();
        if (orderDetail.getDiscountRate() == 0 || orderDetail.getMemberDiscountRate() == 0) {
            orderDetail.setTotal(total);
        } else {
            if (orderDetail.getDiscountRate() > orderDetail.getMemberDiscountRate()) {
                discount = orderDetail.getDiscountRate();
            } else if (orderDetail.getDiscountRate() < orderDetail.getMemberDiscountRate()) {
                discount = orderDetail.getMemberDiscountRate();
            }
            orderDetail.setTotal(total * discount);
        }
        this.orderDetailService.createOrderDetail(orderDetail);
    }

    @GetMapping("/order_detail")
    public List<OrderDetail> viewAllOrderDetail() {
        return this.orderDetailService.getALl();
    }

    @GetMapping("/order_detail/{id}")
    public OrderDetail viewOrderDetailById(@PathVariable("id") int id) {
        return this.orderDetailService.getOrderDetailById(id);
    }

    @DeleteMapping(value = "/order_detail/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void removeOrderDetail(@PathVariable("id") int id) {
        this.orderDetailService.deleteOrderDetail(id);
    }

    @PutMapping(value = "/order_detail/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrderDetail(@RequestBody OrderDetail orderDetail) {
        double total = 0;
        if (this.orderDetailService.getOrderDetailById(orderDetail.getId()) != null) {
            this.orderDetailService.updateOrderDetail(orderDetail);
            Receipt receipt = this.receiptService.findReceiptById(orderDetail.getOrderId());
            List<OrderDetail> orderDetailList = this.orderDetailService.getOrderDetailByReceiptId(receipt.getId());

            //update receipt total
            for (OrderDetail eachOrderDetail : orderDetailList) {
                total += eachOrderDetail.getTotal();
            }
            receipt.setTotal(total);
            this.receiptService.updateReceipt(receipt);
        }
    }

}
