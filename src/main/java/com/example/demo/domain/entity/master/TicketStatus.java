/**
 *
 */
package com.example.demo.domain.entity.master;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ステータスのEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketStatus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    /** コード */
    @Id
    @Column(nullable = false, unique = true)
    private int code;

    @Column(nullable = false, unique = true)
    private String name;

    /**
     * パラメータのEnumに対応するTicketStatusインスタンスを生成し、返却する。
     * @param status
     * @return
     */
    public static TicketStatus getTicketStatus(TicketStatusEnum status) {
        TicketStatus ret = new TicketStatus();
        ret.setCode(status.getCode());
        ret.setName(status.getName());
        return ret;
    }
}
