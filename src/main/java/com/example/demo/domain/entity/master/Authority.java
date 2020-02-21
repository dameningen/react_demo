/**
 *
 */
package com.example.demo.domain.entity.master;

import javax.persistence.Entity;

import com.example.demo.domain.enums.AuthorityEnum;

import lombok.NoArgsConstructor;

/**
 * ユーザー権限のEntity。
 * @author dameningen
 *
 */
@Entity
//@Table(name = "authority")
@NoArgsConstructor
public class Authority extends AbstractMaster<AuthorityEnum> {
    public Authority(int code, String name) {
        super(code, name);
    }

    public Authority(AuthorityEnum code) {
        super(code);
    }

}
