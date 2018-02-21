package com.capgemini.ABN_AMERO_POC.shared;

public class Response {

	private boolean success;
	private String response;
	private Object optionalValue;

	public Object getOptionalValue() {
		return optionalValue;
	}

	public void setOptionalValue(Object optionalValue) {
		this.optionalValue = optionalValue;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public Response() {

	}

	public Response(boolean success, String response, Object optionalValue) {
		this.success = success;
		this.response = response;
		this.optionalValue = optionalValue;
	}

	@Override
	public String toString() {
		return "Response [success=" + success + ", response=" + response + ", optionalValue=" + optionalValue + "]";
	}

}
