/**
 *
 */
package com.example.demo.domain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.master.TicketPriority;
import com.example.demo.domain.repository.TicketPriorityRepository;
import com.example.demo.domain.service.TicketPriorityService;

/**
 * @author dameningen
 *
 */
@Service
public class TicketPriorityServiceImpl implements TicketPriorityService {

    @Autowired
    private TicketPriorityRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public void registerTicketPriority(int code, String name) {
        TicketPriority entity = new TicketPriority(code, name);
        repository.save(entity);
    }

}
