package com.capgemini.ABN_AMERO_POC.transfers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import com.capgemini.ABN_AMERO_POC.shared.Response;
import com.google.gson.Gson;

@Repository
public class TransferDao {

	@Autowired
	private Environment environment;

	private JsonTransfer jsonTransfer;
	private Gson gson;
	private BufferedReader br;
	private FileWriter fw;
	public TransferDao() {
		
	}
	@PostConstruct
	public void init() {
		try {
			this.jsonTransfer = new JsonTransfer();
			this.gson = new Gson();
			File file = new File(environment.getProperty("Transfer_JsonFileName"));
			if (!file.exists()) {
				file.createNewFile();
				this.jsonTransfer.setTransferSequence(770000);
				updateFile();
			} else {
				updateTransfersList();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void updateFile() {
		try {
			this.fw = new FileWriter(environment.getProperty("Transfer_JsonFileName"));
			fw.write(gson.toJson(this.jsonTransfer));
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateTransfersList() {
		try {
			this.br = new BufferedReader(new FileReader(environment.getProperty("Transfer_JsonFileName")));
			this.jsonTransfer = gson.fromJson(this.br, JsonTransfer.class);
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<Transfer> getAllTransactions() {
		updateTransfersList();
		return this.jsonTransfer.getTransferList();
	}
	
	public Response addTransaction(Transfer transfer) {
		Response response = new Response(true,environment.getProperty("Transfer_Add_Success"),null);
		updateTransfersList();
		transfer.setTransactionNumber(this.jsonTransfer.getTransferSequence());
		this.jsonTransfer.setTransferSequence(this.jsonTransfer.getTransferSequence()+1);
		List<Transfer> oldTransfers = this.jsonTransfer.getTransferList();
		if(oldTransfers == null) {
			oldTransfers = new ArrayList<Transfer>();
		}
		oldTransfers.add(transfer);
		this.jsonTransfer.setTransferList(oldTransfers);
		updateFile();
		return response;
	}
	public List<Transfer> getTransactionsFromAccount(Integer fromAccountId){
		List<Transfer> list = new ArrayList<Transfer>();
		updateTransfersList();
		for (Transfer transfer : this.jsonTransfer.getTransferList()) {
			if(transfer.getFromAccount().equals(fromAccountId)){
				list.add(transfer);
			}
		}
		return list;
	}
	
	public List<Transfer> getTransactionsToAccount(Integer toAccountId){
		List<Transfer> list = new ArrayList<Transfer>();
		updateTransfersList();
		for (Transfer transfer : this.jsonTransfer.getTransferList()) {
			if(transfer.getToAccount().equals(toAccountId)){
				list.add(transfer);
			}
		}
		return list;
	}
}
