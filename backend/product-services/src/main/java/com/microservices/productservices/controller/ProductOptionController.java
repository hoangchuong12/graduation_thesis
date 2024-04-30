package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.ProductOptionRequest;
import com.microservices.productservices.payload.response.ProductOptionResponse;
import com.microservices.productservices.service.ProductOptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product-services/api/product-options")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ProductOptionController {

    private final ProductOptionService productOptionService;

    public ProductOptionController(ProductOptionService productOptionService) {
        this.productOptionService = productOptionService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProductOptionResponse> createProductOption(@RequestBody ProductOptionRequest productOptionRequest) {
        ProductOptionResponse createdProductOption = productOptionService.createProductOption(productOptionRequest);
        return new ResponseEntity<>(createdProductOption, HttpStatus.CREATED);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductOptionResponse>> getAllProductOptions() {
        List<ProductOptionResponse> productOptions = productOptionService.getAllProductOptions();
        return ResponseEntity.ok(productOptions);
    }

    @GetMapping("/get-by-product-id/{productId}")
    public ResponseEntity<List<ProductOptionResponse>> getProductOptionsByProductId(@PathVariable UUID productId) {
        List<ProductOptionResponse> productOptions = productOptionService.getProductOptionsByProductId(productId);
        return ResponseEntity.ok(productOptions);
    }

    @GetMapping("/get-by-option-id/{optionId}")
    public ResponseEntity<List<ProductOptionResponse>> getProductOptionsByOptionId(@PathVariable UUID optionId) {
        List<ProductOptionResponse> productOptions = productOptionService.getProductOptionsByOptionId(optionId);
        return ResponseEntity.ok(productOptions);
    }

    @DeleteMapping("/delete/{productId}/{optionId}")
    public ResponseEntity<Void> deleteProductOption(@PathVariable UUID productId, @PathVariable UUID optionId) {
        productOptionService.deleteProductOption(productId, optionId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-by-product-id/{productId}")
    public ResponseEntity<Void> deleteProductOptionsByProductId(@PathVariable UUID productId) {
        productOptionService.deleteProductOptionsByProductId(productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-by-option-id/{optionId}")
    public ResponseEntity<Void> deleteProductOptionsByOptionId(@PathVariable UUID optionId) {
        productOptionService.deleteProductOptionsByOptionId(optionId);
        return ResponseEntity.noContent().build();
    }
}
