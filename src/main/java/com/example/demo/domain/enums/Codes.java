package com.example.demo.domain.enums;

/**
 * マスタ値とするEnum向けのインタフェース。
 * @author dameningen
 *
 */
public interface Codes {

    /**
     * コード値を返却する。
     * @return コード値
     */
    int getCode();

    /**
     * 名称を返却する。
     * @return 名称
     */
    String getName();
}
