package com.dm2.deliverymicroservice.controller;

import com.dm2.deliverymicroservice.model.Delivery;
import com.dm2.deliverymicroservice.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDeliveryStatus(@PathVariable long id, @RequestBody Delivery deliveryStatusUpdate) {
        try {
            String result = deliveryService.updateDeliveryStatus(id, deliveryStatusUpdate);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating delivery status: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryById(@PathVariable long id) {
        try {
            Object[] delivery = deliveryService.getDeliveryById(id);
            return ResponseEntity.ok(delivery);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching delivery: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDeliveries() {
        try {
            List<Object[]> deliveries = deliveryService.getAllDeliveries();
            return ResponseEntity.ok(deliveries);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching deliveries: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/delivery-person/{personId}")
    public ResponseEntity<String> updateDeliveryPerson(@PathVariable long id, @PathVariable Long personId) {
        try {
            String result = deliveryService.updateDeliveryPerson(id, personId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating delivery person: " + e.getMessage());
        }
    }

}
