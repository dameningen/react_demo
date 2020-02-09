/**
 *
 */
package com.example.demo.application.controller;

import java.security.Principal;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.AuthResponse;
import com.example.demo.domain.model.Account;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api")
@Slf4j
public class AuthController extends AbstractController {

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

    @GetMapping("/getUserInfo")
    public Account getUserInfo(Principal principal, Model model) {
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
