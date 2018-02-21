package com.capgemini.ABN_AMERO_POC.customer;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.capgemini.ABN_AMERO_POC.shared.Response;
import com.google.gson.Gson;

@Repository
public class CustomerDao {

	@Autowired
	Environment environment;

	private JsonCustomer jsonCustomer;
	private Gson gson;
	private BufferedReader br;
	private FileWriter fw;

	public CustomerDao() {

	}

	@PostConstruct
	public void init() {
		try {
			this.jsonCustomer = new JsonCustomer();
			this.gson = new Gson();
			File file = new File(environment.getProperty("Customer_JsonFileName"));
			if (!file.exists()) {
				file.createNewFile();
				updateFile();
			} else {
				updateCustomersList();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateFile() {
		try {
			this.fw = new FileWriter(environment.getProperty("Customer_JsonFileName"));
			fw.write(gson.toJson(this.jsonCustomer));
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateCustomersList() {
		try {
			this.br = new BufferedReader(new FileReader(environment.getProperty("Customer_JsonFileName")));
			this.jsonCustomer = gson.fromJson(this.br, JsonCustomer.class);
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Customer> getAllCustomers() {
		updateCustomersList();
		return this.jsonCustomer.getCustomersList();
	}

	public Response addCustomer(Customer customer) {
		Integer tempSeq = this.jsonCustomer.getCustomerSequenceNumber();
		tempSeq = tempSeq + 1;
		this.jsonCustomer.setCustomerSequenceNumber(tempSeq);
		customer.setCustomerId(tempSeq);
		List<Customer> tempCustomers = this.jsonCustomer.getCustomersList();
		tempCustomers.add(customer);
		this.jsonCustomer.setCustomersList(tempCustomers);
		updateFile();
		Response response = new Response(true,environment.getProperty("Customer_AddCustomerSuccess"),tempSeq.toString());
		return response;
	}

	public Customer getCustomer(Integer id) {
		updateCustomersList();
		for (Customer customer : this.jsonCustomer.getCustomersList()) {
			if (customer.getCustomerId().equals(id)) {
				return customer;
			}
		}
		return null;
	}

	public Response deleteCustomer(Integer id) {
		updateCustomersList();
		Response response = new Response(false,environment.getProperty("Customer_CustomerNotFound"),null);
		for (Customer customer : this.jsonCustomer.getCustomersList()) {
			if (customer.getCustomerId().equals(id)) {
				List<Customer> temp = this.jsonCustomer.getCustomersList();
				temp.remove(customer);
				this.jsonCustomer.setCustomersList(temp);
				updateFile();
				response = new Response(true,environment.getProperty("Customer_CustomerDeleteSuccess"),customer.toString());
				break;
			}
		}
		return response;
	}

	public Response updateCustomer(Customer customer) {
		updateCustomersList();
		Response response = new Response(false,environment.getProperty("Customer_CustomerNotFound"),null);
		for (Customer customerObj : this.jsonCustomer.getCustomersList()) {
			if (customerObj.getCustomerId().equals(customer.getCustomerId())) {
				List<Customer> temp = this.jsonCustomer.getCustomersList();
				temp.remove(customerObj);
				temp.add(customer);
				this.jsonCustomer.setCustomersList(temp);
				updateFile();
				response = new Response(true,environment.getProperty("Customer_CustomerUpdateSuccess"),customer);
			}
		}
		return response;
	}

}
