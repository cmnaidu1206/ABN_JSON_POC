package com.capgemini.ABN_AMERO_POC.customer;

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
@RequestMapping(value = "/rest/customer")
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	
	@GetMapping("/getAll")
	public List<Customer> getAllCustomers(){
		return customerService.getAllCustomer();
	}
	
	@PostMapping("/add")
	public Response addCustomer(@RequestBody Customer customer) {
		return customerService.addCustomer(customer);
	}
	
	@GetMapping("/get/{id}")
	public Customer getCustomer(@PathVariable("id") Integer id){
		return customerService.getCustomer(id);
	}
	
	@PostMapping("/delete/{id}")
	public Response deleteCustomer(@PathVariable("id") Integer id){
		return customerService.deleteCustomer(id);
	}
	
	@PostMapping("/update")
	public Response updateCustomer(@RequestBody Customer customer) {
		return customerService.updateCustomer(customer);
	}
}
