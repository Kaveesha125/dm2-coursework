package com.dm2.deliverymicroservice.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class DeliveryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void callUpdateDeliveryStatusProcedure(Long id, String status, java.sql.Date date) {
        entityManager.createNativeQuery("CALL UPDATE_DELIVERY_STATUS(:P_DELIVERY_ID, :P_STATUS, :P_DATE)")
                .setParameter("P_DELIVERY_ID", id)
                .setParameter("P_STATUS", status)
                .setParameter("P_DATE", date)
                .executeUpdate();
    }

    @Transactional
    public Object[] callGetDeliveryByIdProcedure(Long id) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_DELIVERY_BY_ID");
        query.registerStoredProcedureParameter("P_DELIVERY_ID", Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("P_CURSOR", void.class, ParameterMode.REF_CURSOR);
        query.setParameter("P_DELIVERY_ID", id);
        return (Object[]) query.getSingleResult();
    }

    @Transactional
    public List<Object[]> callGetAllDeliveriesProcedure() {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_ALL_DELIVERIES");
        query.registerStoredProcedureParameter("P_CURSOR", void.class, ParameterMode.REF_CURSOR);
        return query.getResultList();
    }

    @Transactional
    public void callUpdateDeliveryPersonProcedure(Long id, Long personId) {
        entityManager.createNativeQuery("CALL UPDATE_DELIVERY_PERSON(:P_DELIVERY_ID, :P_PERSON_ID)")
                .setParameter("P_DELIVERY_ID", id)
                .setParameter("P_PERSON_ID", personId)
                .executeUpdate();
    }
}