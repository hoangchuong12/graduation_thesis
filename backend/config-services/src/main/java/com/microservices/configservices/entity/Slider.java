package com.microservices.configservices.entity;

import java.util.Date;
import java.util.UUID;
import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Slider {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;

    private String name;

    @Lob
    private byte[] image;

    private String desciption;

    private UUID createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    private Date updatedAt;

    private UUID updatedBy;

    private int status;
}
