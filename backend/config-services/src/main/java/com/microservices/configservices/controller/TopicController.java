package com.microservices.configservices.controller;

import com.microservices.configservices.payload.request.SetImageRequest;
import com.microservices.configservices.payload.request.TopicRequest;
import com.microservices.configservices.payload.response.TopicResponse;
import com.microservices.configservices.service.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/config-services/api/topics")
@CrossOrigin(origins = { "http://localhost:3000" })
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping("/create")
    public ResponseEntity<TopicResponse> createTopic(@RequestBody TopicRequest topicRequest) {
        TopicResponse createdTopic = topicService.create(topicRequest);
        return new ResponseEntity<>(createdTopic, HttpStatus.CREATED);
    }

    @PutMapping("/set-image")
    public ResponseEntity<Void> setImage(@RequestBody SetImageRequest setImageRequest) {
        topicService.setImage(setImageRequest.getId(), setImageRequest.getImage());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/switch-status/{id}")
    public ResponseEntity<Void> switchStatus(@PathVariable UUID id) {
        topicService.switchStatus(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/trash/{id}")
    public ResponseEntity<Void> trash(@PathVariable UUID id) {
        topicService.trash(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<TopicResponse> getTopicById(@PathVariable UUID id) {
        TopicResponse topic = topicService.getById(id);
        if (topic != null) {
            return ResponseEntity.ok(topic);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TopicResponse>> getAllTopics() {
        List<TopicResponse> topics = topicService.getAll();
        return ResponseEntity.ok(topics);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TopicResponse> updateTopic(@PathVariable UUID id, @RequestBody TopicRequest topicRequest) {
        TopicResponse updatedTopic = topicService.update(id, topicRequest);
        if (updatedTopic != null) {
            return ResponseEntity.ok(updatedTopic);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TopicResponse> deleteTopic(@PathVariable UUID id) {
        TopicResponse deletedTopic = topicService.delete(id);
        if (deletedTopic != null) {
            return ResponseEntity.ok(deletedTopic);
        }
        return ResponseEntity.notFound().build();
    }
}
