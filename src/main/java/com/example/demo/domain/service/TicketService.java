/**
 *
 */
package com.example.demo.domain.service;

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

}