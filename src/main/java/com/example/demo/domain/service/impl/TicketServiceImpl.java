/**
 *
 */
package com.example.demo.domain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.repository.TicketRepository;
import com.example.demo.domain.service.TicketService;

/**
 * @author dameningen
 *
 */
@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    /**
     * {@inheritDoc}
     */
    public Ticket createOrUpdate(Ticket ticket) {
        return this.ticketRepository.save(ticket);
    }

    /**
     * {@inheritDoc}
     */
    public Page<Ticket> listTicket(int page, int count) {
        Pageable pages = PageRequest.of(page, count);
        return this.ticketRepository.findAll(pages);
    }

    /**
     * {@inheritDoc}
     */
    public Page<Ticket> findByCurrentAuthor(int page, int count, Account account) {
        Pageable pages = PageRequest.of(page, count);
        return this.ticketRepository.findByAuthorOrderByCreatedAtDesc(pages, account);
    }

}
