/**
 * 
 */
package com.capgemini.ABN_AMERO_POC.session;

import java.util.List;

/**
 * @author jakallur
 *
 */
public class CurrentUser {

	private String userName;
	private List<String> authorities;
	
	public CurrentUser() {
	
	}

	public CurrentUser(String userName, List<String> authorities) {
		this.userName = userName;
		this.authorities = authorities;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<String> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<String> authorities) {
		this.authorities = authorities;
	}
	

}
