/**
 *
 */
package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * チケット分類。
 *
 * @author dameningen
 *
 */
@AllArgsConstructor
@Getter
public enum TicketCategory {
    QUESTION(1, "質問"), CLAIM(2, "クレーム");

    /**
     * コード値
     */
    int code;

    /**
     * 名称
     */
    String name;
};