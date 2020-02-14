package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * チケットステータス。
 * @author dameningen
 *
 */
@AllArgsConstructor
@Getter
public enum TicketStatusEnum {

    New(1, "新規"), Assigned(2, "割り当て済み"), Resolved(3, "解決済み"),
    Approved(4, "承認済み"), Disapproved(5, "不承認"), Closed(6, "終了");

    /**
     * コード値
     */
    private int code;

    /**
     * 名称
     */
    private String name;

    public static TicketStatusEnum getStatus(String status) {
        switch (status) {
        case "New":
            return New;
        case "Assigned":
            return Assigned;
        case "Resolved":
            return Resolved;
        case "Approved":
            return Approved;
        case "Disapproved":
            return Disapproved;
        case "Closed":
            return Closed;
        default:
            return New;
        }
    }
}
