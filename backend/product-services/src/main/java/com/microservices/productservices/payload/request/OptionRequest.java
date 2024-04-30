package com.microservices.productservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OptionRequest {

    private String name;

    private String description;

    private String detail;

    private UUID createdBy;

    private UUID updatedBy;

    private UUID productId;
}
