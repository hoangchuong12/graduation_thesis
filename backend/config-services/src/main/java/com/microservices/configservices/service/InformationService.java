package com.microservices.configservices.service;

import java.util.List;

import com.microservices.configservices.payload.request.InformationRequest;
import com.microservices.configservices.payload.response.InfomationsResponse;

public interface InformationService {

    InfomationsResponse create(InformationRequest informationRequest);

    InfomationsResponse getById(Long id);

    List<InfomationsResponse> getAll();

    InfomationsResponse update(InformationRequest informationRequest, Long id);

    InfomationsResponse delete(Long id);
}
