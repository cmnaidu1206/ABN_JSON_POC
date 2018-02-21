'use strict';
//Creating Transactions controller thisis for Admin User.
var transactionsController = function ($scope, $rootScope, TransactionsFactory) {
    $scope.$on('$routeChangeSuccess', function () {
        $scope.viewAll();
    });
    $scope.sortOrder = true;
    $scope.sort = function (keyName) {
        $scope.sortKey = keyName;
        $scope.sortOrder = !$scope.sortOrder;
    }
    //here is the main logic of this controller.
    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.responseObj = null;
        $scope.viewAllFlag = false;
        TransactionsFactory.getAllTransactions().then(
            function success(response) {
                $scope.allTransactions = response.data;
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                console.log("Transactions, Get All => get transactions fromaccount Service Call failed , Error:" + JSON.stringify(error));
            }
        );
    };

    $scope.viewAll = function () {
        resetAllVews();
        $scope.viewAllFlag = true;
    };
};

//Adding Dependecny injection.
transactionsController.$inject = ['$scope', '$rootScope', 'TransactionsFactory', ];

//Registering Controller with Module.
angular.module("TransactionsModule")
    .controller("TransactionsController", transactionsController);


//Creating Transfer controller. This if for Normal user
var transfersController = function ($scope, $rootScope, TransactionsFactory, UserFactory, AccountFactory) {
    $scope.$on('$routeChangeSuccess', function () {
        $scope.Transfer();
    });
    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.responseObj = null;
        $scope.receivedTransactionsFlag = false;
        $scope.sentTransactionsFlag = false;
        $scope.doTransfer = false;
        $scope.allTransactions = null;
    }

    $scope.viewReceiveTransactions = function () {
        resetAllVews();
        $scope.receivedTransactionsFlag = true;
        UserFactory.get($rootScope.currentUser.userName).then(
            function success(response) {
                if (response.data != null) {
                    TransactionsFactory.getTransactionsOfToAccount(response.data.accountId).then(
                        function success(response) {
                            $scope.allTransactions = response.data;
                        },
                        function failure(error) {
                            $scope.responseObj = tempFailureResponse;
                            console.log("Transactions, Transfer => get transactions fromaccount Service Call failed , Error:" + JSON.stringify(error));
                        }
                    );
                } else {
                    $scope.responseObj = tempFailureResponse;
                    $scope.responseObj.response = htmlContentConstants.no_account_allocated_to_user;
                }
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                $scope.responseObj.response = htmlContentConstants.user_no_data_exist;
            }
        );
    };
    
    $scope.viewSentTransactions = function () {
        resetAllVews();
        $scope.sentTransactionsFlag = true;
        UserFactory.get($rootScope.currentUser.userName).then(
            function success(response) {
                if (response.data != null) {
                    TransactionsFactory.getTransactionsOfFromAccount(response.data.accountId).then(
                        function success(response) {
                            $scope.allTransactions = response.data;
                        },
                        function failure(error) {
                            $scope.responseObj = tempFailureResponse;
                            console.log("Transactions, Transfer => get transactions fromaccount Service Call failed , Error:" + JSON.stringify(error));
                        }
                    );
                } else {
                    $scope.responseObj = tempFailureResponse;
                    $scope.responseObj.response = htmlContentConstants.no_account_allocated_to_user;
                }
            },
            function failure(error) {
                $scope.responseObj = tempFailureResponse;
                $scope.responseObj.response = htmlContentConstants.user_no_data_exist;
            }
        );
    }
    $scope.Transfer = function () {
        resetAllVews();
        $scope.transferObj = {};
        $scope.transferObj.date = "";
        $scope.transferObj.transactionNumber = 0;
        $scope.doTransfer = true;
        UserFactory.get($rootScope.currentUser.userName).then(
            function success(response) {
                if (response.data != null) {
                    $scope.transferObj.fromAccount = response.data.accountId;
                    AccountFactory.get(response.data.accountId).then(
                        function success(response) {
                            if (response != null) {
                                $scope.availableBalance = response.data.balance;
                            } else {
                                $scope.responseObj = tempFailureResponse;
                                $scope.responseObj.response = htmlContentConstants.account_info_not_found;
                            }
                        },
                        function failure(error) {
                            $scope.responseObj = tempFailureResponse;
                            $scope.responseObj.response = htmlContentConstants.unable_to_fetc_server;
                            console.log("Transafers  => Service get Account Call failed , Error:" + JSON.stringify(error));
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
        $scope.transferNow = function () {
            if ($scope.transferObj.toAccount != null && $scope.transferObj.toAccount.toString().length > 3 
            && $scope.transferObj.amount > 0 && $scope.transferObj.amount <= $scope.availableBalance
            && $scope.transferObj.fromAccount != $scope.transferObj.toAccount) {
                TransactionsFactory.add($scope.transferObj).then(
                    function success(response) {
                        $scope.responseObj = response.data;
                        if(response.data.success == true) {
                            $scope.availableBalance =$scope.availableBalance-$scope.transferObj.amount;
                        }
                        $scope.transferObj.amount = null;
                        $scope.transferObj.toAccount = null;
                    },
                    function failure(error) {
                        console.log("Transfer => transfer add failed , Error:" + JSON.stringify(error));
                        $scope.responseObj = tempFailureResponse;
                        $scope.transferObj.amount = null;
                        $scope.transferObj.toAccount = null;
                    }
                );
            } else {
                $scope.responseObj = tempResponse(false,htmlContentConstants.invalid_transfer_input)
            }
        }
    };
};

//Adding Dependecny injection.
transfersController.$inject = ['$scope', '$rootScope', 'TransactionsFactory', 'UserFactory', 'AccountFactory'];

//Registering Controller with Module.
angular.module("TransactionsModule")
    .controller("TransfersController", transfersController);