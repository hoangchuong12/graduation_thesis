package com.microservices.configservices.service;

import java.util.List;
import java.util.UUID;
import com.microservices.configservices.payload.request.TopicRequest;
import com.microservices.configservices.payload.response.TopicResponse;

public interface TopicService {

    TopicResponse create(TopicRequest topicRequest);

    void setImage(UUID id, String image);

    void switchStatus(UUID id);

    void trash(UUID id);

    TopicResponse getById(UUID id);

    List<TopicResponse> getAll();

    TopicResponse update(UUID id, TopicRequest topicRequest);

    TopicResponse delete(UUID id);
}
