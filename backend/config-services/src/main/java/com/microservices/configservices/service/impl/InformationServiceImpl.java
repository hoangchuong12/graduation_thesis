package com.microservices.configservices.service.impl;

import com.microservices.configservices.entity.Information;
import com.microservices.configservices.payload.request.InformationRequest;
import com.microservices.configservices.payload.response.InfomationsResponse;
import com.microservices.configservices.repository.InformationRepository;
import com.microservices.configservices.service.InformationService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        return mapInformationToInformationResponse(savedInformation);
    }

    @Override
    public void setImage(UUID id, String image) {
        // Implement logic to set image for Information entity by id
    }

    @Override
    public void trash(UUID id) {
        // Implement logic to set status to trashed for Information entity by id
    }

    @Override
    public InfomationsResponse getById(UUID id) {
        Information information = informationRepository.findById(id).orElse(null);
        if (information != null) {
            return mapInformationToInformationResponse(information);
        }
        return null;
    }

    @Override
    public List<InfomationsResponse> getAll() {
        List<Information> informations = informationRepository.findAll();
        return informations.stream()
                .map(this::mapInformationToInformationResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InfomationsResponse update(UUID id, InformationRequest informationRequest) {
        Information existingInformation = informationRepository.findById(id).orElse(null);
        if (existingInformation != null) {
            mapRequestToEntity(informationRequest, existingInformation);
            existingInformation.setUpdatedAt(LocalDateTime.now());
            Information updatedInformation = informationRepository.save(existingInformation);
            return mapInformationToInformationResponse(updatedInformation);
        }
        return null;
    }

    @Override
    public InfomationsResponse delete(UUID id) {
        Information information = informationRepository.findById(id).orElse(null);
        if (information != null) {
            informationRepository.delete(information);
            return mapInformationToInformationResponse(information);
        }
        return null;
    }

    private InfomationsResponse mapInformationToInformationResponse(Information information) {
        if (information != null) {
            InfomationsResponse response = new InfomationsResponse();
            BeanUtils.copyProperties(information, response);
            return response;
        }
        return null;
    }

    private void mapRequestToEntity(InformationRequest informationRequest, Information information) {
        BeanUtils.copyProperties(informationRequest, information);
    }
}
