/**
 *
 */
package com.example.demo.domain.model;

import java.io.Serializable;

import lombok.Data;

/**
 * @author dameningen
 *
 */
@Data
public class BirthStone implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 月
     */
    private String month;
    /**
     * 名前
     */
    private String name;
    /**
     * 色
     */
    private String color;

    /**
     * コンストラクタ。
     * @param month 月
     * @param name 名前
     * @param color 色
     */
    public BirthStone(String month, String name, String color) {
        super();
        this.month = month;
        this.name = name;
        this.color = color;
    }

}
