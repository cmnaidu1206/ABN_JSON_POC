'use strict';

// Creating Factory Fuction.
var customerFactory = function ($http) {
    return {
        getAllCustomers: function () {
            return $http.get(appApiConstants.customer_get_all);
        },
        get: function (customerId) {
            return $http.get(appApiConstants.customer_get + customerId);
        },
        add: function (obj) {
            return $http.post(appApiConstants.customer_add, obj);
        },
        update: function (obj) {
            return $http.post(appApiConstants.customer_update, obj);
        },
        delete: function (customerId) {
            return $http.post(appApiConstants.customer_delete + customerId);
        }
    }
};

//Adding Dependecy Injuction .
customerFactory.$inject = ['$http'];

//Registering factory to module.
angular
    .module('MyApp')
    .factory('CustomerFactory', customerFactory);