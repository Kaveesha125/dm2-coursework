package com.user.user.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "USERS")
@Data

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Long id;

    @Column(nullable = false, length = 255)
    private String fullname;

    @Column(nullable = false, length = 255, unique = true)
    private String email;

    @Column(length = 20)
    private String mobile;

    @Column(length = 255)
    private String password;

    @Column(length = 50, nullable = false)
    private String role = "ROLE_CUSTOMER";

    @Column(length = 255)
    private String address;
}







