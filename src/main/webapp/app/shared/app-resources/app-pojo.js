//Account Pojo Object.
var Account = function (accountId, balance, accountType, openDate, status, customerId) {

	var obj = {
		accountId: accountId,
		balance: balance,
		accountType: accountType,
		openDate: openDate,
		status: status,
		customerId: customerId

	}
	return obj;
};

var tempFailureResponse = {
	success: false,
	response: htmlContentConstants.task_failed_unknow
};

var tempResponse = function(isSuccess, response) {
	var obj = {
		success: isSuccess,
		response: response
	};
	return obj;
};
