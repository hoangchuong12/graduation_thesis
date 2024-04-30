package com.microservices.productservices.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.productservices.entity.ProductFeedback;

public interface ProductFeedbackRepository extends JpaRepository<ProductFeedback, UUID> {

    List<ProductFeedback> findByProductId(UUID productId);

}
