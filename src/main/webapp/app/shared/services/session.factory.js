'use strict';

// Creating Factory Fuction.
var sessionFactory = function ($http) {
    return {
        getCurrentUser: function () {
            return $http.get(appApiConstants.current_user);
        }
    }
};

//Adding Dependecy Injuction .
sessionFactory.$inject = ['$http'];

//Registering factory to module.
angular
    .module('MyApp')
    .factory('SessionFactory', sessionFactory);