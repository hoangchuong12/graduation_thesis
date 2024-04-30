package com.microservices.configservices.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.microservices.configservices.entity.Banner;
import com.microservices.configservices.exception.CustomException;
import com.microservices.configservices.payload.request.BannerRequest;
import com.microservices.configservices.payload.response.BannerResponse;
import com.microservices.configservices.repository.BannerRepository;
import com.microservices.configservices.service.BannerService;

@Service
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;

    public BannerServiceImpl(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    @Override
    public BannerResponse create(BannerRequest bannerRequest) {
        Banner banner = new Banner();
        banner.setCreatedAt(new Date());
        mapRequestToEntity(bannerRequest, banner);
        Banner savedBanner = bannerRepository.save(banner);
        return mapEntityToResponse(savedBanner);
    }
    

    @Override
    public BannerResponse getById(UUID id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new CustomException("Banner not found", "NOT_FOUND"));
        return mapEntityToResponse(banner);
    }

    @Override
    public List<BannerResponse> getAll() {
        List<Banner> banners = bannerRepository.findAll();
        return banners.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BannerResponse update(BannerRequest bannerRequest, UUID id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new CustomException("Banner not found", "NOT_FOUND"));
        mapRequestToEntity(bannerRequest, banner);
        banner.setUpdatedAt(new Date());
        Banner savedBanner = bannerRepository.save(banner);
        return mapEntityToResponse(savedBanner);
    }

    @Override
    public BannerResponse delete(UUID id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new CustomException("Banner not found", "NOT_FOUND"));
        bannerRepository.delete(banner);
        return mapEntityToResponse(banner);
    }

    private void mapRequestToEntity(BannerRequest bannerRequest, Banner banner) {
        BeanUtils.copyProperties(bannerRequest, banner);
    }

    private BannerResponse mapEntityToResponse(Banner banner) {
        BannerResponse bannerResponse = new BannerResponse();
        BeanUtils.copyProperties(banner, bannerResponse);
        return bannerResponse;
    }
}
