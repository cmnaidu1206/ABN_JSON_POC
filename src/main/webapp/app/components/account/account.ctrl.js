'use strict';

//creating customer controller function.
var accountController = function ($rootScope, $scope, AccountFactory) {
    //mapping constants for html.
    $scope.no_account_data = htmlContentConstants.account_no_data_exist;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.viewAll();
    });
    //here is the main logic of this controller.
    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.responseObj = null;
        $scope.viewAllFlag = false;
        $scope.addFlag = false;
        $scope.updateFlag = false;
        $scope.deleteFlag = false;
    };
    var tempFailureResponse = {
        success: false,
        response: "Task failed with unknow error,  Please try again !"
    };

    //Start of View All Functions.
    $scope.viewAll = function () {
        resetAllVews();
        $scope.viewAllFlag = true;
        AccountFactory.getAllAccounts().then(
            function success(response) {
                $scope.allAccounts = response.data;
            },
            function failure(error) {
                console.log("Customer => get all customers Service call failed , Error:" + JSON.stringify(error));
            }
        );
    };
    $scope.sortOrder = true;
    $scope.sort = function (keyName) {
        $scope.sortKey = keyName;
        $scope.sortOrder = !$scope.sortOrder;
    }
    //Start of View All Functions.


    //Start of Add Function.
    $scope.add = function () {
        resetAllVews();
        $scope.addFlag = true;
        $scope.addAccountInput = {};
        $scope.addAccountInput.accountType = "Savings";
        $scope.addAccountInput.status = "Opened";
    };
    $scope.addAccount = function () {
        if ($scope.addAccountInput.balance != null && !($scope.addAccountInput.balance < 0)) {
            if ($scope.addAccountInput.customerId != null && $scope.addAccountInput.customerId.toString().length > 3) {
                AccountFactory.add($scope.addAccountInput).then(
                    function success(response) {
                        $scope.responseObj = response.data;
                    },
                    function failue(error) {
                        console.log("Account => Add Account Service Call failed , Error: " + JSON.stringify(error));
                        $scope.responseObj = tempFailureResponse;
                    }
                );
            } else {
                $scope.responseObj = tempResponse(false, htmlContentConstants.account_enter_valid_customer_id);
            }
        } else {
            $scope.responseObj = tempResponse(false, htmlContentConstants.account_balance_not_valid);
        }
        $scope.addAccountInput = {};
        $scope.addAccountInput.accountType = "Savings";
        $scope.addAccountInput.status = "Opened";
    }
    //End of Add Function.


    //Start of Update Function.
    $scope.update = function () {
        resetAllVews();
        $scope.updateFlag = true;
        $scope.updateAccountInput = {};
        $scope.updateAccountSearchResult = null;
    };
    $scope.searchAccount = function () {
        $scope.responseObj = null;
        AccountFactory.get($scope.updateAccountInput.accountId).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.updateAccountSearchResult = response.data;
                } else {
                    $scope.updateAccountSearchResult = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.account_not_found);
                }
            },
            function failure(error) {
                $scope.updateAccountSearchResult = null;
                $scope.responseObj = tempFailureResponse;
                console.log("Account => Search Account service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.updateCustomerInput = {};
    };
    $scope.updateAccount = function () {
        for (var key in $scope.updateAccountSearchResult) {
            if ($scope.updateAccountInput[key] == null || $scope.updateAccountSearchResult[key] == "") {
                $scope.updateAccountInput[key] = $scope.updateAccountSearchResult[key];
            }
        };
        AccountFactory.update($scope.updateAccountInput).then(
            function success(response) {
                if (response.data != null) {
                    $scope.responseObj = response.data;
                    if (response.data.success) {
                        $scope.updateAccountSearchResult = response.data.optionalValue;
                    }
                } else {
                    $scope.responseObj = tempResponse(false, htmlContentConstants.account_update_failed);
                }
            },
            function failure(error) {
                console.log("Customer => Update Custoemr Details service call failed, Error:" + JSON.stringify(error));
                $scope.responseObj = tempFailureResponse;
            }
        );
        $scope.updateAccountInput = {};
    };

    //End of Update Function.


    //Start of Delete Function.
    $scope.delete = function () {
        resetAllVews();
        $scope.deleteFlag = true;
        $scope.deleteAccountInput = {};
    };
    $scope.searchDeleteAccount = function () {
        $scope.responseObj = null;
        AccountFactory.get($scope.deleteAccountInput.accountId).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.searchDeleteAccountResult = response.data;
                } else {
                    $scope.searchDeleteAccountResult = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.account_not_found);
                }
            },
            function failure(error) {
                $scope.searchDeleteAccountResult = null;
                $scope.responseObj = tempFailureResponse;
                console.log("Account => Search Account service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.deleteAccountInput = {};
    };
    $scope.accountDelete = function () {
        $scope.responseObj = null;
        AccountFactory.delete($scope.searchDeleteAccountResult.accountId).then(
            function success(response) {
                $scope.responseObj = response.data;
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                console.log("Account => delete Account service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.searchDeleteAccountResult = null;
    };
    //End of Delete Function.
};

//Adding Dependency injection.
accountController.$inject = ['$rootScope', '$scope', 'AccountFactory'];

//Registering the controller with the Module.
angular.module("AccountModule")
    .controller("AccountController", accountController);