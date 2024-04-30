package com.microservices.orderservices.service.impl;

import com.microservices.orderservices.entity.Order;
import com.microservices.orderservices.payload.request.OrderRequest;
import com.microservices.orderservices.payload.response.OrderResponse;
import com.microservices.orderservices.repository.OrderRepository;
import com.microservices.orderservices.service.OrderService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderResponse create(OrderRequest orderRequest) {
        Order order = new Order();
        mapRequestToEntity(orderRequest, order);
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        return mapOrderToOrderResponse(savedOrder);
    }

    @Override
    public OrderResponse getById(UUID id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            return mapOrderToOrderResponse(order);
        }
        return null;
    }

    @Override
    public List<OrderResponse> getAll() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapOrderToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse update(UUID id, OrderRequest orderRequest) {
        Order existingOrder = orderRepository.findById(id).orElse(null);
        if (existingOrder != null) {
            mapRequestToEntity(orderRequest, existingOrder);
            existingOrder.setUpdatedAt(LocalDateTime.now());
            Order updatedOrder = orderRepository.save(existingOrder);
            return mapOrderToOrderResponse(updatedOrder);
        }
        return null;
    }

    @Override
    public OrderResponse delete(UUID id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            orderRepository.delete(order);
            return mapOrderToOrderResponse(order);
        }
        return null;
    }

    @Override
    public List<OrderResponse> getByUserId(UUID userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapOrderToOrderResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapOrderToOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalPrice(order.getTotalPrice())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryPhone(order.getDeliveryPhone())
                .deliveryName(order.getDeliveryName())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .status(order.getStatus())
                .build();
    }

    private void mapRequestToEntity(OrderRequest orderRequest, Order order) {
        BeanUtils.copyProperties(orderRequest, order);
    }
}
