package com.microservices.productservices.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.productservices.entity.Product;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findByBrandId(UUID brandId);
}
