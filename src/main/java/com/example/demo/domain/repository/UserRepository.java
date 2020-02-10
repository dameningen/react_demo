package com.example.demo.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.entity.User;

public interface UserRepository extends CrudRepository<User, String> {

    User findByEmail(String email);

    Page<User> findAll(Pageable pageale);
}
