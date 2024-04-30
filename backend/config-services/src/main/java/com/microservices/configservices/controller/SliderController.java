package com.microservices.configservices.controller;

import com.microservices.configservices.payload.request.SliderRequest;
import com.microservices.configservices.payload.response.SliderResponse;
import com.microservices.configservices.service.SliderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sliders")
public class SliderController {

    private final SliderService sliderService;

    public SliderController(SliderService sliderService) {
        this.sliderService = sliderService;
    }

    @PostMapping("/create")
    public ResponseEntity<SliderResponse> createSlider(@RequestBody SliderRequest sliderRequest) {
        SliderResponse createdSlider = sliderService.create(sliderRequest);
        return new ResponseEntity<>(createdSlider, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<SliderResponse> getSliderById(@PathVariable UUID id) {
        SliderResponse slider = sliderService.getById(id);
        return ResponseEntity.ok(slider);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<SliderResponse>> getAllSliders() {
        List<SliderResponse> sliders = sliderService.getAll();
        return ResponseEntity.ok(sliders);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SliderResponse> updateSlider(@RequestBody SliderRequest sliderRequest, @PathVariable UUID id) {
        SliderResponse updatedSlider = sliderService.update(sliderRequest, id);
        return ResponseEntity.ok(updatedSlider);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SliderResponse> deleteSlider(@PathVariable UUID id) {
        SliderResponse deletedSlider = sliderService.delete(id);
        return ResponseEntity.ok(deletedSlider);
    }
}
