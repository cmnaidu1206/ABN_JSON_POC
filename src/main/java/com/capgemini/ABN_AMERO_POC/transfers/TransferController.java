package com.capgemini.ABN_AMERO_POC.transfers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.ABN_AMERO_POC.shared.Response;

@RestController
@RequestMapping("/rest/transfer")
public class TransferController {

	@Autowired
	TransferService transferService;
	public TransferController() {
		
	}
	@GetMapping("/getAll")
	public List<Transfer> getAllTransactions() {
		return transferService.getAllTransactions();
	}
	
	@PostMapping("/add")
	public Response addTransaction(@RequestBody Transfer transfer) {
		return transferService.addTransaction(transfer);
	}
	
	@GetMapping("/getFromAccount/{fromAccountId}")
	public List<Transfer> getTransactionsFromAccount(@PathVariable("fromAccountId") Integer fromAccountId){
		return transferService.getTransactionsFromAccount(fromAccountId);
	}
	
	@GetMapping("/getToAccount/{toAccountId}")
	public List<Transfer> getTransactionsToAccount(@PathVariable("toAccountId")Integer toAccountId){
		return transferService.getTransactionsToAccount(toAccountId);
	}

}
