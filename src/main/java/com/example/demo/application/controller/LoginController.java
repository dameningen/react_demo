/**
 *
 */
package com.example.demo.application.controller;

import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author dameningen
 *
 */
//@Controller
public class LoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}