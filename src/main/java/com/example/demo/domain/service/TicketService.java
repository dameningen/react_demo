/**
 *
 */
package com.example.demo.domain.service;

import org.springframework.data.domain.Page;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;

/**
 * @author dameningen
 *
 */
public interface TicketService {

    /**
     * チケットを新規作成または更新する。
     * @param ticket 新規登録または更新対象とするチケットインスタンス
     * @return 新規登録または更新後の情報が設定されたチケットインスタンス
     */
    Ticket createOrUpdate(Ticket ticket);

    /**
     * ページ番号と要素数を指定してチケットテーブルから情報を取得する。
     * @param page
     * @param count
     * @return
     */
    Page<Ticket> listTicket(int page, int count);

    /**
     * ページ番号と要素数、登録ユーザーを指定してチケットテーブルから情報を取得する。
     * @param page
     * @param count
     * @param account
     * @return
     */
    Page<Ticket> findByCurrentAuthor(int page, int count, Account account);

}