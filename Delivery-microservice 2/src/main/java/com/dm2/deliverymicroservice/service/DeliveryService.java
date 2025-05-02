package com.dm2.deliverymicroservice.service;

import com.dm2.deliverymicroservice.model.Delivery;
import com.dm2.deliverymicroservice.model.DeliveryPerson;
import com.dm2.deliverymicroservice.repository.DeliveryPersonRepository;
import com.dm2.deliverymicroservice.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;

    public String updateDeliveryStatus(long id, Delivery deliveryStatusUpdate) {
        deliveryRepository.callUpdateDeliveryStatusProcedure(
                id,
                deliveryStatusUpdate.getDeliveryStatus(),
                deliveryStatusUpdate.getDeliveryDate());
        return "Delivery status updated.";
    }

    public Object[] getDeliveryById(long id) {
        return deliveryRepository.callGetDeliveryByIdProcedure(id);
    }

    public List<Object[]> getAllDeliveries() {
        return deliveryRepository.callGetAllDeliveriesProcedure();
    }

    public String updateDeliveryPerson(long id, Long deliveryPersonId) {
        // You might want to add validation here to check if delivery person exists
        deliveryRepository.callUpdateDeliveryPersonProcedure(id, deliveryPersonId);
        return "Delivery person updated successfully";
    }
}