package com.microservices.productservices.service.impl;

import com.microservices.productservices.entity.ProductOption;
import com.microservices.productservices.payload.request.ProductOptionRequest;
import com.microservices.productservices.payload.response.ProductOptionResponse;
import com.microservices.productservices.repository.ProductOptionRepository;
import com.microservices.productservices.service.ProductOptionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductOptionServiceImpl implements ProductOptionService {

    private final ProductOptionRepository productOptionRepository;

    public ProductOptionServiceImpl(ProductOptionRepository productOptionRepository) {
        this.productOptionRepository = productOptionRepository;
    }

    @Override
    public ProductOptionResponse createProductOption(ProductOptionRequest productOptionRequest) {
        ProductOption productOption = new ProductOption();
        productOption.setProductId(productOptionRequest.getProductId());
        productOption.setOptionId(productOptionRequest.getOptionId());
        ProductOption savedProductOption = productOptionRepository.save(productOption);
        return mapProductOptionToResponse(savedProductOption);
    }

    @Override
    public List<ProductOptionResponse> getProductOptionsByProductId(UUID productId) {
        List<ProductOption> productOptions = productOptionRepository.findByProductId(productId);
        return mapProductOptionsToResponse(productOptions);
    }

    @Override
    public List<ProductOptionResponse> getProductOptionsByOptionId(UUID optionId) {
        List<ProductOption> productOptions = productOptionRepository.findByOptionId(optionId);
        return mapProductOptionsToResponse(productOptions);
    }

    @Override
    public void deleteProductOption(UUID productId, UUID optionId) {
        productOptionRepository.deleteByProductIdAndOptionId(productId, optionId);
    }

    @Override
    public void deleteProductOptionsByProductId(UUID productId) {
        productOptionRepository.deleteByProductId(productId);
    }

    @Override
    public void deleteProductOptionsByOptionId(UUID optionId) {
        productOptionRepository.deleteByOptionId(optionId);
    }

    @Override
    public List<ProductOptionResponse> getAllProductOptions() {
        List<ProductOption> productOptions = productOptionRepository.findAll();
        return mapProductOptionsToResponse(productOptions);
    }

    // Helper method to map ProductOption to ProductOptionResponse
    private ProductOptionResponse mapProductOptionToResponse(ProductOption productOption) {
        return ProductOptionResponse.builder()
                .id(productOption.getId())
                .productId(productOption.getProductId())
                .optionId(productOption.getOptionId())
                .build();
    }

    // Helper method to map list of ProductOption to list of ProductOptionResponse
    private List<ProductOptionResponse> mapProductOptionsToResponse(List<ProductOption> productOptions) {
        return productOptions.stream()
                .map(this::mapProductOptionToResponse)
                .collect(Collectors.toList());
    }
}
