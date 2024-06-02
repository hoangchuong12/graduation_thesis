package com.microservices.configservices.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.configservices.entity.Post;
import com.microservices.configservices.payload.request.PostRequest;
import com.microservices.configservices.payload.response.PostResponse;
import com.microservices.configservices.repository.PostRepository;
import com.microservices.configservices.service.PostService;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public PostResponse create(PostRequest postRequest) {
        Post post = new Post();
        mapRequestToEntity(postRequest, post);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        return mapPostToPostResponse(savedPost);
    }

    @Override
    public void setImage(UUID id, String image) {
        Post post = postRepository.findById(id).orElse(null);
        post.setImage(image);
        postRepository.save(post);
    }

    @Override
    public void switchStatus(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        int currentStatus = post.getStatus();
        int newStatus = (currentStatus == 1) ? 0 : 1;
        post.setStatus(newStatus);
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    @Override
    public void trash(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setStatus(2);
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    @Override
    public PostResponse getById(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return mapPostToPostResponse(post);
    }

    @Override
    public List<PostResponse> getAll() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(this::mapPostToPostResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse update(UUID id, PostRequest postRequest) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        mapRequestToEntity(postRequest, existingPost);
        existingPost.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(existingPost);
        return mapPostToPostResponse(updatedPost);
    }

    @Override
    public PostResponse delete(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
        return mapPostToPostResponse(post);
    }

    private PostResponse mapPostToPostResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .name(post.getName())
                .topicId(post.getTopicId())
                .image(post.getImage())
                .description(post.getDescription())
                .detail(post.getDetail())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .createdBy(post.getCreatedBy())
                .updatedBy(post.getUpdatedBy())
                .status(post.getStatus())
                .build();
    }

    private void mapRequestToEntity(PostRequest postRequest, Post post) {
        BeanUtils.copyProperties(postRequest, post);
    }
}
