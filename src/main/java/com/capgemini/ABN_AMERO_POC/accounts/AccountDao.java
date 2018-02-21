package com.capgemini.ABN_AMERO_POC.accounts;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.capgemini.ABN_AMERO_POC.shared.Response;
import com.google.gson.Gson;

@Repository
public class AccountDao {

	@Autowired
	private Environment environment;

	
	private JsonAccount jsonAccount;
	private Gson gson;
	private BufferedReader br;
	private FileWriter fw;

	public AccountDao() {

	}

	@PostConstruct
	public void init() {
		try {
			this.jsonAccount = new JsonAccount();
			this.gson = new Gson();
			File file = new File(environment.getProperty("Account_JsonFileName"));
			if (!file.exists()) {
				file.createNewFile();
				updateFile();
			} else {
				updateAccountsList();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateFile() {
		try {
			this.fw = new FileWriter(environment.getProperty("Account_JsonFileName"));
			fw.write(gson.toJson(this.jsonAccount));
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateAccountsList() {
		try {
			this.br = new BufferedReader(new FileReader(environment.getProperty("Account_JsonFileName")));
			this.jsonAccount = gson.fromJson(this.br, JsonAccount.class);
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Account> getAllAccounts() {
		updateAccountsList();
		return this.jsonAccount.getAccountsList();
	}

	public Response addAccount(Account account) {
		Response response = new Response();
		Integer tempSeq = this.jsonAccount.getAccountSequenceNumber();
		tempSeq = tempSeq + 1;
		this.jsonAccount.setAccountSequenceNumber(tempSeq);
		account.setAccountId(tempSeq);
		List<Account> tempAccounts = this.jsonAccount.getAccountsList();
		tempAccounts.add(account);
		this.jsonAccount.setAccountsList(tempAccounts);
		updateFile();
		response.setSuccess(true);
		response.setResponse(environment.getProperty("Account_AddAccountScucess"));
		response.setOptionalValue(tempSeq.toString());
		return response;
	}

	public Account getAccount(Integer id) {
		updateAccountsList();
		for (Account account : this.jsonAccount.getAccountsList()) {
			if (account.getAccountId().equals(id)) {
				return account;
			}
		}
		return null;
	}

	public Response deleteAccount(Integer id) {
		updateAccountsList();
		Response response = new Response(false,environment.getProperty("Account_AccountNotFound"),null);
		for (Account account : this.jsonAccount.getAccountsList()) {
			if (account.getAccountId().equals(id)) {
				List<Account> temp = this.jsonAccount.getAccountsList();
				temp.remove(account);
				this.jsonAccount.setAccountsList(temp);
				updateFile();
				response = new Response(true,environment.getProperty("Account_AccountDeleteSuccess"),account);
				break;
			}
		}
		return response;
	}

	public Response updateAccount(Account account) {
		updateAccountsList();
		Response response = new Response(false,environment.getProperty("Account_AccountNotFound"),null);
		for (Account accountObj : this.jsonAccount.getAccountsList()) {
			if (accountObj.getAccountId().equals(account.getAccountId())) {
				List<Account> temp = this.jsonAccount.getAccountsList();
				temp.remove(accountObj);
				temp.add(account);
				this.jsonAccount.setAccountsList(temp);
				updateFile();
				response = new Response(true,environment.getProperty("Account_AccountUpdateSuccess"),account);
				break;
			}
		}
		return response;
	}

	public List<Account> getAccountsByCustomerId(Integer id) {
		updateAccountsList();
		List<Account> resultList = new ArrayList<Account>();
		for (Account account : this.jsonAccount.getAccountsList()) {
			if (account.getCustomerId().equals(id)) {
				resultList.add(account);
			}
		}
		return resultList;
	}
}
