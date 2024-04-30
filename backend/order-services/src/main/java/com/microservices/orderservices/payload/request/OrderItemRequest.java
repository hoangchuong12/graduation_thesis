package com.microservices.orderservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OrderItemRequest {

    private UUID orderId;

    private Integer productId;

    private Integer quantity;

    private Double totalPrice;

    private Integer status;
}
