/**
 *
 */
package com.example.demo.domain.model;

import java.io.Serializable;
import java.util.List;

import com.example.demo.domain.entity.master.TicketCategory;
import com.example.demo.domain.entity.master.TicketPriority;
import com.example.demo.domain.entity.master.TicketStatus;

import lombok.Data;

/**
 * チケットのステータスや分類、優先度などの関連情報。
 * @author dameningen
 *
 */
@Data
public class TicketSubInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<TicketCategory> ticketCategories;
    private List<TicketStatus> ticketStatuses;
    private List<TicketPriority> ticketPriorities;
}
