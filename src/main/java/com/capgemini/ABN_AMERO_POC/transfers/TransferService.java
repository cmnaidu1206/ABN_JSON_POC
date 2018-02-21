package com.capgemini.ABN_AMERO_POC.transfers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.capgemini.ABN_AMERO_POC.accounts.Account;
import com.capgemini.ABN_AMERO_POC.accounts.AccountService;
import com.capgemini.ABN_AMERO_POC.shared.Response;

@Service
public class TransferService {

	@Autowired
	TransferDao transferDao;
	@Autowired
	private Environment environment;
	@Autowired
	private AccountService accountService;

	public TransferService() {

	}

	public List<Transfer> getAllTransactions() {
		return transferDao.getAllTransactions();
	}

	public Response addTransaction(Transfer transfer) {
		Response response;
		Account fromAccount = accountService.getAccount(transfer.getFromAccount());
		Account toAccount = accountService.getAccount(transfer.getToAccount());
		if (fromAccount != null && toAccount != null && transfer.getAmount()>0 && (fromAccount.getBalance() >= transfer.getAmount())
				&& (transfer.getFromAccount() != transfer.getToAccount())) {
			fromAccount.setBalance(fromAccount.getBalance() - transfer.getAmount());
			toAccount.setBalance(toAccount.getBalance() + transfer.getAmount());
			accountService.updateAccount(fromAccount);
			accountService.updateAccount(toAccount);
			transfer.setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));
			transferDao.addTransaction(transfer);
			response = new Response(true, environment.getProperty("Transfer_Add_Success"), fromAccount);
		} else {
			response = new Response(false, environment.getProperty("Transfer_Faild"), null);
		}
		return response;
	}

	public List<Transfer> getTransactionsFromAccount(Integer fromAccountId) {
		return transferDao.getTransactionsFromAccount(fromAccountId);
	}

	public List<Transfer> getTransactionsToAccount(Integer toAccountId) {
		return transferDao.getTransactionsToAccount(toAccountId);
	}
}
