package com.capgemini.ABN_AMERO_POC.login;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.capgemini.ABN_AMERO_POC.accounts.AccountService;
import com.capgemini.ABN_AMERO_POC.shared.Response;

@Service
public class LoginService {

	@Autowired
	LoginDao loginDao;

	@Autowired
	AccountService accountService;

	@Autowired
	Environment environment;

	public LoginService() {

	}

	public Response addLogin(Login login) {
		Response response = new Response(false, environment.getProperty("Login_UserNameAlreadyTakenOrAccountNotExist"),
				null);
		if (loginDao.getLoginByUserName(login.getUserName()) == null
				&& accountService.getAccount(login.getAccountId()) != null
				&& loginDao.getLoginByAccountId(login.getAccountId()) == null) {
			response = loginDao.addLogin(login);
		}
		return response;
	}

	public Response deleteLogin(Login login) {
		Response response;
		Login temp = loginDao.getLoginByUserName(login.getUserName());
		if (temp.getAccountId() != null && temp.getUserName() != "admin") {
			response = new Response(false, environment.getProperty("Login_DeleteNotPossibleWhenAccountIsInMapped"),
					null);
		} else {
			response = loginDao.deleteLogin(login.getUserName());
		}

		return response;
	}

	public Response updateLogin(Login login) {
		if (login.getAccountId() != null) {
			if (accountService.getAccount(login.getAccountId()) == null) {
				return new Response(false, environment.getProperty("Login_updateFailedAccountIdNotExist"), null);
			}
		}
		return loginDao.updateLogin(login);
	}

	public Login getLoginByUserName(String userName) {
		Login result = loginDao.getLoginByUserName(userName);
		if (result != null) {
			result.setPassword("XXXXXXXX");
		}
		return result;
	}

	public List<Login> getAllLogins() {
		List<Login> logins = loginDao.getAllLogins();
		List<Login> tempLogins = new ArrayList<Login>();
		for (Login login : logins) {
			login.setPassword("XXXXXXXX");
			tempLogins.add(login);
		}
		return tempLogins;
	}

	public Response verifyPassword(Login login) {
		Response response = new Response(false, environment.getProperty("Login_AuthenticationFailed"), null);
		Login temp = loginDao.getLoginByUserName(login.getUserName());
		if (temp != null) {
			if (temp.getPassword().equals(login.getPassword())) {
				response = new Response(true, environment.getProperty("Login_Authenticated"), null);
			}
		}
		return response;
	}

	public Login verifyPassword(String userName, String password) {
		Login temp = loginDao.getLoginByUserName(userName);
		if (temp != null) {
			if (temp.getPassword().equals(password)) {
				return temp;
			}
		}
		return null;
	}

	public Response changePassword(Password password) {
		Login temp = verifyPassword(password.getUserName(), password.getOldPassword());
		if (temp != null) {
			temp.setPassword(password.getNewPassword());
			return loginDao.updateLoginPassword(temp);
		}
		return new Response(false, environment.getProperty("Login_userNamePasswordNotMatch"), null);
	}
}
