package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * チケット優先度。
 * @author dameningen
 *
 */
@AllArgsConstructor
@Getter
public enum TicketPriorityEnum {
    HIGH(1, "高"), NORMAL(2, "中"), LOW(3, "低");

    int code;
    String value;

}
