/**
 *
 */
package com.example.demo.domain.service;

import org.springframework.stereotype.Service;

/**
 * @author dameningen
 *
 */
@Service
public interface TicketStatusService {

    /**
     * チケットステータスを登録する。
     * @param code コード
     * @param name ステータス名
     */
    void registerTicketStatus(int code, String name);

}