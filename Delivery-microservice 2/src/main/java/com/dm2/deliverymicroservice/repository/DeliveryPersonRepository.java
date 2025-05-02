package com.dm2.deliverymicroservice.repository;

import com.dm2.deliverymicroservice.model.DeliveryPerson;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.LinkedHashMap;
import java.util.Map;

@Repository
public class DeliveryPersonRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void callAddDeliveryPersonProcedure(DeliveryPerson deliveryPerson) {
        entityManager.createNativeQuery("CALL ADD_DELIVERY_PERSON(:P_ID, :P_FIRST_NAME, :P_LAST_NAME, :P_PHONE_NUMBER, :P_EMAIL)")
                .setParameter("P_ID", deliveryPerson.getId())
                .setParameter("P_FIRST_NAME", deliveryPerson.getFirstName())
                .setParameter("P_LAST_NAME", deliveryPerson.getLastName())
                .setParameter("P_PHONE_NUMBER", deliveryPerson.getPhoneNumber())
                .setParameter("P_EMAIL", deliveryPerson.getEmail())
                .executeUpdate();
    }

    @Transactional
    public Map<String, Object> getDeliveryPersonById(Long id) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_DELIVERY_PERSON_BY_ID");
        query.registerStoredProcedureParameter("P_ID", Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("P_CURSOR", void.class, ParameterMode.REF_CURSOR);
        query.setParameter("P_ID", id);

        Object[] result = (Object[]) query.getSingleResult();

        Map<String, Object> mappedResult = new LinkedHashMap<>();
        mappedResult.put("id", result[0]);
        mappedResult.put("firstName", result[1]);
        mappedResult.put("lastName", result[2]);
        mappedResult.put("phoneNumber", result[3]);
        mappedResult.put("email", result[4]);

        return mappedResult;
    }
}