package com.microservices.configservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.configservices.entity.Information;

public interface InformationRepository extends JpaRepository<Information, Long> {

}
