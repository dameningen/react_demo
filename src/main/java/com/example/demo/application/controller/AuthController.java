/**
 *
 */
package com.example.demo.application.controller;

import java.security.Principal;
import java.util.Objects;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.AuthResponse;
import com.example.demo.application.resource.Response;
import com.example.demo.domain.entity.Account;
import com.example.demo.domain.service.AccountService;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api/account")
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class AuthController extends AbstractController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(path = "/auth", method = RequestMethod.POST)
    public AuthResponse auth(@RequestBody Account account, HttpServletRequest request, HttpServletResponse response) {
        log.info("■認証API実行パラメータ：" + account.getMailAddress());

        AuthResponse auth = new AuthResponse();

        try {
            authenticate(account.getMailAddress(), account.getPassword());
            auth.setSuccess(true);
            auth.setToken("test");

        } catch (Exception e) {
            auth.setSuccess(false);
            auth.setMessage("該当するメールアドレスの登録がありません。");
        }

        return auth;
    }

    /**
     * ページ番号と1ページ辺りの要素数を指定してアカウントの一覧を取得する。
     * @param page
     * @param count
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "{page}/{count}")
    public ResponseEntity<Response<Page<Account>>> getAccountList(@PathVariable int page, @PathVariable int count) {

        log.debug("アカウント取得リクエスト page:" + page + " count:" + count);

        Response<Page<Account>> response = new Response<Page<Account>>();
        Page<Account> accounts = null;

        accounts = accountService.getAccountList(page, count);
        log.debug("■取得したアカウント：" + accounts.getContent());
        response.setData(accounts);

        return ResponseEntity.ok(response);
    }

    /**
     * パラメータに設定されたIDのアカウント情報を取得し、返却する。
     * @param id
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("{id}")
    public ResponseEntity<Response<Account>> findById(@PathVariable("id") long id) {
        Response<Account> response = new Response<Account>();
        Optional<Account> accountOptional = accountService.findById(id);

        Account account = accountOptional.get();
        if (account == null) {
            response.getErrors().add("ID[" + id + "]に対応するアカウントが存在しません。");
            return ResponseEntity.badRequest().body(response);
        }
        response.setData(account);
        return ResponseEntity.ok(response);
    }

    /**
     * リクエストを実行したアカウントの情報を取得し、返却する。
     * @param principal
     * @param model
     * @return
     */
    @GetMapping("/getCurrentAccountInfo")
    public Account getAccountInfo(Principal principal, Model model) {
        Authentication authentication = (Authentication) principal;
        Account auth = (Account) authentication.getPrincipal();

        return auth;
    }

    @GetMapping("/isAdminUser")
    public boolean isAdminUser(Principal principal, Model model) {
        Authentication authentication = (Authentication) principal;
        Account account = (Account) authentication.getPrincipal();
        return account.isAdmin();
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Response<Account>> update(
            HttpServletRequest request, @RequestBody Account account, BindingResult result) {

        Response<Account> response = new Response<Account>();
        try {
            log.debug("★更新するアカウント情報：" + account);
            Account accountPersisted = accountService.createOrUpdate(account);
            response.setData(accountPersisted);

        } catch (Exception e) {
            log.error("想定外の例外が発生。", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Authenticates the user. If something is wrong, an {@link AuthenticationException} will be thrown
     */
    private void authenticate(String mailAddress, String password) {
        Objects.requireNonNull(mailAddress);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(mailAddress, password));
        } catch (DisabledException e) {
            throw new RuntimeException("Disabled User", e);
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Incorrect Credentials", e);
        }
    }
}
