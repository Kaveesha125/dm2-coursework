package com.dm2.deliverymicroservice.controller;

import com.dm2.deliverymicroservice.model.DeliveryPerson;
import com.dm2.deliverymicroservice.service.DeliveryPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deliveryPerson")
public class DelivaryPersonController {

    @Autowired
    private DeliveryPersonService deliveryPersonService;

    @PostMapping
    public ResponseEntity<String> addDeliveryPerson(@RequestBody DeliveryPerson deliveryPerson) {
        try {
            deliveryPersonService.addDeliveryPerson(deliveryPerson);
            return ResponseEntity.ok("Delivery person added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding delivery person: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryPersonById(@PathVariable Long id) {
        try {
            Map<String, Object> deliveryPerson = deliveryPersonService.getDeliveryPersonById(id);
            return ResponseEntity.ok(deliveryPerson);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching delivery person: " + e.getMessage());
        }
    }
}
