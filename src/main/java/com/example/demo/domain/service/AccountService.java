/**
 *
 */
package com.example.demo.domain.service;

import java.util.List;
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
     * アカウント一覧（{@link List}）を取得する。
     * @return アカウント一覧
     */
    List<Account> getAccountList();

    /**
     * アカウント一覧を{@link Page}オブジェクトとして取得する。
     * @param page 取得対象ページ（0開始）
     * @param count 取得件数
     * @return アカウント一覧
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
     * アカウント情報を削除する。
     * @param id 削除対象アカウントID
     */
    @Transactional
    void delete(long id);

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
