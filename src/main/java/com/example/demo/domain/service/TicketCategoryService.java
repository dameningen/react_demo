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
public interface TicketCategoryService {

    /**
     * チケット分類を登録する。
     * @param code コード
     * @param name 優先度名称
     */
    void registerTicketCategory(int code, String name);

}