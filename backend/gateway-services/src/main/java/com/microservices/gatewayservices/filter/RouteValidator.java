package com.microservices.gatewayservices.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
        "/user-services/api/users/create", 
        "/user-services/api/users/token",
        "/user-services/api/**",
        "/image-service/**",
            "/eureka",
        "/onfig-services/api/sliders/get-all"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
