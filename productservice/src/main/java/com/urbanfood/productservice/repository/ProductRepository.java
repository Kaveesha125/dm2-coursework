package com.urbanfood.productservice.repository;
import com.urbanfood.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {


}
