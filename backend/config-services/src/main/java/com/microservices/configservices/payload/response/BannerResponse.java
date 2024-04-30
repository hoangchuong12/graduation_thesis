package com.microservices.configservices.payload.response;

import java.util.Date;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class BannerResponse {

    private UUID id;

    private String name;

    @Lob
    private byte[] image;

    private String desciption;

    private UUID createdBy;

    private Date createdAt;

    private Date updatedAt;

    private UUID updatedBy;

    private int status;
}
