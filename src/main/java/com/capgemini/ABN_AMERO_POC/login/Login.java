package com.capgemini.ABN_AMERO_POC.login;

public class Login {

	private String userName;
	private String password;
	private Integer accountId;
	private String role;
	
	public Login() {
		
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Login(String userName, String password, Integer accountId, String role) {
		this.userName = userName;
		this.password = password;
		this.accountId = accountId;
		this.role = role;
	}
	

	@Override
	public String toString() {
		return "Login [userName=" + userName + ", password=" + "XXXXXXXX" + ", accountId=" + accountId + ", role=" + role
				+ "]";
	}
	
	
}
