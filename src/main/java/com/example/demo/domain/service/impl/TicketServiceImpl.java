/**
 *
 */
package com.example.demo.domain.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.entity.master.TicketCategory;
import com.example.demo.domain.entity.master.TicketPriority;
import com.example.demo.domain.entity.master.TicketStatus;
import com.example.demo.domain.model.TicketSubInfo;
import com.example.demo.domain.repository.TicketCategoryRepository;
import com.example.demo.domain.repository.TicketPriorityRepository;
import com.example.demo.domain.repository.TicketRepository;
import com.example.demo.domain.repository.TicketStatusRepository;
import com.example.demo.domain.service.TicketService;

/**
 * @author dameningen
 *
 */
@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketCategoryRepository categoryRepository;
    @Autowired
    private TicketPriorityRepository priorityRepository;
    @Autowired
    private TicketStatusRepository statusRepository;

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

    /**
     * {@inheritDoc}
     */
    @Override
    public TicketSubInfo getTicketSubInfo() {
        TicketSubInfo ticketSubInfo = new TicketSubInfo();

        List<TicketCategory> ticketCategories = this.categoryRepository.findAllByOrderByCode();
        List<TicketStatus> ticketStatuses = this.statusRepository.findAllByOrderByCode();
        List<TicketPriority> ticketPriorities = this.priorityRepository.findAllByOrderByCode();

        ticketSubInfo.setTicketCategories(ticketCategories);
        ticketSubInfo.setTicketStatuses(ticketStatuses);
        ticketSubInfo.setTicketPriorities(ticketPriorities);

        return ticketSubInfo;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Ticket> getTicketList() {
        List<Ticket> ticketList = ticketRepository.findAllByOrderById();
        return ticketList;
    }

}
