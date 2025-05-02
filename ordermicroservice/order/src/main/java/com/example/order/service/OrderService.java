package com.example.order.service;

import com.example.order.entity.Order;
import com.example.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void addOrderItem(Order order) {
        orderRepository.callAddOrderProcedure(order);
    }

    public void updateOrder(Long orderId, Order updatedOrder) {
        orderRepository.callUpdateOrderProcedure(orderId, updatedOrder);
    }

    public void clearOrderByOrderId(Long orderId) {
        orderRepository.callDeleteOrderProcedure(orderId);
    }

    public List<Object[]> viewOrderByOrderId(Long orderId) {
        return orderRepository.callViewOrderProcedure(orderId);
    }

}