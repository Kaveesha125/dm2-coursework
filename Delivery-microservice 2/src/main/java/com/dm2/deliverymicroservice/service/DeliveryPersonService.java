package com.dm2.deliverymicroservice.service;

import com.dm2.deliverymicroservice.model.DeliveryPerson;
import com.dm2.deliverymicroservice.repository.DeliveryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeliveryPersonService {

    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;

    public void addDeliveryPerson(DeliveryPerson deliveryPerson) {
        deliveryPersonRepository.callAddDeliveryPersonProcedure(deliveryPerson);
    }

    public Map<String, Object> getDeliveryPersonById(Long id) {
        return deliveryPersonRepository.getDeliveryPersonById(id);
    }
}