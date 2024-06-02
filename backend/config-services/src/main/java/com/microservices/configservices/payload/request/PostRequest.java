package com.microservices.configservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PostRequest {

    private String name;

    private UUID topicId;

    private String image;

    private String description;

    private String detail;

    private UUID createdBy;

    private UUID updatedBy;

    private int status;
}
