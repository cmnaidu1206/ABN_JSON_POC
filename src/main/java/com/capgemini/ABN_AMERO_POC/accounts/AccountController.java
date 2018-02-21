/**
 * 
 */
package com.capgemini.ABN_AMERO_POC.accounts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.ABN_AMERO_POC.shared.Response;

/**
 * @author jakallur
 *
 */

@RestController
@RequestMapping(value = "/rest/account")
public class AccountController {

	@Autowired
	AccountService accountService;
	
	@GetMapping("/getAll")
	public List<Account> getAllAccounts(){
		return accountService.getAllAccount();
	}
	
	@PostMapping("/add")
	public Response addAccount(@RequestBody Account account) {
		return accountService.addAccount(account);
	}
	
	@GetMapping("/get/{id}")
	public Account getAccount(@PathVariable("id") Integer id){
		return accountService.getAccount(id);
	}
	
	@PostMapping("/delete/{id}")
	public Response deleteAccount(@PathVariable("id") Integer id){
		return accountService.deleteAccount(id);
	}
	
	@PostMapping("/update")
	public Response updateAccount(@RequestBody Account account) {
		return accountService.updateAccount(account);
	}
}
