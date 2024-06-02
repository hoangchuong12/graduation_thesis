package com.microservices.configservices.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.microservices.configservices.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
