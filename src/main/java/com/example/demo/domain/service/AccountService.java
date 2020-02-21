/**
 *
 */
package com.example.demo.domain.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.entity.Account;

/**
 * アカウント関連サービス。
 * @author dameningen
 *
 */
@Service
public interface AccountService extends UserDetailsService {

    /**
     * アカウントIDを指定してチケット情報を取得する。
     * @param id アカウントID
     * @return 対応するアカウントインスタンス
     */
    Optional<Account> findById(long id);

    /**
     * アカウント一覧を取得する。
     * @param page
     * @param count
     * @return
     */
    Page<Account> getAccountList(int page, int count);

    /**
     * アカウント情報を更新する。
     * @param account
     * @return
     */
    @Transactional
    Account createOrUpdate(Account account);

    /**
     * 管理者権限ユーザを登録する。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    void registerAdmin(String username, String password, String mailAddress);

    /**
     * マネージャ権限ユーザを登録する。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    void registerManager(String username, String password, String mailAddress);

    /**
     * 一般ユーザを登録する。
     * @param username
     * @param password
     * @param mailAddress
     */
    @Transactional
    void registerUser(String username, String password, String mailAddress);

}
