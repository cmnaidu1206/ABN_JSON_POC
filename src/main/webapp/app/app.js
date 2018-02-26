'use strict';

var myApp = angular.module("MyApp", [
    'ngRoute', // Angular Related Imports.
    'ngIdle', // Third Party Lib.
    'HomeModule', 'UserModule', // Application Related Modules.
    'MyAccountsModule', 'MyDetailsModule',
    'AccountModule', 'CustomerModule', 'TransactionsModule'
]);

// Configuring The idle timeout.
myApp.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(1*30);
    IdleProvider.timeout(10);
    KeepaliveProvider.interval(1*10);
  }]);
//Creating run fucntion for Main module.
var runMethod = function ($rootScope, SessionFactory,Idle,Keepalive) {
    //Idle.watch();
    SessionFactory.getCurrentUser()
        .then(function success(response) {
            $rootScope.currentUser = response.data;
            $rootScope.$broadcast("userSessionSet");
        },
            function failure(error) {
                console.log("Getting Current User Data Failed ,error:" + JSON.stringify(error));
            }
        );
}
//Injucting Dependecy to runMethod.
runMethod.$inject = ['$rootScope', 'SessionFactory','Idle','Keepalive'];

//registering run Method with Module myApp.
myApp.run(runMethod);

//creating controller function.
var appController = function ($rootScope, $scope, $location) {
    //YOUR CODE OF CONTROLLER GOES INSIDE THIS FUNCTION.
    $scope.admin = false;
    $rootScope.$on("userSessionSet", function () {
        // alert(JSON.stringify($rootScope.currentUser));
        if ($rootScope.currentUser.authorities[0] === 'ADMIN') {
            $scope.admin = true;
        } else {
            $scope.admin = false;
        }
        $scope.userName = $rootScope.currentUser.userName;
        $location.path("/home");
    });
    // $scope.$on('IdleTimeout', function() {
    //     alert("Timeout");
    //     angular.element("#signOutForm").submit();
    // });
    // $scope.$on('IdleStart', function() {
        
    // });
    // $scope.$on('IdleEnd', function() {
    //     alert("Idle End");
    // });
};

// Dependecy Injecution.
appController.$inject = ['$rootScope', '$scope', '$location'];
//Regristering controller function with MyAppModule.
myApp.controller("MyAppController", appController);