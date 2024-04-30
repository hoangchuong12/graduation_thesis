package com.microservices.configservices.controller;

import com.microservices.configservices.payload.request.InformationRequest;
import com.microservices.configservices.payload.response.InfomationsResponse;
import com.microservices.configservices.service.InformationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/informations")
public class InformationController {

    private final InformationService informationService;

    public InformationController(InformationService informationService) {
        this.informationService = informationService;
    }

    @PostMapping("/create")
    public ResponseEntity<InfomationsResponse> createInformation(@RequestBody InformationRequest informationRequest) {
        InfomationsResponse createdInformation = informationService.create(informationRequest);
        return new ResponseEntity<>(createdInformation, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<InfomationsResponse> getInformationById(@PathVariable Long id) {
        InfomationsResponse information = informationService.getById(id);
        return ResponseEntity.ok(information);
    }

    @GetMapping("get-all")
    public ResponseEntity<List<InfomationsResponse>> getAllInformation() {
        List<InfomationsResponse> informations = informationService.getAll();
        return ResponseEntity.ok(informations);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InfomationsResponse> updateInformation(@RequestBody InformationRequest informationRequest, @PathVariable Long id) {
        InfomationsResponse updatedInformation = informationService.update(informationRequest, id);
        return ResponseEntity.ok(updatedInformation);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<InfomationsResponse> deleteInformation(@PathVariable Long id) {
        InfomationsResponse deletedInformation = informationService.delete(id);
        return ResponseEntity.ok(deletedInformation);
    }
}
