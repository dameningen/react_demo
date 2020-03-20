/**
 *
 */
package com.example.demo.application.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.Response;
import com.example.demo.domain.entity.Account;
import com.example.demo.domain.service.AccountService;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api/accounts")
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class AccountController extends AbstractController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * アカウントの一覧を取得する。
     * TODO：チケット更新画面のプルダウン生成時にも使用する為、一般ユーザでも呼べるようにしているが、
     * 　　　アカウント管理用の一覧取得とプルダウン生成用の一覧取得処理は分けた方が良い。
     * 　　　（プルダウン生成用のリストにはidと名前だけ返却する）
     * @return アカウント一覧
     */
    @GetMapping(value = "")
    public ResponseEntity<Response<List<Account>>> getAccountList() {
        log.debug("■アカウントリスト取得");
        Response<List<Account>> response = new Response<>();
        List<Account> accounts = accountService.getAccountList();
        log.debug("■取得したアカウント：" + accounts);
        response.setData(accounts);
        return ResponseEntity.ok(response);
    }

    /**
     * ページ番号と1ページ辺りの要素数を指定してアカウントの一覧を取得する。
     * @param page ページ番号
     * @param count ページあたりの件数
     * @return アカウント一覧
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "{page}/{count}")
    public ResponseEntity<Response<Page<Account>>> getAccountList(@PathVariable int page, @PathVariable int count) {
        log.debug("アカウント取得リクエスト page:" + page + " count:" + count);
        Response<Page<Account>> response = new Response<>();
        Page<Account> accounts = accountService.getAccountList(page, count);
        log.debug("■取得したアカウント：" + accounts.getContent());
        response.setData(accounts);
        return ResponseEntity.ok(response);
    }

    /**
     * パラメータに設定されたIDのアカウント情報を取得し、返却する。
     * @param id 取得対象アカウントID
     * @return アカウント情報
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("{id}")
    public ResponseEntity<Response<Account>> findById(@PathVariable("id") long id) {
        log.debug("■ID[" + id + "]のアカウント情報を取得。");

        Response<Account> response = new Response<>();
        Optional<Account> accountOptional = accountService.findById(id);

        Account account = accountOptional.get();
        // アカウント情報が取得できなかった場合はエラーレスポンスを返却する
        if (account == null) {
            response.getErrors().add("ID[" + id + "]に対応するアカウントが存在しません。");
            return ResponseEntity.badRequest().body(response);
        }
        response.setData(account);
        return ResponseEntity.ok(response);
    }

    /**
     * リクエストを実行したアカウントの情報を取得し、返却する。
     * @param principal プリンシパル
     * @return リクエスト実行ユーザのアカウント情報
     */
    @GetMapping("/getCurrentAccountInfo")
    public Account getAccountInfo(Principal principal) {
        Authentication authentication = (Authentication) principal;
        Account account = (Account) authentication.getPrincipal();
        return account;
    }

    /**
     * アカウント情報を新規作成する。
     * @param account アカウント情報
     * @return 新規作成したアカウント情報
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("{id}")
    public ResponseEntity<Response<Account>> create(@RequestBody Account account) {
        log.debug("■新規作成するアカウント情報：" + account);
        return createOrUpdate(account);
    }

    /**
     * アカウント情報を更新する。
     * @param account アカウント情報
     * @return 更新したアカウント情報
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<Response<Account>> update(@RequestBody Account account) {
        log.debug("■更新するアカウント情報：" + account);
        return createOrUpdate(account);
    }

    /**
     * アカウント情報を削除する。
     * @param id 削除対象のアカウントID
     * @return 削除処理のレスポンス
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Response<String>> delete(@PathVariable("id") long id) {
        log.debug("■削除するアカウントID：" + id);
        Response<String> response = new Response<>();
        accountService.delete(id);
        response.setData("削除成功");
        return ResponseEntity.ok(response);
    }

    /**
     * アカウント情報の新規登録または更新処理。
     * TODO：本来は登録処理と更新処理のメソッドは分けた方が良いがサンプル実装なので。
     * @param account 登録または更新対象のアカウント情報
     * @return アカウント登録・更新処理のレスポンス
     */
    private ResponseEntity<Response<Account>> createOrUpdate(Account account) {
        Response<Account> response = new Response<>();
        try {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            account.setEnabled(true);
            // TODO：本来は登録処理と更新処理のメソッドは分けた方が良いがデモなので
            Account accountPersisted = accountService.createOrUpdate(account);
            response.setData(accountPersisted);

        } catch (Exception e) {
            log.error("想定外の例外が発生。", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}
