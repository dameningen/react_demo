/**
 *
 */
package com.example.demo.application.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.Response;
import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.entity.TicketStatus;
import com.example.demo.domain.enums.TicketStatusEnum;
import com.example.demo.domain.service.TicketService;

import lombok.extern.slf4j.Slf4j;

/**
 * チケット操作用のサービスを提供するコントローラ。
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api/ticket")
@Slf4j
public class TicketController extends AbstractController {

    @Autowired
    private TicketService ticketService;

    /**
     * チケットを新規登録する。
     * @param request
     * @param user
     * @param result
     * @return
     */
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Response<Ticket>> create(Principal principal, Model model, @RequestBody Ticket ticket,
            BindingResult result) {

        Response<Ticket> response = new Response<Ticket>();
        try {
            if (result.hasErrors()) {
                result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
                log.error("エラー発生：" + result);
                return ResponseEntity.badRequest().body(response);
            }

            // リクエストに設定された情報に新規登録用の情報を付与する
            ticket.setStatus(TicketStatus.getTicketStatus(TicketStatusEnum.New));
            Account account = getUser(principal, model);
            ticket.setAuthor(account);
            ticket.setUpdater(account);

            // チケット情報を新規登録する
            Ticket insertedTicket = ticketService.createOrUpdate(ticket);
            log.info("チケットを新規登録。" + insertedTicket);
            response.setData(insertedTicket);

        } catch (Exception e) {
            log.error("想定外の例外が発生。", e);
            response.getErrors().add(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);

    }

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
     * @param model
     * @param page
     * @param count
     * @return
     */
    @GetMapping(value = "{page}/{count}")
    public ResponseEntity<Response<Page<Ticket>>> findAll(Principal principal, Model model, @PathVariable int page,
            @PathVariable int count) {

        log.debug("チケット取得リクエスト page:" + page + " count:" + count);

        Response<Page<Ticket>> response = new Response<Page<Ticket>>();
        Page<Ticket> tickets = null;
        Account account = getUser(principal, model);
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
     * アカウント情報を取得する。
     * @param principal
     * @param model
     * @return
     */
    private Account getUser(Principal principal, Model model) {
        Authentication authentication = (Authentication) principal;
        Account account = (Account) authentication.getPrincipal();
        // TODO nullチェック要る？
        return account;
    }
}
