/**
 *
 */
package com.example.demo.domain.entity.master;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketCategoryEnum;

import lombok.NoArgsConstructor;

/**
 * チケット分類のEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketCategory")
@NoArgsConstructor
public class TicketCategory extends AbstractMaster<TicketCategoryEnum> {
    public TicketCategory(int code, String name) {
        super(code, name);
    }
}
