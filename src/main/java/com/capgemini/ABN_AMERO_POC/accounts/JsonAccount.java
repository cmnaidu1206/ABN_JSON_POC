package com.capgemini.ABN_AMERO_POC.accounts;

import java.util.ArrayList;
import java.util.List;

public class JsonAccount {

	private List<Account> accountsList;
	private Integer accountSequenceNumber;


	public Integer getAccountSequenceNumber() {
		return accountSequenceNumber;
	}

	public void setAccountSequenceNumber(Integer accountSequenceNumber) {
		this.accountSequenceNumber = accountSequenceNumber;
	}

	public JsonAccount(List<Account> accountsList, Integer accountSequenceNumber) {
		this.accountsList = accountsList;
		this.accountSequenceNumber = accountSequenceNumber;
	}

	public JsonAccount() {
		this.accountSequenceNumber = new Integer("1000");
		this.accountsList = new ArrayList<Account>();
	}

	public List<Account> getAccountsList() {
		return this.accountsList;
	}

	public void setAccountsList(List<Account> accountsList) {
		this.accountsList = accountsList;
	}

	@Override
	public String toString() {
		String str = new String("Empty Accounts List !!");
		if (this.accountsList != null) {
			str = "List => ";
			for (Account account : this.accountsList) {
				str += account.toString();
			}
		}
		return str;
	}

}
