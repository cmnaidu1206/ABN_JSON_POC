var base_url = "" + _contextPath;
var appApiConstants = {

	current_user: base_url + "/session/getCurrentUser",

	account_add: base_url + "/rest/account/add",
	account_get: base_url + "/rest/account/get/",
	account_get_all: base_url + "/rest/account/getAll",
	account_update: base_url + "/rest/account/update",
	account_delete: base_url + "/rest/account/delete/",

	customer_add: base_url + "/rest/customer/add",
	customer_get: base_url + "/rest/customer/get/",
	customer_get_all: base_url + "/rest/customer/getAll",
	customer_update: base_url + "/rest/customer/update",
	customer_delete: base_url + "/rest/customer/delete/",

	user_add: base_url + "/rest/user/add",
	user_get: base_url + "/rest/user/get/",
	user_get_all: base_url + "/rest/user/getAll",
	user_update: base_url + "/rest/user/update",
	user_delete: base_url + "/rest/user/delete",
	user_change_password: base_url + "/rest/user/changePassword",


	transactions_add: base_url + "/rest/transfer/add",
	transactions_get_all: base_url + "/rest/transfer/getAll",
	transactions_get_from_account: base_url + "/rest/transfer/getFromAccount/",
	transactions_get_to_account: base_url + "/rest/transfer/getToAccount/",

};

var htmlContentConstants = {
	user_no_data_exist: "No User Data Exist !",
	account_no_data_exist: "No Account Data Exist !",
	customer_no_data_exist: "No Customer Data Exist !",
	task_failed_unknow: "Task failed with unknow error,  Please try again !",
	unable_to_fetc_server: "Unable to fetech details from server !",
	no_account_allocated_to_user: "No account was allocated to this user !",
	account_info_not_found: "Account information not found !",
	invalid_amount: "Input Value Should be in between numberical 0 and 10000 !",
	customer_info_not_found: "Customer Information Not Found !",
	customer_update_failed: "Update Failed , Please try again !",
	enter_all_fields: "Please fill all (*) mandatory fields !",
	worng_old_password: "Old Password you have entered is worng !",
	new_retpe_not_match: "New password and retype did not match !",
	user_not_found: "User not found with given username !",
	user_update_failed_no_response: "User Update failed with no response from server !",
	user_add_enter_valid_userName: "Please enter valid Username !",
	user_add_enter_valid_accountId: "Please enter valid Account Number !",
	user_add_enter_valid_password: "Please enter valid Password !",
	account_balance_not_valid: " Enter valid opening balance amount (>=0) !",
	account_enter_valid_customer_id: "Enter valid Customer Id !",
	customer_enter_all_filed_valid_data: "Please enter all fields with valid data !",
	customer_not_fond: "Customer Not found with given Id !",
	customer_update_failed: "Customer Update failed with no response !",
	account_not_found: "Account Not found with given id !",
	account_update_failed: "Account update failed with no response !",
	invalid_transfer_input: "Please enter valid account number, amount to transfer <= available balance !"

};