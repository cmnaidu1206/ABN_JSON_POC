package com.capgemini.ABN_AMERO_POC;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.capgemini.ABN_AMERO_POC.login.Login;
import com.capgemini.ABN_AMERO_POC.login.LoginService;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	LoginService loginService;

	public CustomAuthenticationProvider() {

	}

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {

		Login loginObj = loginService.verifyPassword(auth.getName().toString(), auth.getCredentials().toString());
		if (loginObj == null) {
			throw new BadCredentialsException("External system authentication failed");
		} else {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(new SimpleGrantedAuthority(loginObj.getRole()));
			return new UsernamePasswordAuthenticationToken(loginObj.getUserName(), loginObj.getPassword(), authorities);
		}
	}

	@Override
	public boolean supports(Class<?> auth) {
		return auth.equals(UsernamePasswordAuthenticationToken.class);
	}
}