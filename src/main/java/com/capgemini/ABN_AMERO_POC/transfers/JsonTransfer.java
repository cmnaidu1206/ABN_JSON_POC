package com.capgemini.ABN_AMERO_POC.transfers;

import java.util.List;

public class JsonTransfer {

	private List<Transfer> transferList;
	private Integer transferSequence;
	public JsonTransfer(List<Transfer> transferList, Integer transferSequence) {
		this.transferList = transferList;
		this.transferSequence = transferSequence;
	}
	public Integer getTransferSequence() {
		return transferSequence;
	}
	public void setTransferSequence(Integer transferSequence) {
		this.transferSequence = transferSequence;
	}
	public List<Transfer> getTransferList() {
		return transferList;
	}
	public void setTransferList(List<Transfer> transferList) {
		this.transferList = transferList;
	}
	public JsonTransfer() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "JsonTransfer [transferList=" + transferList + ", transferSequence=" + transferSequence + "]";
	}

}
