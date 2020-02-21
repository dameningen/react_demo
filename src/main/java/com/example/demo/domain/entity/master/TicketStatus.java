/**
 *
 */
package com.example.demo.domain.entity.master;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketStatusEnum;

import lombok.NoArgsConstructor;

/**
 * ステータスのEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketStatus")
@NoArgsConstructor
public class TicketStatus extends AbstractMaster<TicketStatusEnum> {
    public TicketStatus(int code, String name) {
        super(code, name);
    }

    public TicketStatus(TicketStatusEnum code) {
        super(code);
    }

}
