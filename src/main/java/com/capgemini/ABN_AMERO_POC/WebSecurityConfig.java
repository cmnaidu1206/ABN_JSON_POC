package com.capgemini.ABN_AMERO_POC;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomAuthenticationProvider customAuthenticationProvider;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf()
			.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		http.authorizeRequests()
				.antMatchers("/app/**").authenticated()
				.antMatchers("/session/**").authenticated()
				
				.antMatchers("/rest/user/add/**").hasAuthority("ADMIN")
				.antMatchers("/rest/user/delete/**").hasAuthority("ADMIN")
				.antMatchers("/rest/account/add/**").hasAuthority("ADMIN")
				.antMatchers("/rest/account/delete/**").hasAuthority("ADMIN")
				.antMatchers("/rest/customer/add/**").hasAuthority("ADMIN")
				.antMatchers("/rest/customer/delete/**").hasAuthority("ADMIN")
				
				.antMatchers("/asserts/**").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login").permitAll()
				.and()
			.logout()
				.permitAll();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(customAuthenticationProvider);
		/*auth.inMemoryAuthentication()
			.withUser("ADMIN").password("ADMIN").roles("ADMIN");*/
	}
}