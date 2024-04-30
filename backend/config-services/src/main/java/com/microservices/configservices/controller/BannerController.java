package com.microservices.configservices.controller;

import com.microservices.configservices.payload.request.BannerRequest;
import com.microservices.configservices.payload.response.BannerResponse;
import com.microservices.configservices.service.BannerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/config-services/api/banners")
public class BannerController {

    private final BannerService bannerService;

    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @PostMapping("/create")
    public ResponseEntity<BannerResponse> createBanner(@RequestBody BannerRequest bannerRequest) {
        BannerResponse createdBanner = bannerService.create(bannerRequest);
        return new ResponseEntity<>(createdBanner, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<BannerResponse> getBannerById(@PathVariable UUID id) {
        BannerResponse banner = bannerService.getById(id);
        return ResponseEntity.ok(banner);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<BannerResponse>> getAllBanners() {
        List<BannerResponse> banners = bannerService.getAll();
        return ResponseEntity.ok(banners);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BannerResponse> updateBanner(@RequestBody BannerRequest bannerRequest, @PathVariable UUID id) {
        BannerResponse updatedBanner = bannerService.update(bannerRequest, id);
        return ResponseEntity.ok(updatedBanner);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BannerResponse> deleteBanner(@PathVariable UUID id) {
        BannerResponse deletedBanner = bannerService.delete(id);
        return ResponseEntity.ok(deletedBanner);
    }
}
