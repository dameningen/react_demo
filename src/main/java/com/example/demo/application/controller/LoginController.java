/**
 *
 */
package com.example.demo.application.controller;

import org.springframework.ui.Model;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
//@Controller
@Slf4j
public class LoginController {
    //    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String index(Model mode) {
        log.info("■LoginController");
        return "/#/login";
    }
}