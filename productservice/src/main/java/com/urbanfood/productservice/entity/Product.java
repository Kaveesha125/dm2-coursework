package com.urbanfood.productservice.entity;
import jakarta.persistence.*;
import lombok.Data;

    @Entity
    @Table(name = "PRODUCTS")
    @Data
        public class Product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "PRODUCT_ID")
        private Long productId;

        @Column(name = "NAME")
        private String name;

        @Column(name = "DESCRIPTION")
        private String description;

        @Column(name = "PRICE")
        private Double price;

        @Column(name = "QUANTITY")
        private Integer quantity;

        @Column(name = "CATEGORY")
        private String category;

        @Column(name = "IMAGE_URL")
        private String imageUrl;

        
    }


