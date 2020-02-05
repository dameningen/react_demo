/**
 *
 */
package com.example.demo.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.model.Account;

/**
 * @author dameningen
 *
 */
@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
    public Account findByUsername(String username);

    public Account findByMailAddress(String mailAddress);
}
