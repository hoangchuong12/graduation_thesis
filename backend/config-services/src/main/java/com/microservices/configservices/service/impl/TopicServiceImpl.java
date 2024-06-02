package com.microservices.configservices.service.impl;


import com.microservices.configservices.entity.Topic;
import com.microservices.configservices.payload.request.TopicRequest;
import com.microservices.configservices.payload.response.TopicResponse;
import com.microservices.configservices.repository.TopicRepository;
import com.microservices.configservices.service.TopicService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public TopicResponse create(TopicRequest topicRequest) {
        Topic topic = new Topic();
        mapRequestToEntity(topicRequest, topic);
        topic.setCreatedAt(LocalDateTime.now());
        Topic savedTopic = topicRepository.save(topic);
        return mapTopicToTopicResponse(savedTopic);
    }

    @Override
    public void setImage(UUID id, String image) {
        Topic topic = topicRepository.findById(id).orElse(null);
        topic.setImage(image);
        topicRepository.save(topic);
    }

    @Override
    public void switchStatus(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        int currentStatus = topic.getStatus();
        int newStatus = (currentStatus == 1) ? 0 : 1;
        topic.setStatus(newStatus);
        topic.setUpdatedAt(LocalDateTime.now());
        topicRepository.save(topic);
    }

    @Override
    public void trash(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        topic.setStatus(2);
        topic.setUpdatedAt(LocalDateTime.now());
        topicRepository.save(topic);
    }

    @Override
    public TopicResponse getById(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        return mapTopicToTopicResponse(topic);
    }

    @Override
    public List<TopicResponse> getAll() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream()
                .map(this::mapTopicToTopicResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TopicResponse update(UUID id, TopicRequest topicRequest) {
        Topic existingTopic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        mapRequestToEntity(topicRequest, existingTopic);
        existingTopic.setUpdatedAt(LocalDateTime.now());
        Topic updatedTopic = topicRepository.save(existingTopic);
        return mapTopicToTopicResponse(updatedTopic);
    }

    @Override
    public TopicResponse delete(UUID id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        topicRepository.delete(topic);
        return mapTopicToTopicResponse(topic);
    }

    private TopicResponse mapTopicToTopicResponse(Topic topic) {
        return TopicResponse.builder()
                .id(topic.getId())
                .name(topic.getName())
                .image(topic.getImage())
                .description(topic.getDescription())
                .createdAt(topic.getCreatedAt())
                .updatedAt(topic.getUpdatedAt())
                .createdBy(topic.getCreatedBy())
                .updatedBy(topic.getUpdatedBy())
                .status(topic.getStatus())
                .build();
    }

    private void mapRequestToEntity(TopicRequest topicRequest, Topic topic) {
        BeanUtils.copyProperties(topicRequest, topic);
    }
}
