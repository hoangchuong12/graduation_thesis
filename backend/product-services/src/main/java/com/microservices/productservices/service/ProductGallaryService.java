package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.ProductGallaryRequest;
import com.microservices.productservices.payload.response.ProductGallaryResponse;

import java.util.List;
import java.util.UUID;

public interface ProductGallaryService {

    ProductGallaryResponse create(ProductGallaryRequest productGallaryRequest);

    ProductGallaryResponse getById(UUID id);

    List<ProductGallaryResponse> getAll();

    ProductGallaryResponse update(UUID id, ProductGallaryRequest productGallaryRequest);

    ProductGallaryResponse delete(UUID id);

    List<ProductGallaryResponse> findByProductId(UUID productId);
}
