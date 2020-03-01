/**
 *
 */
package com.example.demo.domain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.master.TicketStatus;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketStatusRepository extends CrudRepository<TicketStatus, Integer> {
    List<TicketStatus> findAllByOrderByCode();

}
