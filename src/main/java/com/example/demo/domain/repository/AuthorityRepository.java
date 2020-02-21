/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.master.Authority;

/**
 * @author dameningen
 *
 */
@Repository
public interface AuthorityRepository extends CrudRepository<Authority, Integer> {

}
