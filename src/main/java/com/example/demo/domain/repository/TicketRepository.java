/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {

    Page<Ticket> findByAuthorOrderByCreatedAtDesc(Pageable pages, Account account);

    Page<Ticket> findAll(Pageable pageable);
}