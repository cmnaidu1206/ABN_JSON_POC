/**
 * 
 */
package com.capgemini.ABN_AMERO_POC.session;

import java.util.ArrayList;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author jakallur
 *
 */

@RestController
@RequestMapping("/session")
public class UserSessionController {

	public UserSessionController() {
	
	}
	
	@GetMapping("/getCurrentUser")
	public CurrentUser getUser(Authentication authentication){
		ArrayList<GrantedAuthority> authorities =  new ArrayList<GrantedAuthority>(authentication.getAuthorities());
		ArrayList<String> userAuthorities = new ArrayList<>();
		for (GrantedAuthority grantedAuthority : authorities) {
			userAuthorities.add(grantedAuthority.getAuthority());
		}
		return new CurrentUser(authentication.getName(),userAuthorities);
	}
	

}
