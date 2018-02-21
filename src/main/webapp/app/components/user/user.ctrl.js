'use strict';

// creating Controller Function.
var userController = function ($scope, UserFactory) {
    //Mapping constats to a variable to disaply in html.
    $scope.user_no_data = htmlContentConstants.user_no_data_exist;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.viewAll();
    });
    //YOUR CODE OF CONTROLLER GOES INSIDE THIS FUNCTION.
    $scope.responseObj = null;
    var resetAllVews = function () {
        $scope.updateUserInput = {};
        $scope.responseObj = null;
        $scope.searchResultUser = null;
        $scope.viewAllFlag = false;
        $scope.addFlag = false;
        $scope.updateFlag = false;
        $scope.deleteFlag = false;
    };
    var tempFailureResponse = {
        success: false,
        response: htmlContentConstants.task_failed_unknow
    };

    //all View Related Functionality Starts here.
    $scope.viewAll = function () {
        resetAllVews();
        $scope.viewAllFlag = true;
        UserFactory.getAllUsers().then(
            function success(response) {
                if (response.data != null) {
                    $scope.users = response.data;
                } else {
                    $scope.users = null;
                }
            },
            function failure(error) {
                console.log("UserFactory - > GetAll Service Call Failed with error: " + JSON.stringify(error));
            }
        );
    };
    $scope.sortOrder = true;
    $scope.sort = function (keyName) {
        $scope.sortKey = keyName;
        $scope.sortOrder = !$scope.sortOrder;
    }
    //all View Related Functionality Ends here.

    //All Add Related Starts Here.
    $scope.add = function () {
        resetAllVews();
        $scope.addUserInput = {};
        $scope.addUserInput.role = "USER";
        $scope.addFlag = true;
    };
    $scope.addUser = function () {
        if ($scope.addUserInput.userName != null && $scope.addUserInput.userName != "") {
            if ($scope.addUserInput.accountId != null && $scope.addUserInput.accountId.toString().length > 3) {
                if ($scope.addUserInput.password != null && $scope.addUserInput.password != "") {
                    UserFactory.add($scope.addUserInput).then(
                        function success(response) {
                            if (response.data != null) {
                                $scope.responseObj = response.data;
                                $scope.addUserInput = {};
                                $scope.addUserInput.role = "USER";
                            } else {
                                $scope.responseObj = tempFailureResponse;
                            }
                        },
                        function failure(error) {
                            $scope.responseObj = tempFailureResponse;
                            console.log("UserFactory - > Add Service Call Failed with error: " + JSON.stringify(error));
                        }
                    );
                } else {
                    $scope.responseObj = tempResponse(false,htmlContentConstants.user_add_enter_valid_password);
                }
            } else {
                $scope.responseObj = tempResponse(false,htmlContentConstants.user_add_enter_valid_accountId);
            }
        } else {
            $scope.responseObj = tempResponse(false,htmlContentConstants.user_add_enter_valid_userName);
        }
    };
    //All Add Related Ends Here.

    //All Update Starts here.
    $scope.update = function () {
        resetAllVews();
        $scope.updateFlag = true;
    };
    $scope.updateUserInput = {};
    $scope.searchUser = function () {
        $scope.responseObj = null;
        UserFactory.get($scope.updateUserInput.userName).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.searchResultUser = response.data;
                    $scope.updateUserInput.role = response.data.role;
                } else {
                    $scope.searchResultUser = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.user_not_found);
                }
            },
            function failure(error) {
                $scope.searchResultUser = null;
                $scope.responseObj = tempFailureResponse;
                console.log("User => Search User service call failed, Error:" + JSON.stringify(error));
            }
        );
    }
    $scope.updateUser = function () {
        if ($scope.updateUserInput.accountId == null || $scope.updateUserInput.accountId.toString().length < 1) {
            $scope.updateUserInput.accountId = $scope.searchResultUser.accountId;
        }
        if ($scope.updateUserInput.role == null || $scope.updateUserInput.role == "") {
            $scope.updateUserInput.role = $scope.searchResultUser.role;
        }
        if ($scope.updateUserInput.password == null || $scope.updateUserInput.password == "") {
            $scope.updateUserInput.password = " ";
        }
        UserFactory.update($scope.updateUserInput).then(
            function success(response) {
                if (response.data != null) {
                    $scope.responseObj = response.data;
                    if (response.data.success) {
                        $scope.searchResultUser = response.data.optionalValue;
                    }
                } else {
                    $scope.responseObj = tempResponse(false, htmlContentConstants.user_update_failed_no_response);
                }
            },
            function failure(error) {
                console.log("User => Update User Details service call failed, Error:" + JSON.stringify(error));
                $scope.responseObj = tempFailureResponse;
            }
        );
        $scope.updateUserInput = {};
    };
    // All Update Related Ends here.!!


    // All Delete Related Starts here !
    $scope.delete = function () {
        resetAllVews();
        $scope.deleteFlag = true;
        $scope.deleteUserInput = {};
        $scope.searchDeleteResultUser = null;
    };
    $scope.deleteUserInput = {};
    $scope.searchDeleteResultUser = null;
    $scope.searchDeleteUser = function () {
        $scope.responseObj = null;
        UserFactory.get($scope.deleteUserInput.userName).then(
            function success(response) {
                if (response.data != null && response.data != "") {
                    $scope.searchDeleteResultUser = response.data;
                } else {
                    $scope.searchDeleteResultUser = null;
                    $scope.responseObj = tempResponse(false, htmlContentConstants.user_not_found);
                }
            },
            function failure(error) {
                $scope.searchDeleteResultUser = null;
                $scope.responseObj = tempFailureResponse;
                console.log("User => Delete Function, Search User service call failed, Error:" + JSON.stringify(error));
            }
        );
        $scope.deleteUserInput = {};
    };
    $scope.userDelete = function () {
        $scope.responseObj = null;
        UserFactory.delete($scope.searchDeleteResultUser).then(
            function success(response) {
                $scope.responseObj = response.data;
                $scope.searchDeleteResultUser = null;
            },
            function failure(error) {
                $scope.searchDeleteResultUser = null;
                $scope.responseObj = tempFailureResponse;
                console.log("User => Delete Function, Delete User service call failed, Error:" + JSON.stringify(error));
            }
        );
    };
    // All Delete Related ends here.
};

//Dependecy Injection.
userController.$inject = ['$scope', 'UserFactory'];

//Registering Controller with the module.
angular
    .module("UserModule")
    .controller("UserController", userController);