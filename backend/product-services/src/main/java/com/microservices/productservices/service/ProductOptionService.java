package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.ProductOptionRequest;
import com.microservices.productservices.payload.response.ProductOptionResponse;

import java.util.List;
import java.util.UUID;

public interface ProductOptionService {
    
    ProductOptionResponse createProductOption(ProductOptionRequest productOptionRequest);

    List<ProductOptionResponse> getProductOptionsByProductId(UUID productId);

    List<ProductOptionResponse> getProductOptionsByOptionId(UUID optionId);

    void deleteProductOption(UUID productId, UUID optionId);

    void deleteProductOptionsByProductId(UUID productId);

    void deleteProductOptionsByOptionId(UUID optionId);

    List<ProductOptionResponse> getAllProductOptions();
}
