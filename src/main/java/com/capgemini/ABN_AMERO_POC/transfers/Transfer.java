/**
 * 
 */
package com.capgemini.ABN_AMERO_POC.transfers;

/**
 * @author jakallur
 *
 */
public class Transfer {

	private Integer fromAccount;
	private Integer toAccount;
	private Double amount;
	private String date;
	private Integer transactionNumber;
	
	

	public Transfer() {
		
	}

	public Transfer(Integer fromAccount, Integer toAccount, Double amount, String date, Integer transactionNumber) {
		this.fromAccount = fromAccount;
		this.toAccount = toAccount;
		this.amount = amount;
		this.date = date;
		this.transactionNumber = transactionNumber;
	}

	@Override
	public String toString() {
		return "Transfer [fromAccount=" + fromAccount + ", toAccount=" + toAccount + ", amount=" + amount + ", date="
				+ date + ", transactionNumber=" + transactionNumber + "]";
	}

	public Integer getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(Integer transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public Integer getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(Integer fromAccount) {
		this.fromAccount = fromAccount;
	}

	public Integer getToAccount() {
		return toAccount;
	}

	public void setToAccount(Integer toAccount) {
		this.toAccount = toAccount;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	
}
