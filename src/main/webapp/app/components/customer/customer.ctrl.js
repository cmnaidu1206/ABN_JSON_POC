'use strict';

//creating customer controller function.
var customerController = function ($rootScope, $scope, CustomerFactory) {
    //mapping constants.
    $scope.no_customer_data = htmlContentConstants.customer_no_data_exist;
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


    //View All Functions  Starts.
    $scope.viewAll = function () {
        resetAllVews();
        $scope.viewAllFlag = true;
        CustomerFactory.getAllCustomers().then(
            function success(response) {
                $scope.allCustomers = response.data;
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
    // End of View All Function.


    // Start of Add Cutomer Functions.
    $scope.add = function () {
        resetAllVews();
        $scope.addFlag = true;
        $scope.addCustomerInput = {};
    };
    $scope.addCustomer = function () {
        if ($scope.addCustomerInput.name == null || $scope.addCustomerInput.name.trim() == "" ||
            $scope.addCustomerInput.phoneNumber == null || $scope.addCustomerInput.phoneNumber.trim() == "" ||
            $scope.addCustomerInput.emailId == null || $scope.addCustomerInput.emailId.trim() == "" ||
            $scope.addCustomerInput.address == null || $scope.addCustomerInput.address.trim() == "") {
            $scope.responseObj = tempResponse(false, htmlContentConstants.customer_enter_all_filed_valid_data);
        } else {
            CustomerFactory.add($scope.addCustomerInput).then(
                function success(response) {
                    $scope.responseObj = response.data;
                },
                function failure(error) {
                    console.log("Customer => Add customer Service Call failed , Error:" + JSON.stringify(error));
                    $scope.responseObj = tempFailureResponse;
                }
            );
        }
        $scope.addCustomerInput = {};
    }
    // End of Add Customer.


    //Start of Update Customer.

    $scope.update = function () {
        resetAllVews();
        $scope.updateFlag = true;
        $scope.updateCustomerSearchResult = null;
        $scope.updateCustomerInput = {};
    };
    $scope.searchCustomer = function () {
        $scope.responseObj = null;
        CustomerFactory.get($scope.updateCustomerInput.customerId).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.updateCustomerSearchResult = response.data;
                } else {
                    $scope.updateCustomerSearchResult = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.customer_not_fond);
                }
            },
            function failure(error) {
                $scope.updateCustomerSearchResult = null;
                $scope.responseObj = tempFailureResponse;
                console.log("Customer => Search Customer service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.updateCustomerInput = {};
    };
    $scope.updateCustomer = function() {
        for (var key in $scope.updateCustomerSearchResult) {
            if($scope.updateCustomerInput[key] == null || $scope.updateCustomerInput[key] =="") {
                $scope.updateCustomerInput[key] = $scope.updateCustomerSearchResult[key];
            }
        };
        CustomerFactory.update($scope.updateCustomerInput).then(
            function success(response) {
                if (response.data != null) {
                    $scope.responseObj = response.data;
                    if (response.data.success) {
                        $scope.updateCustomerSearchResult = response.data.optionalValue;
                    }
                } else {
                    $scope.responseObj = tempResponse(false, htmlContentConstants.customer_update_failed);
                }
            },
            function failure(error) {
                console.log("Customer => Update Custoemr Details service call failed, Error:" + JSON.stringify(error));
                $scope.responseObj = tempFailureResponse;
            }
        );
        $scope.updateCustomerInput = {};
    }
    // End of Update Customer.


    //Start of Delete Customer.
    $scope.delete = function () {
        resetAllVews();
        $scope.deleteFlag = true;
        $scope.deleteCustomerInput = {};
        $scope.searchDeleteCustomerResult = null;
    };
    $scope.searchDeleteCustomer = function () {
        $scope.responseObj = null;
        CustomerFactory.get($scope.deleteCustomerInput.customerId).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.searchDeleteCustomerResult = response.data;
                } else {
                    $scope.searchDeleteCustomerResult = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.customer_not_fond);
                }
            },
            function failure(error) {
                $scope.searchDeleteCustomerResult = null;
                $scope.responseObj = tempFailureResponse;
                console.log("Customer => Search Customer service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.deleteCustomerInput = {};
    };
    $scope.customerDelete = function () {
        $scope.responseObj = null;
        CustomerFactory.delete($scope.searchDeleteCustomerResult.customerId).then(
            function success(response) {
                $scope.responseObj = response.data;
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                console.log("Customer => delete Customer service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.searchDeleteCustomerResult = null;
    };
    // End of Delete Customer.

};

//Adding Dependency injection.
customerController.$inject = ['$rootScope', '$scope', 'CustomerFactory'];

//Registering the controller with the Module.
angular.module("CustomerModule")
    .controller("CustomerController", customerController);