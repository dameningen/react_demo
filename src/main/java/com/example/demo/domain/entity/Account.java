/**
 *
 */
package com.example.demo.domain.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author dameningen
 *
 */
@Entity
@Table(name = "accounts")
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = { "password" })
// @JsonIgnoreProperties({ "admin", "manager" })
@Data
public class Account implements UserDetails {

    private static final long serialVersionUID = 1L;

    /**
     * 権限。<br>
     * 一般ユーザ、マネージャ、システム管理者の3種類。
     * @author dameningen
     *
     */
    public enum Authority implements Serializable {
        ROLE_USER, ROLE_MANAGER, ROLE_ADMIN
    };

    /** ID */
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String mailAddress;

    @JsonIgnore
    @Column(nullable = false)
    private boolean mailAddressVerified;

    @JsonIgnore
    @Column(nullable = false)
    private boolean enabled;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private List<Authority> roles;

    /**
     * コンストラクタ。
     * @param username ユーザ名
     * @param password パスワード
     * @param mailAddress メールアドレス
     */
    public Account(String username, String password, String mailAddress) {
        super();
        this.username = username;
        this.password = password;
        this.mailAddress = mailAddress;
        this.mailAddressVerified = false;
        this.enabled = true;
        this.roles = new ArrayList<>();
        this.roles.add(Authority.ROLE_USER);
    }

    /**
     * データ新規登録時に登録日と更新日に日時を自動セットする
     */
    @PrePersist
    public void prePersist() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * データ更新時に更新日に日時を自動セットする
     */
    @PreUpdate
    public void preUpdatet() {
        this.updatedAt = new Date();
    }

    /**
     * admin権限チェック
     * @return Admin権限有りの場合はtrue、そうでない場合はfalse
     */
    @JsonIgnore
    public boolean isAdmin() {
        return this.roles.contains(Authority.ROLE_ADMIN);
    }

    /**
     * admin権限セット
     * @param isAdmin
     */
    public void setAdmin(boolean isAdmin) {
        if (isAdmin) {
            this.roles.add(Authority.ROLE_MANAGER);
            this.roles.add(Authority.ROLE_ADMIN);
        } else {
            this.roles.remove(Authority.ROLE_ADMIN);
        }
    }

    /**
     * 管理者権限を保有しているか？
     * @return
     */
    @JsonIgnore
    public boolean isManager() {
        return this.roles.contains(Authority.ROLE_MANAGER);
    }

    /**
     * 管理者権限セット
     * @param isManager
     */
    public void setManager(boolean isManager) {
        if (isManager) {
            this.roles.add(Authority.ROLE_MANAGER);
        } else {
            this.roles.remove(Authority.ROLE_MANAGER);
            this.roles.remove(Authority.ROLE_ADMIN);
        }
    }

    /**
     * {@inheritDoc}
     */
    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        // TODO ロジック要再検討
        if (this.roles == null) {
            return authorities;
        }

        for (Authority authority : this.roles) {
            authorities.add(new SimpleGrantedAuthority(authority.toString()));
        }
        return authorities;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

}
