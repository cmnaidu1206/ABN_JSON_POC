package com.capgemini.ABN_AMERO_POC.customer;

import java.util.ArrayList;
import java.util.List;

public class JsonCustomer {

	private Integer customerSequenceNumber;
	private List<Customer> customersList;
	public JsonCustomer() {
		this.customersList = new ArrayList<Customer>();
		this.customerSequenceNumber = new Integer(9000);
	}
	public Integer getCustomerSequenceNumber() {
		return customerSequenceNumber;
	}
	public void setCustomerSequenceNumber(Integer customerSequenceNumber) {
		this.customerSequenceNumber = customerSequenceNumber;
	}
	public List<Customer> getCustomersList() {
		return customersList;
	}
	public void setCustomersList(List<Customer> customersList) {
		this.customersList = customersList;
	}
	@Override
	public String toString() {
		String str = new String("Empty Customers List !!");
		if (this.customersList != null) {
			str = "List => ";
			for (Customer customer : this.customersList) {
				str += customer.toString();
			}
		}
		return str;
	}
	
}
