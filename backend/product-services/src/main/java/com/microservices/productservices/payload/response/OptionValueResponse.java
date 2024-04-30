package com.microservices.productservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OptionValueResponse {

    private UUID id;

    private UUID optionId;

    private Integer value;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;
}
