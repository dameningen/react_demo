/**
 *
 */
package com.example.demo.application.controller;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.domain.model.SbRandomData;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api")
@Slf4j
public class SbRandomApiController {

    // TODO 本来はConfigureなクラスでBean定義してAutowiredするらしい
    /**
     * RESTクライアント
     */
    private final RestTemplate rt = new RestTemplate();
    private static final String SB_API_URL = "https://gturnquist-quoters.cfapps.io/api";

    /**
     * SpringBootが提供している動確用？のAPIを実行して戻り値を返却する。
     * @return
     */
    @RequestMapping(path = "/sbRandom", method = RequestMethod.GET)
    @ResponseBody
    public List<SbRandomData> getBirthStone() {
        ResponseEntity<List<SbRandomData>> apiResponse = rt.exchange(
                SB_API_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<SbRandomData>>() {
                });
        List<SbRandomData> res = apiResponse.getBody();
        log.info("★：：" + res.get(0).getValue().getQuote());

        return res;
    }

}
