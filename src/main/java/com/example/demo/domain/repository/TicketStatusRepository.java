/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.TicketStatus;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketStatusRepository extends CrudRepository<TicketStatus, Integer> {

}
