package com.microservices.userservices.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.microservices.userservices.entity.Role;

public interface RoleRepository extends JpaRepository<Role, UUID> {

}

