/**
 *
 */
package com.example.demo.application.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.BirthStone;

/**
 * @author dameningen
 *
 */
@RestController
@RequestMapping("api")
public class RestApiController {

    @RequestMapping(path = "/getBirthStone", method = RequestMethod.GET)
    @ResponseBody
    public List<BirthStone> getBirthStone() {
        BirthStone birthStone = new BirthStone("2月", "アメジスト", "紫");
        // BirthStone birthStone2 = new BirthStone("3月", "黒曜石", "黒");
        List<BirthStone> list = new ArrayList<>();
        list.add(birthStone);
        // list.add(birthStone2);
        return list;
    }

}
