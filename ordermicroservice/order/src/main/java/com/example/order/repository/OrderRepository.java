package com.example.order.repository;

import com.example.order.entity.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void callAddOrderProcedure(Order order) {
        entityManager.createNativeQuery("CALL ADDORDER(:TOTAL_AMOUNT, :PRODUCT_ID, :ORDER_STATUS)")
                .setParameter("TOTAL_AMOUNT", order.getTotalAmount())
                .setParameter("PRODUCT_ID", order.getProductId())
                .setParameter("ORDER_STATUS", order.getOrderStatus())
                .executeUpdate();
    }

    @Transactional
    public void callUpdateOrderProcedure(Long orderId, Order updatedOrder) {
        entityManager.createNativeQuery("CALL UPDATEORDER(:ORDER_ID, :NEW_TOTAL_AMOUNT, :NEW_ORDER_STATUS)")
                .setParameter("ORDER_ID", orderId)
                .setParameter("NEW_TOTAL_AMOUNT", updatedOrder.getTotalAmount())
                .setParameter("NEW_ORDER_STATUS", updatedOrder.getOrderStatus())
                .executeUpdate();
    }

    @Transactional
    public void callDeleteOrderProcedure(Long orderId) {
        entityManager.createNativeQuery("CALL DELETEORDER(:ORDER_ID)")
                .setParameter("ORDER_ID", orderId)
                .executeUpdate();
    }

    @Transactional
    public List<Object[]> callViewOrderProcedure(Long orderId) {
        return entityManager.createNativeQuery("SELECT * FROM ORDERS WHERE ORDER_ID = :ORDER_ID")
                .setParameter("ORDER_ID", orderId)
                .getResultList();
    }

}