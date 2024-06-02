package com.microservices.configservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PostResponse {

    private UUID id;

    private String name;

    private UUID topicId;

    private String image;

    private String description;

    private String detail;

    private UUID createdBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID updatedBy;

    private int status;
}
