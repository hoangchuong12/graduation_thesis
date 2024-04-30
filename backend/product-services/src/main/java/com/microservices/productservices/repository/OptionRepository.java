package com.microservices.productservices.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.productservices.entity.Options;

public interface OptionRepository extends JpaRepository<Options, UUID> {

}
