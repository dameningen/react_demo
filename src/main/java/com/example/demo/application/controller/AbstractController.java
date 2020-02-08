/**
 *
 */
package com.example.demo.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

/**
 * コントローラクラスの基底クラス。
 * @author dameningen
 *
 */
public abstract class AbstractController {

    /**
     * SpringBootの動作確認用？APIのパス
     */
    protected static final String SB_API_URL = "https://gturnquist-quoters.cfapps.io/api";

    /**
     * RESTクライアント
     */
    @Autowired
    protected RestTemplate restTemplate;

}
