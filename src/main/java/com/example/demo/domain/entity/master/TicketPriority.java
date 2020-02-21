/**
 *
 */
package com.example.demo.domain.entity.master;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketPriorityEnum;

import lombok.NoArgsConstructor;

/**
 * チケット優先度のEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketPriority")
@NoArgsConstructor
public class TicketPriority extends AbstractMaster<TicketPriorityEnum> {
    public TicketPriority(int code, String name) {
        super(code, name);
    }
}
