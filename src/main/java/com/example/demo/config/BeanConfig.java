/**
 *
 */
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Bean定義用のクラス。
 * @author dameningen
 *
 */
@Configuration
public class BeanConfig {

    /**
     * 外部サービス実行用の{@link RestTemplate}インスタンスを返却する。
     * @return
     */
    @Bean
    public RestTemplate getRestTemplate() {
        // 必要に応じてRestTemplateBuilderとか使ってインスタンスを作成する。
        return new RestTemplate();
    }
}
