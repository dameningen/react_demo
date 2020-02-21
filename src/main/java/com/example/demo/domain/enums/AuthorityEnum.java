package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 権限。<br>
 * 一般ユーザ、マネージャ、システム管理者の3種類。
 * @author dameningen
 *
 */
@AllArgsConstructor
@Getter
public enum AuthorityEnum implements Codes {
    ROLE_ADMIN(1, "ROLE_ADMIN"), ROLE_USER(2, "ROLE_USER"), ROLE_MANAGER(3, "ROLE_MANAGER");

    /**
     * コード値
     */
    private int code;

    /**
     * 名称
     */
    private String name;

};
