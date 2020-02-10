/**
 *
 */
package com.example.demo.application.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.Response;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * ユーザー管理用のサービスを提供するコントローラ。
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * ユーザー登録処理。
     * @param request
     * @param user
     * @param result
     * @return
     */
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Response<User>> create(HttpServletRequest request,
            @RequestBody @Validated User user,
            BindingResult result) {

        log.debug("▼create start");
        Response<User> response = new Response<User>();

        try {
            // TODO パラメータに@Validated指定しておけばこのprivateメソッドによる判定処理は不要？
            // validateCreateUser(user, result);
            if (result.hasErrors()) {
                result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
                return ResponseEntity.badRequest().body(response);
            }

            // リクエストパラメータのパスワードを暗号化して設定しなおす
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // ユーザー情報を作成or更新する。
            User userPersisted = userService.createOrUpdate(user);
            // 作成or更新したユーザー情報をレスポンスに設定する
            response.setData(userPersisted);

        } catch (DuplicateKeyException de) {
            log.error("主キー重複による更新処理失敗。", de);
            response.getErrors().add("E-mail already registered !");
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            log.error("想定外の例外が発生", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        log.debug("▲create end:" + response);

        return ResponseEntity.ok(response);
    }

    // TODO 不要？
    //    private void validateCreateUser(User user, BindingResult result) {
    //        if (user.getEmail() == null) {
    //            result.addError(new ObjectError("User", "Email no information"));
    //        }
    //    }
}
