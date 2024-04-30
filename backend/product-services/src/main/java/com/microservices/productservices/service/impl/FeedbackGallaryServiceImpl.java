package com.microservices.productservices.service.impl;

import com.microservices.productservices.entity.FeedbackGallary;
import com.microservices.productservices.payload.request.FeedbackGallaryRequest;
import com.microservices.productservices.payload.response.FeedbackGallaryResponse;
import com.microservices.productservices.repository.FeedbackGallaryRepository;
import com.microservices.productservices.service.FeedbackGallaryService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FeedbackGallaryServiceImpl implements FeedbackGallaryService {

    private final FeedbackGallaryRepository feedbackGallaryRepository;

    public FeedbackGallaryServiceImpl(FeedbackGallaryRepository feedbackGallaryRepository) {
        this.feedbackGallaryRepository = feedbackGallaryRepository;
    }

    @Override
    public FeedbackGallaryResponse create(FeedbackGallaryRequest feedbackGallaryRequest) {
        FeedbackGallary feedbackGallary = new FeedbackGallary();
        mapRequestToEntity(feedbackGallaryRequest, feedbackGallary);
        FeedbackGallary savedFeedbackGallary = feedbackGallaryRepository.save(feedbackGallary);
        return mapFeedbackGallaryToResponse(savedFeedbackGallary);
    }

    @Override
    public FeedbackGallaryResponse getById(UUID id) {
        FeedbackGallary feedbackGallary = feedbackGallaryRepository.findById(id).orElse(null);
        if (feedbackGallary != null) {
            return mapFeedbackGallaryToResponse(feedbackGallary);
        }
        return null;
    }

    @Override
    public List<FeedbackGallaryResponse> getAll() {
        List<FeedbackGallary> feedbackGallaries = feedbackGallaryRepository.findAll();
        return feedbackGallaries.stream()
                .map(this::mapFeedbackGallaryToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FeedbackGallaryResponse update(UUID id, FeedbackGallaryRequest feedbackGallaryRequest) {
        FeedbackGallary existingFeedbackGallary = feedbackGallaryRepository.findById(id).orElse(null);
        if (existingFeedbackGallary != null) {
            mapRequestToEntity(feedbackGallaryRequest, existingFeedbackGallary);
            FeedbackGallary updatedFeedbackGallary = feedbackGallaryRepository.save(existingFeedbackGallary);
            return mapFeedbackGallaryToResponse(updatedFeedbackGallary);
        }
        return null;
    }

    @Override
    public FeedbackGallaryResponse delete(UUID id) {
        FeedbackGallary feedbackGallary = feedbackGallaryRepository.findById(id).orElse(null);
        if (feedbackGallary != null) {
            feedbackGallaryRepository.delete(feedbackGallary);
            return mapFeedbackGallaryToResponse(feedbackGallary);
        }
        return null;
    }

    @Override
    public void deleteByFeedbackId(UUID feedbackId) {
        List<FeedbackGallary> galleries = feedbackGallaryRepository.findByFeedbackId(feedbackId);
        for (FeedbackGallary gallery : galleries) {
            feedbackGallaryRepository.delete(gallery);
        }
    }

    @Override
    public List<FeedbackGallaryResponse> findByFeedbackId(UUID feedbackId) {
        List<FeedbackGallary> feedbackGallaries = feedbackGallaryRepository.findByFeedbackId(feedbackId);
        return feedbackGallaries.stream()
                .map(this::mapFeedbackGallaryToResponse)
                .collect(Collectors.toList());
    }

    private FeedbackGallaryResponse mapFeedbackGallaryToResponse(FeedbackGallary feedbackGallary) {
        return FeedbackGallaryResponse.builder()
                .id(feedbackGallary.getId())
                .feedbackId(feedbackGallary.getFeedbackId())
                .image(feedbackGallary.getImage())

                .build();
    }

    private void mapRequestToEntity(FeedbackGallaryRequest feedbackGallaryRequest, FeedbackGallary feedbackGallary) {
        BeanUtils.copyProperties(feedbackGallaryRequest, feedbackGallary);
    }
}
