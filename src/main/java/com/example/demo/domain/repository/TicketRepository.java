/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.Ticket;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
}
