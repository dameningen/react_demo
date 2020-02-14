/**
 *
 */
package com.example.demo.domain.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
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
@ToString(exclude = { "password", "tickets" })
// @JsonIgnoreProperties({ "admin", "manager" })
// @Data ※@OneToManyなフィールドにGetter/Setterを作成するとエラーになってしまうっぽい？
public class Account implements UserDetails {

    private static final long serialVersionUID = 1L;

    /**
     * 権限。<br>
     * 一般ユーザ、マネージャ、システム管理者の3種類。
     * @author dameningen
     *
     */
    public enum Authority {
        ROLE_USER, ROLE_MANAGER, ROLE_ADMIN
    };

    /** ID */
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
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

    // roleは複数管理できるように、Set<>で定義。
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<Authority> authorities;

    @OneToMany(mappedBy = "assignedUser")
    private List<Ticket> tickets;

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
        this.authorities = EnumSet.of(Authority.ROLE_USER);
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
        return this.authorities.contains(Authority.ROLE_ADMIN);
    }

    /**
     * admin権限セット
     * @param isAdmin
     */
    public void setAdmin(boolean isAdmin) {
        if (isAdmin) {
            this.authorities.add(Authority.ROLE_MANAGER);
            this.authorities.add(Authority.ROLE_ADMIN);
        } else {
            this.authorities.remove(Authority.ROLE_ADMIN);
        }
    }

    /**
     * 管理者権限を保有しているか？
     * @return
     */
    @JsonIgnore
    public boolean isManager() {
        return this.authorities.contains(Authority.ROLE_MANAGER);
    }

    /**
     * 管理者権限セット
     * @param isManager
     */
    public void setManager(boolean isManager) {
        if (isManager) {
            this.authorities.add(Authority.ROLE_MANAGER);
        } else {
            this.authorities.remove(Authority.ROLE_MANAGER);
            this.authorities.remove(Authority.ROLE_ADMIN);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        // TODO ロジック要再検討
        if (this.authorities == null) {
            return authorities;
        }

        for (Authority authority : this.authorities) {
            authorities.add(new SimpleGrantedAuthority(authority.toString()));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public String getMailAddress() {
        return mailAddress;
    }

    public void setMailAddress(String mailAddress) {
        this.mailAddress = mailAddress;
    }

    public boolean isMailAddressVerified() {
        return mailAddressVerified;
    }

    public void setMailAddressVerified(boolean mailAddressVerified) {
        this.mailAddressVerified = mailAddressVerified;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAtAt() {
        return updatedAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
