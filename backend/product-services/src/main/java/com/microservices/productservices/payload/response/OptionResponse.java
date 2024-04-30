package com.microservices.productservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OptionResponse {

    private UUID id;

    private String name;

    private String description;

    private String detail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;
}
