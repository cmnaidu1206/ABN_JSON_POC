'use strict';

// Creating Factory Fuction.
var transactionsFactory = function ($http) {
    return {
        getAllTransactions: function () {
            return $http.get(appApiConstants.transactions_get_all);
        },
        getTransactionsOfFromAccount: function (fromAccountId) {
            return $http.get(appApiConstants.transactions_get_from_account + fromAccountId);
        },
        getTransactionsOfToAccount: function (toAccountId) {
            return $http.get(appApiConstants.transactions_get_to_account + toAccountId);
        },
        add: function (obj) {
            return $http.post(appApiConstants.transactions_add, obj);
        }
    }
};

//Adding Dependecy Injuction .
transactionsFactory.$inject = ['$http'];

//Registering factory to module.
angular
    .module('MyApp')
    .factory('TransactionsFactory', transactionsFactory);