package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.ProductRequest;
import com.microservices.productservices.payload.response.ProductResponse;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    
    ProductResponse create(ProductRequest productRequest);
    
    ProductResponse getById(UUID id);
    
    List<ProductResponse> getAll();
    
    ProductResponse update(UUID id, ProductRequest productRequest);
    
    ProductResponse delete(UUID id);
    
    List<ProductResponse> findByBrandId(UUID brandId);
    
}
