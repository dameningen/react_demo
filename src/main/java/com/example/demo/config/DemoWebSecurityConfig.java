/**
 *
 */
package com.example.demo.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.domain.service.AccountService;

/**
 * @author dameningen
 *
 */
@Configuration
@EnableWebSecurity
class DemoWebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private AccountService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/*.*", "/static/**", "/#/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth").permitAll()
                .mvcMatchers("/hello").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                // LOGIN
                .formLogin()
                // TODO ログインページは変なのを指定すると無限にリダイレクトしてしまう
                .loginPage("/#/login")
                .loginProcessingUrl("/perform_login")
                .failureHandler(LOGIN_FAILED)
                .usernameParameter("mailAddress").passwordParameter("password");

        http.exceptionHandling()
                // '/api/**'へ未認証状態でのアクセスには401を返す
                .defaultAuthenticationEntryPointFor(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                        new AntPathRequestMatcher("/api/**"))
                // 上記パス以外への未認証状態へのアクセスは302リダイレクトで'/login'へ遷移させる
                .defaultAuthenticationEntryPointFor(new LoginUrlAuthenticationEntryPoint("/#/login"),
                        AnyRequestMatcher.INSTANCE);

        // ajaxでcsrf tokenを利用するのでcookieに出力する
        CookieCsrfTokenRepository cookieCsrfTokenRepository = new CookieCsrfTokenRepository();
        // ajaxでも利用するため、httpOnlyはfalseにしておく
        cookieCsrfTokenRepository.setCookieHttpOnly(false);
        cookieCsrfTokenRepository.setCookiePath("/");
        http.csrf()
                .csrfTokenRepository(cookieCsrfTokenRepository);

        // RESTful APIを公開する場合、攻撃されやすくなるのでcorsの設定をしておく
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        // 実際は環境ごとにドメインが変わるはずなので、設定で動的に変更でき料にする
        corsConfiguration
                // TODO ドメインは指定する
                //.addAllowedOrigin("http://localhost:8080");
                .addAllowedOrigin("*");
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        // すべてのパスを対象にする
        corsSource.registerCorsConfiguration("/**", corsConfiguration);
        http.cors().configurationSource(corsSource);

    }

    /**
     * 動作確認用にロード時に、「admin」ユーザを登録する。
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder());
        //TODO: propertyでadmin情報は管理しましょう。
        userService.registerAdmin("admin", "secret", "admin@localhost");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * ログイン失敗時のハンドラ
     */
    private static final AuthenticationFailureHandler LOGIN_FAILED = (req, res, auth) -> {
        // HTTP Statusは401
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Content-Type: application/json
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Body
        res.getWriter().write("{cdode : login failed.}");
        res.getWriter().flush();
    };
}