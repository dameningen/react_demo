/**
 *
 */
package com.example.demo.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.example.demo.domain.enums.AuthorityEnum;
import com.example.demo.domain.enums.TicketCategoryEnum;
import com.example.demo.domain.enums.TicketPriorityEnum;
import com.example.demo.domain.enums.TicketStatusEnum;
import com.example.demo.domain.service.AccountService;
import com.example.demo.domain.service.TicketCategoryService;
import com.example.demo.domain.service.TicketPriorityService;
import com.example.demo.domain.service.TicketStatusService;

import lombok.extern.slf4j.Slf4j;

/**
 * AP起動時にDBに初期データを投入するイニシャライザ。
 * @author dameningen
 *
 */
@Component
@Slf4j
public class DBInitializer {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TicketStatusService ticketStatusService;
    @Autowired
    private TicketPriorityService ticketPriorityService;
    @Autowired
    private TicketCategoryService ticketCategoryService;

    /**
     * AP起動時にAccountテーブルに初期ユーザ、チケット関連マスタにデータを登録する。
     */
    @PostConstruct
    public void masterRecordInsert() {

        // ユーザー権限のマスタ情報を登録する
        // registerAuthority();

        // TODO: propertyでadmin情報は管理しましょう。
        registerInitialAdminAccount("admin", "secret", "admin@localhost");
        registerInitialUserAccount("user", "secret", "user@localhost");

        // チケットステータスのマスタ情報を登録する
        registerTicketStatus();
        // チケット優先度のマスタ情報を登録する
        registerTicketPriority();
        // チケット分類のマスタ情報を登録する
        registerTicketCategory();
    }

    /**
     * ユーザー権限マスタレコードを登録する。
     */
    private void registerAuthority() {
        for (AuthorityEnum st : AuthorityEnum.values()) {
            accountService.registerAuthority(st.getCode(), st.getName());
        }
    }

    /**
     * 初期管理ユーザをDBに登録する。
     * @param account 登録対象のアカウント情報
     */
    private void registerInitialAdminAccount(String userName, String password, String mailAddress) {
        try {
            accountService.registerAdmin(userName, password, mailAddress);
        } catch (DataIntegrityViolationException de) {
            log.info("管理ユーザは既に登録済み。");
        }
    }

    /**
     * 初期一般ユーザをDBに登録する。
     * @param account 登録対象のアカウント情報
     */
    private void registerInitialUserAccount(String userName, String password, String mailAddress) {
        try {
            accountService.registerUser(userName, password, mailAddress);
        } catch (DataIntegrityViolationException de) {
            log.info("一般ユーザは既に登録済み。");
        }
    }

    /**
     * チケットステータスマスタレコードを登録する。
     */
    private void registerTicketStatus() {
        for (TicketStatusEnum st : TicketStatusEnum.values()) {
            ticketStatusService.registerTicketStatus(st.getCode(), st.getName());
        }
    }

    /**
     * チケット優先度マスタレコードを登録する。
     */
    private void registerTicketPriority() {
        for (TicketPriorityEnum pr : TicketPriorityEnum.values()) {
            ticketPriorityService.registerTicketPriority(pr.getCode(), pr.getName());
        }
    }

    /**
     * チケット分類マスタレコードを登録する。
     */
    private void registerTicketCategory() {
        for (TicketCategoryEnum ct : TicketCategoryEnum.values()) {
            ticketCategoryService.registerTicketCategory(ct.getCode(), ct.getName());
        }
    }
}
