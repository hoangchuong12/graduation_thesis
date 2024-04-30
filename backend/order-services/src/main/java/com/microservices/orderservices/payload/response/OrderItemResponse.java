package com.microservices.orderservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OrderItemResponse {

    private UUID id;

    private UUID orderId;

    private Integer productId;

    private Integer quantity;

    private Double totalPrice;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Integer status;
}
