/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.master.TicketPriority;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketPriorityRepository extends CrudRepository<TicketPriority, Integer> {

}