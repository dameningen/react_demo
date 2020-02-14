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
public interface TicketPriorityService {

    /**
     * チケット優先度を登録する。
     * @param code コード
     * @param name 優先度名称
     */
    void registerTicketPriority(int code, String name);

}