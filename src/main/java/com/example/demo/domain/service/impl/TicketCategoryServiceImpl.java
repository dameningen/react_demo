/**
 *
 */
package com.example.demo.domain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.master.TicketCategory;
import com.example.demo.domain.repository.TicketCategoryRepository;
import com.example.demo.domain.service.TicketCategoryService;

/**
 * @author dameningen
 *
 */
@Service
public class TicketCategoryServiceImpl implements TicketCategoryService {

    @Autowired
    private TicketCategoryRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public void registerTicketCategory(int code, String name) {
        TicketCategory entity = new TicketCategory(code, name);
        repository.save(entity);
    }

}
