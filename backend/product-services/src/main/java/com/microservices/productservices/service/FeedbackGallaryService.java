package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.FeedbackGallaryRequest;
import com.microservices.productservices.payload.response.FeedbackGallaryResponse;

import java.util.List;
import java.util.UUID;

public interface FeedbackGallaryService {

    FeedbackGallaryResponse create(FeedbackGallaryRequest feedbackGallaryRequest);

    FeedbackGallaryResponse getById(UUID id);

    List<FeedbackGallaryResponse> getAll();

    FeedbackGallaryResponse update(UUID id, FeedbackGallaryRequest feedbackGallaryRequest);

    FeedbackGallaryResponse delete(UUID id);

    List<FeedbackGallaryResponse> findByFeedbackId(UUID feedbackId);

    void deleteByFeedbackId(UUID feedbackId);
}
