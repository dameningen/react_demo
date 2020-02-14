/**
 *
 */
package com.example.demo.domain.entity.master;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.demo.domain.enums.TicketCategoryEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * チケット分類のEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticketCategory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    /** コード */
    @Id
    @Column(nullable = false, unique = true)
    private int code;

    @Column(nullable = false, unique = true)
    private String name;

    /**
     * パラメータのEnumに対応するTicketCategoryインスタンスを生成し、返却する。
     * @param category
     * @return
     */
    public static TicketCategory getTicketPriority(TicketCategoryEnum category) {
        TicketCategory ret = new TicketCategory();
        ret.setCode(category.getCode());
        ret.setName(category.getName());
        return ret;
    }
}
