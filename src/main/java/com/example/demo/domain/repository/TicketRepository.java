/**
 *
 */
package com.example.demo.domain.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketRepository extends PagingAndSortingRepository<Ticket, Long> {
    List<Ticket> findAllByOrderById();

    Page<Ticket> findByAuthorOrderByCreatedAtDesc(Pageable pages, Account account);

}
