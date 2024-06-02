package com.microservices.configservices.controller;

import com.microservices.configservices.payload.request.SetImageRequest;
import com.microservices.configservices.payload.request.PostRequest;
import com.microservices.configservices.payload.response.PostResponse;
import com.microservices.configservices.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/config-services/api/posts")
@CrossOrigin(origins = { "http://localhost:3000" })
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest) {
        PostResponse createdPost = postService.create(postRequest);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/set-image")
    public ResponseEntity<Void> setImage(@RequestBody SetImageRequest setImageRequest) {
        postService.setImage(setImageRequest.getId(), setImageRequest.getImage());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/switch-status/{id}")
    public ResponseEntity<Void> switchStatus(@PathVariable UUID id) {
        postService.switchStatus(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/trash/{id}")
    public ResponseEntity<Void> trash(@PathVariable UUID id) {
        postService.trash(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable UUID id) {
        PostResponse post = postService.getById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> posts = postService.getAll();
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable UUID id, @RequestBody PostRequest postRequest) {
        PostResponse updatedPost = postService.update(id, postRequest);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<PostResponse> deletePost(@PathVariable UUID id) {
        PostResponse deletedPost = postService.delete(id);
        if (deletedPost != null) {
            return ResponseEntity.ok(deletedPost);
        }
        return ResponseEntity.notFound().build();
    }
}
