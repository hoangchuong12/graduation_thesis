package com.microservices.configservices.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.microservices.configservices.entity.Slider;
import com.microservices.configservices.exception.CustomException;
import com.microservices.configservices.payload.request.SliderRequest;
import com.microservices.configservices.payload.response.SliderResponse;
import com.microservices.configservices.repository.SliderRepository;
import com.microservices.configservices.service.SliderService;

@Service
public class SliderServiceImpl implements SliderService {

    private final SliderRepository sliderRepository;

    public SliderServiceImpl(SliderRepository sliderRepository) {
        this.sliderRepository = sliderRepository;
    }

    @Override
    public SliderResponse create(SliderRequest sliderRequest) {
        Slider slider = new Slider();
        mapRequestToEntity(sliderRequest, slider);
        slider.setCreatedAt(new Date());
        Slider savedSlider = sliderRepository.save(slider);
        return mapEntityToResponse(savedSlider);
    }

    @Override
    public SliderResponse getById(UUID id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new CustomException("Slider not found", "NOT_FOUND"));
        return mapEntityToResponse(slider);
    }

    @Override
    public List<SliderResponse> getAll() {
        List<Slider> sliders = sliderRepository.findAll();
        return sliders.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SliderResponse update(SliderRequest sliderRequest, UUID id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new CustomException("Slider not found", "NOT_FOUND"));
        mapRequestToEntity(sliderRequest, slider);
        slider.setUpdatedAt(new Date());
        Slider savedSlider = sliderRepository.save(slider);
        return mapEntityToResponse(savedSlider);
    }

    @Override
    public SliderResponse delete(UUID id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new CustomException("Slider not found", "NOT_FOUND"));
        sliderRepository.delete(slider);
        return mapEntityToResponse(slider);
    }

    private void mapRequestToEntity(SliderRequest sliderRequest, Slider slider) {
        BeanUtils.copyProperties(sliderRequest, slider);
    }

    private SliderResponse mapEntityToResponse(Slider slider) {
        SliderResponse sliderResponse = new SliderResponse();
        BeanUtils.copyProperties(slider, sliderResponse);
        return sliderResponse;
    }
}
