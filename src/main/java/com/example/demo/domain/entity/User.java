package com.example.demo.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.example.demo.domain.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    @Id
    @Column(nullable = false, unique = true)
    private String id;

    /**
     * メールアドレス
     */
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email required")
    @Email(message = "Email invalid")
    private String email;

    /**
     * パスワード
     */
    @Column(nullable = false)
    @NotBlank(message = "Passoword required")
    private String password;

    /**
     * ロール
     */
    @Column(nullable = false)
    private Roles roles;

}
