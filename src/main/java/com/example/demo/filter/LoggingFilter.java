/**
 *
 */
package com.example.demo.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dameningen
 *
 */
@Slf4j
@Component
public class LoggingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpReq = ((HttpServletRequest) request);
        String uri = httpReq.getRequestURI();

        long start = System.currentTimeMillis();
        log.info(String.format("処理開始. URI: %s", uri));

        // リクエストパラメータを加工して1行のログとして出力する
        Map<String, String[]> params = httpReq.getParameterMap();
        StringBuilder strParams = new StringBuilder("リクエストパラメータ: [");
        boolean isFirstParam = true;
        for (Map.Entry<String, String[]> param : params.entrySet()) {
            if (isFirstParam) {
                isFirstParam = false;
            } else {
                // リクエストパラメータの2個目以降の場合は連結子としてカンマを付与する
                strParams.append(", ");
            }
            strParams.append(param.getKey()).append("=").append(Arrays.toString(param.getValue()));
        }
        strParams.append("]");
        log.info(strParams.toString());

        // 各処理実施
        chain.doFilter(request, response);

        int status = ((HttpServletResponse) response).getStatus();
        log.info(String.format("処理終了. 所要時間 %d millis. STATUS=%d", System.currentTimeMillis() - start, status));
    }

    @Override
    public void destroy() {
    }
}