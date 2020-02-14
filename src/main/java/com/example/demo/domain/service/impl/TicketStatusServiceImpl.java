/**
 *
 */
package com.example.demo.domain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.master.TicketStatus;
import com.example.demo.domain.repository.TicketStatusRepository;
import com.example.demo.domain.service.TicketStatusService;

/**
 * @author dameningen
 *
 */
@Service
public class TicketStatusServiceImpl implements TicketStatusService {

    @Autowired
    private TicketStatusRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public void registerTicketStatus(int code, String name) {
        TicketStatus entity = new TicketStatus(code, name);
        repository.save(entity);
    }

}
