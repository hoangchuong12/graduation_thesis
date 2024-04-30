package com.microservices.configservices.payload.response;

import java.util.Date;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.Data;


@Data
public class InfomationsResponse {

    private Long id;

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

    private Date updatedAt;

    private UUID updatedBy;
}
