/**
 *
 */
package com.example.demo.config;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

/**
 * Bean定義用のクラス。
 * @author dameningen
 *
 */
@Configuration
public class BeanConfig {

    @Value("${proxy.host:#{null}}")
    private String proxyHost;

    @Value("${proxy.port:0}")
    private int proxyPort;

    @Value("${proxy.user:#{null}}")
    private String proxyUser;

    @Value("${proxy.password:#{null}}")
    private String proxyPassword;

    @Value("${api.connect.timeout:0}")
    private int connectTimeout;

    @Value("${api.read.timeout:0}")
    private int readTimeout;

    /**
     * 外部サービス実行用の{@link RestTemplate}インスタンスを返却する。
     * @return
     */
    @Bean
    public RestTemplate getRestTemplate() {
        // 必要に応じてRestTemplateBuilderとか使ってインスタンスを作成する。
        HttpClientBuilder builder;
        if (!StringUtils.isEmpty(proxyHost) && proxyPort != 0) {
            builder = HttpClientBuilder.create().setProxy(new HttpHost(proxyHost, proxyPort));
            if (StringUtils.isEmpty(proxyUser) && StringUtils.isEmpty(proxyPassword)) {
                AuthScope authScope = new AuthScope(proxyHost, proxyPort);
                UsernamePasswordCredentials usernamePassword = new UsernamePasswordCredentials(proxyUser,
                        proxyPassword);
                BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
                credentialsProvider.setCredentials(authScope, usernamePassword);
                builder.setDefaultCredentialsProvider(credentialsProvider);
            }
        } else {
            builder = HttpClientBuilder.create();
        }

        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(
                builder.build());
        if (connectTimeout > 0) {
            requestFactory.setConnectTimeout(connectTimeout);
        }
        if (readTimeout > 0) {
            requestFactory.setReadTimeout(readTimeout);
        }

        RestTemplate restTemplate = new RestTemplate(requestFactory);
        return restTemplate;
    }
}
