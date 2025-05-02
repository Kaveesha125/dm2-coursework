package com.dm2.deliverymicroservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "DELIVERY")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    private Long orderId;
    private String deliveryStatus;
    private Date deliveryDate;

    @ManyToOne
    @JoinColumn(name = "DELIVERY_PERSON_ID")
    private DeliveryPerson deliveryPerson;
    private String Address;

}
