package com.microservices.configservices.payload.request;

import java.util.UUID;
import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class InformationRequest {

    private String name;

    @Lob
    private byte[] logo;

    private String address;

    private String email;

    private String phone;

    private String businessNumber;

    private String license;

    private String repersent;

    private String repersentPhone;

    private UUID updatedBy;
}
