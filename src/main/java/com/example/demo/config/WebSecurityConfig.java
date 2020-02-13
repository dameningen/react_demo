/**
 *
 */
package com.example.demo.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataIntegrityViolationException;
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

import com.example.demo.domain.entity.User;
import com.example.demo.domain.enums.RolesEnum;
import com.example.demo.domain.enums.TicketStatusEnum;
import com.example.demo.domain.service.AccountService;
import com.example.demo.domain.service.TicketStatusService;
import com.example.demo.domain.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * Spring Securityの機能設定クラス。
 * @author dameningen
 *
 */
@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountService accountService;
    @Autowired
    private TicketStatusService ticketStatusService;
    @Autowired
    private UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/*.*", "/static/**", "/#/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth").permitAll()
                // .antMatchers(HttpMethod.POST, "/api/user/create").permitAll()
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
                .csrfTokenRepository(cookieCsrfTokenRepository)
                // H2-consoleのパスはCSRF無効にしておく
                .ignoringAntMatchers("/h2-console/**")
                .and().headers().frameOptions().sameOrigin();

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
                .userDetailsService(accountService)
                .passwordEncoder(passwordEncoder());
        //TODO: propertyでadmin情報は管理しましょう。
        registerInitialAdminAccount("admin", "secret", "admin@localhost");
        registerInitialUserAccount("user", "secret", "user@localhost");

        // TODO チケットステータスのマスタ情報を登録する
        registerTicketStatus();

        // TODO：動作確認用にUserテーブルにデータを登録する
        log.debug("動作確認用にUserテーブルにデータを登録。");
        User user = new User("1", "admin@localhost", "pass", RolesEnum.ROLE_ADMIN);
        userService.createOrUpdate(user);
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
     * 初期管理ユーザをDBに登録する。
     * @param account 登録対象のアカウント情報
     */
    private void registerInitialAdminAccount(String userName, String password, String mailAddress) {
        try {
            accountService.registerAdmin(userName, password, mailAddress);
        } catch (DataIntegrityViolationException de) {
            log.info("管理ユーザは既に登録済み。");
        }
    }

    /**
     * 初期一般ユーザをDBに登録する。
     * @param account 登録対象のアカウント情報
     */
    private void registerInitialUserAccount(String userName, String password, String mailAddress) {
        try {
            accountService.registerUser(userName, password, mailAddress);
        } catch (DataIntegrityViolationException de) {
            log.info("一般ユーザは既に登録済み。");
        }
    }

    /**
     * チケットステータスマスタレコードを登録する。
     */
    private void registerTicketStatus() {
        for (TicketStatusEnum st : TicketStatusEnum.values()) {
            ticketStatusService.registerTicketStatus(st.getCode(), st.getName());
        }
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