/**
 *
 */
package com.example.demo.domain.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import com.example.demo.domain.enums.TicketCategory;
import com.example.demo.domain.enums.TicketPriority;
import com.example.demo.domain.enums.TicketStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * チケットのEntity。
 * @author dameningen
 *
 */
@Entity
@Table(name = "ticket")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    /** ID */
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    /** 優先度（SelectBox） */
    @Column(nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    /** チケットタイトル（textbox）  */
    @NotBlank(message = "ticketTitle required")
    @Column(nullable = false, unique = false)
    private String title;

    /** 分類（selectBox）  */
    @Column(nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private TicketCategory category;

    /** チケット説明（textarea）  */
    // TODO:CLOBが良いかも？
    @Column(nullable = false)
    private String description;

    /** 対応内容（textarea） */
    // TODO:CLOBが良いかも？
    @Column(nullable = true)
    private String correspondence;

    /** ステータス（SelectBox） */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    /** 期限（Date / Time pickers） */
    @Column(nullable = true)
    private Date deadLine;

    /** チケット登録者（label） */
    @ManyToOne
    @JoinColumn(nullable = false)
    private Account author;

    /** チケット更新者（label） */
    @ManyToOne
    @JoinColumn(nullable = false)
    private Account updater;

    /** 担当者（SelectBox（ユーザーTBLから取得））（※管理権限を持つユーザーと登録したユーザーのみ変更可能） */
    @ManyToOne
    @JoinColumn(nullable = true)
    private Account assignedUser;

    /** 登録日（Date / Time pickers） */
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    /** 更新日（Date / Time pickers） */
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

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

}
