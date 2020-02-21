/**
 *
 */
package com.example.demo.domain.entity.master;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.example.demo.domain.enums.Codes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author dameningen
 *
 */
@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractMaster<T extends Codes> implements Serializable {

    /** コード */
    @Id
    @Column(nullable = false, unique = true)
    protected int code;

    @Column(nullable = false, unique = true)
    protected String name;

    /**
     * パラメータのEnumに対応するマスタデータのインスタンスを生成する。
     * @param codes
     */
    public AbstractMaster(T codes) {
        this.setCode(codes.getCode());
        this.setName(codes.getName());
    }
}
