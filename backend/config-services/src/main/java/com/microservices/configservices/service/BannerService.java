package com.microservices.configservices.service;

import java.util.List;
import java.util.UUID;
import com.microservices.configservices.payload.request.BannerRequest;
import com.microservices.configservices.payload.response.BannerResponse;

public interface BannerService {

    BannerResponse create(BannerRequest bannerRequest);

    BannerResponse getById(UUID id);

    List<BannerResponse> getAll();

    BannerResponse update(BannerRequest bannerRequest, UUID id);

    BannerResponse delete(UUID id);
}
