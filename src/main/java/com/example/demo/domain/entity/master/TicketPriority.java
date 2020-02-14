/**
 *
 */
package com.example.demo.domain.entity.master;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketPriorityEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * チケット優先度のEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketPriority")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketPriority implements Serializable {

    private static final long serialVersionUID = 1L;

    /** コード */
    @Id
    @Column(nullable = false, unique = true)
    private int code;

    @Column(nullable = false, unique = true)
    private String name;

    /**
     * パラメータのEnumに対応するTicketPriorityインスタンスを生成し、返却する。
     * @param priority
     * @return
     */
    public static TicketPriority getTicketPriority(TicketPriorityEnum priority) {
        TicketPriority ret = new TicketPriority();
        ret.setCode(priority.getCode());
        ret.setName(priority.getName());
        return ret;
    }
}
