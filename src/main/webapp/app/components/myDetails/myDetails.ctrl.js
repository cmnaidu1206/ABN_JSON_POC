'use strict';

//creating Controller Function.
var myDetailsController = function ($rootScope, $scope, UserFactory, AccountFactroy, CustomerFactory) {
    // All Controller Logic goes here.
    $scope.customerObj = null;
    $scope.inputCustomer = {};
    $scope.$on('$routeChangeSuccess', function () {
        $scope.view();
    });
    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.responseObj = null;
        $scope.viewFlag = false;
        $scope.updateFlag = false;
    };
    
    $scope.view = function () {
        resetAllVews();
        $scope.viewFlag = true;
        if ($rootScope.currentUser.userName != null) {
            UserFactory.get($rootScope.currentUser.userName).then(
                function success(response) {
                    if (response.data != null) {
                        AccountFactroy.get(response.data.accountId)
                            .then(function success(response) {
                                if (response.data != null) {
                                    CustomerFactory.get(response.data.customerId).then(
                                        function success(response) {
                                            if (response.data != null) {
                                                $scope.customerObj = response.data;
                                            } else {
                                                $scope.responseObj = tempFailureResponse;
                                                $scope.responseObj.response = htmlContentConstants.customer_info_not_found;
                                            }
                                        },
                                        function failure(error) {
                                            $scope.responseObj = tempFailureResponse;
                                            console.log("My Details => Get Customer Service Call failed , Error:" + JSON.stringify(error));
                                        }
                                    );
                                } else {
                                    $scope.responseObj = tempFailureResponse;
                                    $scope.responseObj.response = htmlContentConstants.account_info_not_found;
                                }
                            },
                                function failure(error) {
                                    $scope.responseObj = tempFailureResponse;
                                    console.log("My Details => Get Account Service Call failed , Error:" + JSON.stringify(error));
                                }
                            );
                    } else {
                        $scope.responseObj = tempFailureResponse;
                        $scope.responseObj.response = htmlContentConstants.account_info_not_found;
                    }
                },
                function failure(error) {
                    $scope.responseObj = tempFailureResponse;
                    console.log("My Details => Get User Service Call failed , Error:" + JSON.stringify(error));
                }
            );
        } else {
            $scope.responseObj = tempFailureResponse;
            console.log("My Details => userName not assigned !");
        }

    };

    $scope.update = function () {
        resetAllVews();
        $scope.updateFlag = true;
    };

    $scope.updateCustomer = function () {
        $scope.inputCustomer.customerId = $scope.customerObj.customerId;
        $scope.inputCustomer.name = $scope.customerObj.name;
        if (!($scope.inputCustomer.phoneNumber != null && $scope.inputCustomer.phoneNumber.length > 0)) {
            $scope.inputCustomer.phoneNumber = $scope.customerObj.phoneNumber;
        }
        if (!($scope.inputCustomer.emailId != null && $scope.inputCustomer.emailId.length > 0)) {
            $scope.inputCustomer.emailId = $scope.customerObj.emailId;
        }
        if (!($scope.inputCustomer.address != null && $scope.inputCustomer.address.length > 0)) {
            $scope.inputCustomer.address = $scope.customerObj.address;
        }
        CustomerFactory.update($scope.inputCustomer).then(
            function success(response) {
                if (response.data != null) {
                    $scope.responseObj = response.data;
                    $scope.customerObj = response.data.optionalValue;
                } else {
                    $scope.responseObj = tempFailureResponse;
                    $scope.responseObj.reponse = htmlContentConstants.customer_update_failed;
                }
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                console.log("My Details , Update Customer service call failed , Error: " + JSON.stringify(error));
            }
        );
        $scope.inputCustomer = {};
    };

};

//dependecy injection to controller.
myDetailsController.$inject = ['$rootScope', '$scope', 'UserFactory', 'AccountFactory', 'CustomerFactory'];

// Registering controller with the Module.
angular.module("MyDetailsModule")
    .controller("MyDetailsController", myDetailsController);