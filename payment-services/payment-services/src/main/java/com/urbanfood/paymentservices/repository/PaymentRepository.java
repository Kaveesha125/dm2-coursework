package com.urbanfood.paymentservices.repository;

import com.urbanfood.paymentservices.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // These methods are fine for finding payments by different criteria
    List<Payment> findByUserId(Long userId);
    List<Payment> findByOrderId(Long orderId);
    List<Payment> findByPaymentStatus(String status);


}