package com.microservices.configservices.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.configservices.entity.Information;

public interface InformationRepository extends JpaRepository<Information, UUID> {

}
