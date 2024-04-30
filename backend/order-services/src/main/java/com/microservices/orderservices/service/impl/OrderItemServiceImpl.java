package com.microservices.orderservices.service.impl;

import com.microservices.orderservices.entity.OrderItem;
import com.microservices.orderservices.payload.request.OrderItemRequest;
import com.microservices.orderservices.payload.response.OrderItemResponse;
import com.microservices.orderservices.repository.OrderItemRepository;
import com.microservices.orderservices.service.OrderItemService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItemResponse create(OrderItemRequest orderItemRequest) {
        OrderItem orderItem = new OrderItem();
        mapRequestToEntity(orderItemRequest, orderItem);
        orderItem.setCreatedAt(LocalDateTime.now());
        OrderItem savedOrderItem = orderItemRepository.save(orderItem);
        return mapOrderItemToResponse(savedOrderItem);
    }

    @Override
    public OrderItemResponse getById(UUID id) {
        OrderItem orderItem = orderItemRepository.findById(id).orElse(null);
        if (orderItem != null) {
            return mapOrderItemToResponse(orderItem);
        }
        return null;
    }

    @Override
    public List<OrderItemResponse> getByOrderId(UUID orderId) {
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);
        return orderItems.stream()
                .map(this::mapOrderItemToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderItemResponse> getAll() {
        List<OrderItem> orderItems = orderItemRepository.findAll();
        return orderItems.stream()
                .map(this::mapOrderItemToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderItemResponse update(UUID id, OrderItemRequest orderItemRequest) {
        OrderItem existingOrderItem = orderItemRepository.findById(id).orElse(null);
        if (existingOrderItem != null) {
            mapRequestToEntity(orderItemRequest, existingOrderItem);
            existingOrderItem.setUpdatedAt(LocalDateTime.now());
            OrderItem updatedOrderItem = orderItemRepository.save(existingOrderItem);
            return mapOrderItemToResponse(updatedOrderItem);
        }
        return null;
    }

    @Override
    public OrderItemResponse delete(UUID id) {
        OrderItem orderItem = orderItemRepository.findById(id).orElse(null);
        if (orderItem != null) {
            orderItemRepository.delete(orderItem);
            return mapOrderItemToResponse(orderItem);
        }
        return null;
    }

    private OrderItemResponse mapOrderItemToResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .orderId(orderItem.getOrderId())
                .productId(orderItem.getProductId())
                .quantity(orderItem.getQuantity())
                .totalPrice(orderItem.getTotalPrice())
                .createdAt(orderItem.getCreatedAt())
                .updatedAt(orderItem.getUpdatedAt())
                .status(orderItem.getStatus())
                .build();
    }

    private void mapRequestToEntity(OrderItemRequest orderItemRequest, OrderItem orderItem) {
        BeanUtils.copyProperties(orderItemRequest, orderItem);
    }
}
