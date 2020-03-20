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
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
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
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.entity.master.TicketStatus;
import com.example.demo.domain.enums.TicketStatusEnum;
import com.example.demo.domain.model.TicketSubInfo;
import com.example.demo.domain.service.TicketService;

import lombok.extern.slf4j.Slf4j;

/**
 * チケット操作用のサービスを提供するコントローラ。
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api/tickets")
@Slf4j
public class TicketController extends AbstractController {

    @Autowired
    private TicketService ticketService;

    /**
     * ページ番号と1ページ辺りの要素数を指定してチケットの一覧を取得する。
     * @param principal
     * @param page
     * @param count
     * @return
     */
    @GetMapping(value = "")
    public ResponseEntity<Response<List<Ticket>>> findAll() {
        log.debug("■チケット一覧取得リクエスト");

        Response<List<Ticket>> response = new Response<>();
        List<Ticket> ticketList = ticketService.getTicketList();
        log.debug("■取得したチケット：" + ticketList);
        response.setData(ticketList);

        return ResponseEntity.ok(response);
    }

    /**
     * チケット情報を取得する。
     * @param id チケットID
     * @return チケット情報
     */
    @GetMapping(value = "{id}")
    public ResponseEntity<Response<Ticket>> findById(@PathVariable("id") long id) {
        Response<Ticket> response = new Response<Ticket>();
        Optional<Ticket> ticketOptional = ticketService.findById(id);
        Ticket ticket = ticketOptional.get();
        if (ticket == null) {
            response.getErrors().add("ID[" + id + "]に対応するチケットが存在しません。");
            return ResponseEntity.badRequest().body(response);
        }
        response.setData(ticket);

        return ResponseEntity.ok(response);
    }

    /**
     * ページ番号と1ページ辺りの要素数を指定してチケットの一覧を取得する。
     * @param principal
     * @param page
     * @param count
     * @return
     */
    @GetMapping(value = "{page}/{count}")
    public ResponseEntity<Response<Page<Ticket>>> findAll(Principal principal, @PathVariable int page,
            @PathVariable int count) {

        log.debug("チケット取得リクエスト page:" + page + " count:" + count);

        Response<Page<Ticket>> response = new Response<>();
        Page<Ticket> tickets = null;
        Account account = getUser(principal);
        if (account.isAdmin() || account.isManager()) {
            log.debug("■Admin or Managerアカウント");
            // TODO 管理者権限の場合は登録者を見ずにすべてのチケットを取得する
            tickets = ticketService.listTicket(page, count);
        } else {
            long accountId = account.getId();
            log.debug("■Userアカウント id：" + accountId);
            tickets = ticketService.findByCurrentAuthor(page, count, account);
        }
        log.debug("■取得したチケット：" + tickets.getContent());
        response.setData(tickets);

        return ResponseEntity.ok(response);
    }

    /**
     * チケットのサブ情報として、分類、優先度、ステータスのリストを返却する。
     * @return チケットサブ情報（分類、優先度、ステータスのリスト）
     */
    @GetMapping(value = "/subInfo")
    public ResponseEntity<Response<TicketSubInfo>> findAllTicketSubInfo() {

        Response<TicketSubInfo> response = new Response<>();
        TicketSubInfo subInfo = ticketService.getTicketSubInfo();
        response.setData(subInfo);

        return ResponseEntity.ok(response);
    }

    /**
     * チケットを新規登録する。
     * @param principal
     * @param ticket
     * @param result
     * @return
     */
    @PostMapping("")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Response<Ticket>> create(Principal principal, @RequestBody Ticket ticket,
            BindingResult result) {

        log.debug("■チケット新規登録：" + ticket);

        Response<Ticket> response = new Response<>();
        try {
            if (result.hasErrors()) {
                result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
                log.error("■エラー発生：" + result);
                return ResponseEntity.badRequest().body(response);
            }

            // リクエストに設定された情報に新規登録用の情報を付与する
            ticket.setStatus(new TicketStatus(TicketStatusEnum.New));
            Account account = getUser(principal);
            ticket.setAuthor(account);
            ticket.setUpdater(account);

            // チケット情報を新規登録する
            Ticket insertedTicket = ticketService.createOrUpdate(ticket);
            log.info("■チケット新規登録[" + insertedTicket + "]");
            response.setData(insertedTicket);

        } catch (Exception e) {
            log.error("想定外の例外が発生。", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);

    }

    /**
     * チケット情報を更新する
     * @param ticket 更新するチケット情報
     * @return
     */
    @PutMapping("{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Response<Ticket>> update(@RequestBody Ticket ticket) {
        Response<Ticket> response = new Response<>();
        try {
            log.debug("■更新するチケット情報[" + ticket + "]");
            Ticket ticketPersisted = ticketService.createOrUpdate(ticket);
            response.setData(ticketPersisted);

        } catch (Exception e) {
            log.error("想定外の例外が発生。", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    /**
     * チケット情報を削除する。
     * @param id チケットID
     * @return チケット情報
     */
    @DeleteMapping(value = "{id}")
    public ResponseEntity<Response<String>> deleteById(@PathVariable("id") long id) {
        log.debug("■削除するチケットID：" + id);
        Response<String> response = new Response<>();
        ticketService.delete(id);
        // TODO 検証用の処理なのでレコード物理削除しているが、
        //       本来はidをキーにしてレコードの有効フラグカラムの値をfalseに
        //       変えて論理削除するなど考えられる。
        response.setData("削除成功");
        return ResponseEntity.ok(response);
    }

    /**
     * アカウント情報を取得する。
     * @param principal
     * @return
     */
    private Account getUser(Principal principal) {
        Authentication authentication = (Authentication) principal;
        Account account = (Account) authentication.getPrincipal();
        // TODO nullチェック要る？
        return account;
    }
}
