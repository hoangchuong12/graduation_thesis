package com.microservices.productservices.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.productservices.entity.FeedbackGallary;

public interface FeedbackGallaryRepository extends JpaRepository<FeedbackGallary, UUID> {

    List<FeedbackGallary> findByFeedbackId(UUID feedbackId);

}
