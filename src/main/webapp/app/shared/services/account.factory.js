'use strict';

// Creating Factory Fuction.
var accountFactory = function ($http) {
    return {
        getAllAccounts: function () {
            return $http.get(appApiConstants.account_get_all);
        },
        get: function (accountId) {
            return $http.get(appApiConstants.account_get + accountId);
        },
        add: function (obj) {
            return $http.post(appApiConstants.account_add, obj);
        },
        update: function (obj) {
            return $http.post(appApiConstants.account_update, obj);
        },
        delete: function (accountId) {
            return $http.post(appApiConstants.account_delete + accountId);
        }
    }
};

//Adding Dependecy Injuction .
accountFactory.$inject = ['$http'];

//Registering factory to module.
angular
    .module('MyApp')
    .factory('AccountFactory', accountFactory);