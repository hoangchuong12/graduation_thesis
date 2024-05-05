package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.ProductSaleRequest;
import com.microservices.productservices.payload.response.ProductSaleResponse;
import com.microservices.productservices.service.ProductSaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product-services/api/product-sales")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ProductSaleController {

    private final ProductSaleService productSaleService;

    public ProductSaleController(ProductSaleService productSaleService) {
        this.productSaleService = productSaleService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProductSaleResponse> createProductSale(@RequestBody ProductSaleRequest productSaleRequest) {
        ProductSaleResponse createdProductSale = productSaleService.create(productSaleRequest);
        return new ResponseEntity<>(createdProductSale, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ProductSaleResponse> getProductSaleById(@PathVariable UUID id) {
        ProductSaleResponse productSale = productSaleService.getById(id);
        if (productSale != null) {
            return ResponseEntity.ok(productSale);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductSaleResponse>> getAllProductSales() {
        List<ProductSaleResponse> productSales = productSaleService.getAll();
        return ResponseEntity.ok(productSales);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductSaleResponse> updateProductSale(@RequestBody ProductSaleRequest productSaleRequest, @PathVariable UUID id) {
        ProductSaleResponse updatedProductSale = productSaleService.update(id, productSaleRequest);
        if (updatedProductSale != null) {
            return ResponseEntity.ok(updatedProductSale);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductSaleResponse> deleteProductSale(@PathVariable UUID id) {
        ProductSaleResponse deletedProductSale = productSaleService.delete(id);
        if (deletedProductSale != null) {
            return ResponseEntity.ok(deletedProductSale);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-by-product-id/{productId}")
    public ResponseEntity<List<ProductSaleResponse>> findByProductId(@PathVariable UUID productId) {
        List<ProductSaleResponse> productSales = productSaleService.findByProductId(productId);
        return ResponseEntity.ok(productSales);
    }

    @PutMapping("/switch-status/{id}")
    public ResponseEntity<Void> switchStatus(@PathVariable UUID id) {
        productSaleService.switchStatus(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/trash/{id}")
    public ResponseEntity<Void> trash(@PathVariable UUID id) {
        productSaleService.trash(id);
        return ResponseEntity.ok().build();
    }  
}
