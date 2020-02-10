/**
 *
 */
package com.example.demo.domain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Ticket createOrUpdate(Ticket ticket) {
        return this.ticketRepository.save(ticket);
    }
}
