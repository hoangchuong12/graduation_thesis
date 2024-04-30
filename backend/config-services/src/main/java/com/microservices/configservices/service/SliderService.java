package com.microservices.configservices.service;

import java.util.List;
import java.util.UUID;
import com.microservices.configservices.payload.request.SliderRequest;
import com.microservices.configservices.payload.response.SliderResponse;

public interface SliderService {

    SliderResponse create(SliderRequest sliderRequest);

    SliderResponse getById(UUID id);

    List<SliderResponse> getAll();

    SliderResponse update(SliderRequest sliderRequest, UUID id);

    SliderResponse delete(UUID id);
}
