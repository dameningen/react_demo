/**
 *
 */
package com.example.demo.domain.service;

/**
 * @author dameningen
 *
 */
public interface TicketStatusService {

    /**
     * チケットステータスを登録する。
     * @param code コード
     * @param name ステータス名
     */
    void registerTicketStatus(int code, String name);

}