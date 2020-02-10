/**
 *
 */
package com.example.demo.application.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.application.resource.Response;
import com.example.demo.domain.entity.Account;
import com.example.demo.domain.entity.Ticket;
import com.example.demo.domain.enums.TicketStatus;
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
            ticket.setStatus(TicketStatus.New);
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

    private Account getUser(Principal principal, Model model) {
        Authentication authentication = (Authentication) principal;
        Account account = (Account) authentication.getPrincipal();
        return account;
    }
}
