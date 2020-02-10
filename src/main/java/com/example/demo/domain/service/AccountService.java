/**
 *
 */
package com.example.demo.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.repository.AccountRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * 認証処理。
 * @author dameningen
 *
 */
@Service
@Slf4j
public class AccountService implements UserDetailsService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String mailAddress) throws UsernameNotFoundException {
        if (StringUtils.isEmpty(mailAddress)) {
            log.warn("■mailAddressが空");
            throw new UsernameNotFoundException("mailAddress is empty");
        }

        Account user = repository.findByMailAddress(mailAddress);
        if (user == null) {
            log.warn("■該当User無し（mailAddress）：" + mailAddress);
            throw new UsernameNotFoundException("User not found: " + mailAddress);
        }

        return user;
    }

    /**
     * adminを登録するメソッド。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    public void registerAdmin(String username, String password, String mailAddress) {
        Account user = new Account(username, passwordEncoder.encode(password), mailAddress);
        user.setAdmin(true);
        repository.save(user);
    }

    /**
     * 管理者を登録するメソッド。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    public void registerManager(String username, String password, String mailAddress) {
        Account user = new Account(username, passwordEncoder.encode(password), mailAddress);
        user.setManager(true);
        repository.save(user);
    }

    /**
     * 一般ユーザを登録するメソッド。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    public void registerUser(String username, String password, String mailAddress) {
        Account user = new Account(username, passwordEncoder.encode(password), mailAddress);
        repository.save(user);
    }

}
