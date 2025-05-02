package com.e_commerce.Cart.entity;
import jakarta.persistence.*;

@Entity
@Table(name="CART")
public class Cart {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(name="PRODUCTNAME")
    private String productName;
    @Column(name="QUANTITY")
    private int quantity;
    @Column(name="PRICE")
    private float price;
    @Column(name="USERID")
    private String userId;

    public Cart() {
    }
    public Cart(Long id, String productName, int quantity, float price, String userId) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.userId = userId;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
}