package com.microservices.configservices.service;

import java.util.List;
import java.util.UUID;
import com.microservices.configservices.payload.request.PostRequest;
import com.microservices.configservices.payload.response.PostResponse;

public interface PostService {

    PostResponse create(PostRequest postRequest);

    void setImage(UUID id, String image);

    void switchStatus(UUID id);

    void trash(UUID id);

    PostResponse getById(UUID id);

    List<PostResponse> getAll();

    PostResponse update(UUID id, PostRequest postRequest);

    PostResponse delete(UUID id);
}
