/**
 *
 */
package com.example.demo.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.domain.service.AccountService;

/**
 * Spring Securityの機能設定クラス。
 * @author dameningen
 *
 */
//@Configuration
//@EnableWebSecurity
//@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountService userService;

    /**
     * 静的コンテンツに対して認証制限対象外にする設定。
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/api/auth")
                .and()
                // 静的リソース(/static)とH2DBのコンソールに対するアクセスはセキュリティ設定を無視する
                //.ignoring().antMatchers("/", "/*.ico", "/index.html", "/login", "/static/**")
                .ignoring().antMatchers("/", "/*.ico", "/login", "/static/**")
                .and()
                .ignoring().antMatchers("/h2-console/**/**");
    }

    /**
     * HTTP通信に対する認証設定。
     */
    @Override
    protected void configure(HttpSecurity httpSec) throws Exception {

        RequestMatcher csrfRequestMatcher = new RequestMatcher() {
            // CSRF対象外URL:
            private AntPathRequestMatcher[] requestMatchers = {
                    new AntPathRequestMatcher("/api/auth")
            };

            @Override
            public boolean matches(HttpServletRequest request) {
                for (AntPathRequestMatcher rm : requestMatchers) {
                    if (rm.matches(request)) {
                        return false;
                    }
                }
                return true;
            }
        };
        httpSec
                .authorizeRequests()
                //                .antMatchers("/", "/login", "/index.html", "/api/auth", "/app/dashboard", "/static/**", "/*.ico")
                //                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();

        httpSec.exceptionHandling()
                // '/api/**'へ未認証状態でのアクセスには401を返す
                .defaultAuthenticationEntryPointFor(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                        new AntPathRequestMatcher("/api/sbRandom"))
                // 上記パス以外への未認証状態へのアクセスは302リダイレクトで'/login'へ遷移させる
                .defaultAuthenticationEntryPointFor(new LoginUrlAuthenticationEntryPoint("/"),
                        AnyRequestMatcher.INSTANCE);

        // ajaxでcsrf tokenを利用するのでcookieに出力する
        CookieCsrfTokenRepository cookieCsrfTokenRepository = new CookieCsrfTokenRepository();
        // ajaxでも利用するため、httpOnlyはfalseにしておく
        cookieCsrfTokenRepository.setCookieHttpOnly(false);
        cookieCsrfTokenRepository.setCookiePath("/");
        httpSec.csrf()
                //.ignoringAntMatchers("/", "/login", "/app/dashborad", "/index.html", "/static/**")
                .requireCsrfProtectionMatcher(csrfRequestMatcher)
                .csrfTokenRepository(cookieCsrfTokenRepository);

        // RESTful APIを公開する場合、攻撃されやすくなるのでcorsの設定をしておく
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        // 実際は環境ごとにドメインが変わるはずなので、設定で動的に変更でき料にする
        corsConfiguration.addAllowedOrigin("http://localhost:8080");
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        // すべてのパスを対象にする
        corsSource.registerCorsConfiguration("/**", corsConfiguration);
        httpSec.cors().configurationSource(corsSource);

        //        httpSec.cors();
        //
        //        // ログイン認証を行うパスを設定
        //        httpSec.authorizeRequests()
        //                // ログイン無しでアクセス許可するパス
        //                //（Reactのエントリーポイントのindex.htmlと"/login"、認証用API"/auth"を設定）
        //                .antMatchers("/", "/index.html", "/login", "/api/auth").permitAll()
        //                // ADMIN権限がある場合のみアクセス可能なURL
        //                .antMatchers("/admin/**").hasRole("ADMIN")
        //                // その他はログインが必要
        //                .anyRequest().authenticated();
        //
        //        // ログイン処理を行うURLを設定する
        //        httpSec.formLogin().loginProcessingUrl("/login_process")
        //                // ログイン画面のURL
        //                //.loginPage("/index.html")
        //                // ログイン失敗時に遷移するURL
        //                .failureUrl("/login?error=true")
        //                // ログイン成功時に遷移するURL（第2引数にfalseを設定しておくとログインしたら指定したURLに飛んでくれるらしい）
        //                .defaultSuccessUrl("/", false)
        //                // ログイン画面のフォームから送信されたデータを取得（メールアドレスとパスワード）
        //                .usernameParameter("mailAddress").passwordParameter("password");
        //
        //        // ログアウト処理を行うURLを設定する
        //        httpSec.logout().logoutUrl("/logout")
        //                // ログアウト成功時に遷移するURLを設定する
        //                .logoutSuccessUrl("/login")
        //                // ログアウト時にCookieからJSESSIONIDを削除する
        //                .deleteCookies("JSESSIONID")
        //                // ログアウトしたらセッションを無効にする
        //                .invalidateHttpSession(true);

        //        // filter追加
        //        // org.springframework.security.web.csrf.CsrfFilterの直後に
        //        // 作成したCsrfCookieFilterを追加する。
        //        httpSec.addFilterAfter(new CsrfCookieFilter(), CsrfFilter.class);
        //        //                .addFilterAfter(new CorsFilter(), CsrfCookieFilter.class);
        //        //httpSec.addFilterAfter(new CorsFilter(), CsrfFilter.class);
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

}
