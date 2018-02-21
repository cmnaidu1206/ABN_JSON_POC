//Creating Configuration Object.
var myConfig = function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeController'
        })
        .when('/account', {
            templateUrl: 'app/components/account/account.html',
            controller: 'AccountController'
        })
        .when('/customer', {
            templateUrl: 'app/components/customer/customer.html',
            controller: 'CustomerController'
        })
        .when('/user', {
            templateUrl: 'app/components/user/user.html',
            controller: 'UserController'
        })
        .when('/myAccounts', {
            templateUrl: 'app/components/myAccounts/myAccounts.html',
            controller: 'MyAccountsController'
        })
        .when('/myDetails', {
            templateUrl: 'app/components/myDetails/myDetails.html',
            controller: 'MyDetailsController'
        })
        .when('/transfers', {
            templateUrl: 'app/components/transactions/transfers.html',
            controller: 'TransfersController'
        })
        .when('/transactions', {
            templateUrl: 'app/components/transactions/transactions.html',
            controller: 'TransactionsController'
        });
};

//registering configuration with main module.
angular
    .module('MyApp')
    .config(myConfig);