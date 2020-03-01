/**
 *
 */
package com.example.demo.domain.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.entity.Account;

/**
 * @author dameningen
 *
 */
@Repository
public interface AccountRepository extends PagingAndSortingRepository<Account, Long> {
    Account findByUsername(String username);

    Account findByMailAddress(String mailAddress);

    List<Account> findByEnabledTrueOrderById();
}
