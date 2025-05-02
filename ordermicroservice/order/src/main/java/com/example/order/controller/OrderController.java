package com.example.order.controller;

import com.example.order.entity.Order;
import com.example.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<String> addOrder(@RequestBody Order order) {
        try {
            orderService.addOrderItem(order);
            return ResponseEntity.ok("Order added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding the order: " + e.getMessage());
        }
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<String> updateOrder(@PathVariable Long orderId, @RequestBody Order updatedOrder) {
        try {
            orderService.updateOrder(orderId, updatedOrder);
            return ResponseEntity.ok("Order updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the order: " + e.getMessage());
        }
    }

    @GetMapping("/view/{orderId}")
    public ResponseEntity<?> viewOrder(@PathVariable Long orderId) {
        try {
            List<Object[]> orderItems = orderService.viewOrderByOrderId(orderId);
            return ResponseEntity.ok(orderItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while retrieving the order: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.clearOrderByOrderId(orderId);
            return ResponseEntity.ok("Order deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while deleting the order: " + e.getMessage());
        }
    }

}