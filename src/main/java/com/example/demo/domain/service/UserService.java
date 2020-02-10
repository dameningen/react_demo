package com.example.demo.domain.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.example.demo.domain.entity.User;

/**
 * ユーザー管理用の処理のインタフェース。
 * @author dameningen
 *
 */
@Component
public interface UserService {

    /**
     * メールアドレスで検索し、{@link User}インスタンスを返却する。
     * @param email メールアドレス
     * @return {@link User}インスタンス
     */
    User findByEmail(String email);

    /**
     *
     * @param user 作成または更新するユーザ情報
     * @return {@link User}インスタンス
     */
    User createOrUpdate(User user);

    /**
     * @param id ID
     * @return {@link Optional}インスタンス
     */
    Optional<User> findById(String id);

    void delete(String id);

    /**
     * @param page ページ番号
     * @param count ページに含める件数
     * @return {@link User}インスタンスを要素として持つ{}@link Page
     */
    Page<User> findAll(int page, int count);
}
