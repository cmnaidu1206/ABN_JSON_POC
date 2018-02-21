package com.capgemini.ABN_AMERO_POC.login;

import java.util.ArrayList;
import java.util.List;

public class JsonLogin {

	private List<Login> loginsList;
	
	public JsonLogin() {
		this.loginsList = new ArrayList<Login>();
	}

	public List<Login> getLoginsList() {
		return loginsList;
	}

	public void setLoginsList(List<Login> loginsList) {
		this.loginsList = loginsList;
	}

}
