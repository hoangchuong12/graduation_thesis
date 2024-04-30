package com.microservices.configservices.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.microservices.configservices.entity.Information;
import com.microservices.configservices.exception.CustomException;
import com.microservices.configservices.payload.request.InformationRequest;
import com.microservices.configservices.payload.response.InfomationsResponse;
import com.microservices.configservices.repository.InformationRepository;
import com.microservices.configservices.service.InformationService;

@Service
public class InformationServiceImpl implements InformationService {

    private final InformationRepository informationRepository;

    public InformationServiceImpl(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    @Override
    public InfomationsResponse create(InformationRequest informationRequest) {
        Information information = new Information();
        mapRequestToEntity(informationRequest, information);
        Information savedInformation = informationRepository.save(information);
        return mapEntityToResponse(savedInformation);
    }

    @Override
    public InfomationsResponse getById(Long id) {
        Information information = informationRepository.findById(id)
                .orElseThrow(() -> new CustomException("Information not found", "NOT_FOUND"));
        return mapEntityToResponse(information);
    }

    @Override
    public List<InfomationsResponse> getAll() {
        List<Information> informations = informationRepository.findAll();
        return informations.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InfomationsResponse update(InformationRequest informationRequest, Long id) {
        Information information = informationRepository.findById(id)
                .orElseThrow(() -> new CustomException("Information not found", "NOT_FOUND"));
        mapRequestToEntity(informationRequest, information);
        information.setUpdatedAt(new Date());
        Information savedInformation = informationRepository.save(information);
        return mapEntityToResponse(savedInformation);
    }

    @Override
    public InfomationsResponse delete(Long id) {
        Information information = informationRepository.findById(id)
                .orElseThrow(() -> new CustomException("Information not found", "NOT_FOUND"));
        informationRepository.delete(information);
        return mapEntityToResponse(information);
    }

    private void mapRequestToEntity(InformationRequest informationRequest, Information information) {
        BeanUtils.copyProperties(informationRequest, information);
    }

    private InfomationsResponse mapEntityToResponse(Information information) {
        InfomationsResponse informationResponse = new InfomationsResponse();
        BeanUtils.copyProperties(information, informationResponse);
        return informationResponse;
    }
}
