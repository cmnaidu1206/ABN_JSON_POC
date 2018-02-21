'use strict';

//Creating controller Function.
var myAccountsController = function ($rootScope, $scope, UserFactory, AccountFactory) {
    // All Controller Logic goes here.
    $scope.$on('$routeChangeSuccess', function () {
        // This method will be executed on Route path comes to this Controller.
        $scope.view(); // default loading view tab.
    });

     $scope.inputBalance = {};

    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.responseObj = null;
        $scope.viewFlag = false;
        $scope.updateFlag = false;
    };

    var tempFailureResponse = {
        success: false,
        response: htmlContentConstants.task_failed_unknow
    };

    $scope.view = function () {
        resetAllVews();
        $scope.viewFlag = true;
        UserFactory.get($rootScope.currentUser.userName).then(
            function success(response) {
                if (response.data != null) {
                    AccountFactory.get(response.data.accountId).then(
                        function success(response) {
                            if (response != null) {
                                $scope.viewData = response.data;
                            } else {
                                $scope.responseObj = tempFailureResponse;
                                $scope.responseObj.response = htmlContentConstants.account_info_not_found;
                            }
                        },
                        function failure(error) {
                            $scope.responseObj = tempFailureResponse;
                            $scope.responseObj.response = htmlContentConstants.unable_to_fetc_server;
                            console.log("My Accounts => Service Call failed , Error:" + JSON.stringify(error));
                        }
                    );
                } else {
                    $scope.responseObj = tempFailureResponse;
                    $scope.responseObj.response = htmlContentConstants.no_account_allocated_to_user;
                }
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                $scope.responseObj.response = htmlContentConstants.unable_to_fetc_server;
                console.log("MyAccounts -> get User data call failed , Error:" + JSON.stringify(error));
            }
        );
    };

    $scope.update = function () {
        resetAllVews();
        $scope.updateFlag = true;
    };

    $scope.updateBalance = function () {
        $scope.responseObj = null;
        if ($scope.inputBalance.value > -1 && $scope.inputBalance.value < 10001 && $scope.inputBalance.value != null) {
            var tempAccount = {};
            OBJECT().COPY(tempAccount,$scope.viewData);
            tempAccount.balance = $scope.inputBalance.value;
            AccountFactory.update(tempAccount)
                .then(
                    function success(response) {
                        $scope.responseObj = response.data;
                        if(response.data != null && response.data.success) {
                            $scope.viewData = response.data.optionalValue;
                        }
                    },
                    function failure(error) {
                        $scope.responseObj = tempFailureResponse;
                        console.log("MyAccount => Update  failed, Error:" + JSON.stringify(error));
                    }
                );
        } else {
            $scope.responseObj = tempFailureResponse;
            $scope.responseObj.response = htmlContentConstants.invalid_amount;
        }
        $scope.inputBalance = {};
    }


};

//Dependecy injuction.
myAccountsController.$inject = ['$rootScope', '$scope', 'UserFactory', 'AccountFactory'];

//Regsistering ControllerFunction with Module.
angular.module("MyAccountsModule")
    .controller("MyAccountsController", myAccountsController);