/**
 * 
 */
package com.capgemini.ABN_AMERO_POC.accounts;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.capgemini.ABN_AMERO_POC.customer.CustomerService;
import com.capgemini.ABN_AMERO_POC.shared.Response;

/**
 * @author jakallur
 *
 */
@Service
public class AccountService {

	@Autowired
	AccountDao accountDao;
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	Environment environment;
	
	
	public List<Account> getAllAccount() {
		return accountDao.getAllAccounts();
	}

	public Response addAccount(Account account) {
		Response response = new Response(false,environment.getProperty("Account_AddAccountFailedCustomerIdDoesNotExist"),null);
		if(customerService.getCustomer(account.getCustomerId()) != null){	
			account.setOpenDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));
			return accountDao.addAccount(account);
		}
		return response;
	}

	public Account getAccount(Integer id) {
		return accountDao.getAccount(id);
	}

	public Response deleteAccount(Integer id) {
		return accountDao.deleteAccount(id);
	}
	
	public Response updateAccount(Account account) {
		Response response = new Response(false,environment.getProperty("Account_UpdateAccountFailedCustomerIdDoesNotExist"),null);
		if(customerService.getCustomer(account.getCustomerId()) != null){
			 return accountDao.updateAccount(account);
		}
		return response;
	}
	
	public List<Account> getAccountsByCustomerId(Integer id){
		return accountDao.getAccountsByCustomerId(id);
	}
}
