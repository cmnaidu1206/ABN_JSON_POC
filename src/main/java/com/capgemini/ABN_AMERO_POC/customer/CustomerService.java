package com.capgemini.ABN_AMERO_POC.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.capgemini.ABN_AMERO_POC.accounts.Account;
import com.capgemini.ABN_AMERO_POC.accounts.AccountService;
import com.capgemini.ABN_AMERO_POC.shared.Response;

@Service
public class CustomerService {

	@Autowired
	CustomerDao customerDao;
	
	@Autowired
	AccountService accountService;

	@Autowired
	Environment environment;
	
	public List<Customer> getAllCustomer() {
		return customerDao.getAllCustomers();
	}

	public Response addCustomer(Customer customer) {
		return customerDao.addCustomer(customer);
	}

	public Customer getCustomer(Integer id) {
		return customerDao.getCustomer(id);
	}

	public Response deleteCustomer(Integer id) {
		List<Account> accountsListOfCustomer = accountService.getAccountsByCustomerId(id);
		Response response = new Response(false,environment.getProperty("Customer_CannotDeleteCustomerLinkedToAccount"),null);
		if(accountsListOfCustomer.isEmpty()) {
			return customerDao.deleteCustomer(id);
		}
		return response;
	}

	public Response updateCustomer(Customer customer) {
		return customerDao.updateCustomer(customer);
	}
	
}
