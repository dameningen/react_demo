/**
 *
 */
package com.example.demo.domain.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.model.TicketSubInfo;
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
    @Override
    public Optional<Ticket> findById(long id) {
        return this.ticketRepository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Ticket createOrUpdate(Ticket ticket) {
        return this.ticketRepository.save(ticket);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<Ticket> listTicket(int page, int count) {
        Pageable pages = PageRequest.of(page, count);
        return this.ticketRepository.findAll(pages);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Page<Ticket> findByCurrentAuthor(int page, int count, Account account) {
        Pageable pages = PageRequest.of(page, count);
        return this.ticketRepository.findByAuthorOrderByCreatedAtDesc(pages, account);
    }

    @Override
    public TicketSubInfo getTicketSubInfo() {
        // TODO 自動生成されたメソッド・スタブ
        return null;
    }

}
