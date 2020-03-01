/**
 *
 */
package com.example.demo.domain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.master.TicketCategory;

/**
 * @author dameningen
 *
 */
@Repository
public interface TicketCategoryRepository extends CrudRepository<TicketCategory, Integer> {

    /**
     * @return
     */
    List<TicketCategory> findAllByOrderByCode();

}
