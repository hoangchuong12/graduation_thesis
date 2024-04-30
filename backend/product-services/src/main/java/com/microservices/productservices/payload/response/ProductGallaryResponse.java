package com.microservices.productservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductGallaryResponse {

    private UUID id;

    private UUID productId;

    private String image;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;
}
