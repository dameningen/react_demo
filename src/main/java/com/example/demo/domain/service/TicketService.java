/**
 *
 */
package com.example.demo.domain.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.model.TicketSubInfo;

/**
 * @author dameningen
 *
 */
@Service
public interface TicketService {

    /**
     * チケットIDを指定してチケット情報を取得する。
     * @param id チケットID
     * @return 対応するチケットインスタンス
     */
    Optional<Ticket> findById(long id);

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

    /**
     * チケットのステータスや分類、優先度などの関連情報をそれぞのマスタから取得する。
     * @return
     */
    TicketSubInfo getTicketSubInfo();

}