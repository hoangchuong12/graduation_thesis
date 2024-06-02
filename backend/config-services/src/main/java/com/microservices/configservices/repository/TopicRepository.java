package com.microservices.configservices.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.microservices.configservices.entity.Topic;

public interface TopicRepository extends JpaRepository<Topic, UUID> {
}
