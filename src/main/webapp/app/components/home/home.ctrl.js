'use strict'


//Creating Controller Function.
var homeController = function ($rootScope, $scope, UserFactory) {
    //YOUR CODE OF CONTROLLER GOES INSIDE THIS FUNCTION.
    $scope.$on('$routeChangeSuccess', function () {
        // This method will be executed on Route path comes to this Controller.
        // default loading view tab
        $scope.stocks();
    });
    var resetAll = function () {
        $scope.stocksView = false;
        $scope.changePasswordFlag = false;
    };

    $scope.passwordObj = {};
    $scope.responseObj = null;
    $scope.changePassword = function () {
        resetAll();
        $scope.changePasswordFlag = true;
    };

    $scope.stocks = function () {
        resetAll();
        $scope.stocksView = true;
        setTimeout(function () {
            Highcharts.chart('lineGraph', {

                title: {
                    text: 'ABN Growth by Sector, 2010-2016'
                },

                subtitle: {
                    text: 'Source: ABN Value'
                },

                yAxis: {
                    title: {
                        text: 'Value in $'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '{point.x}<br>',
                    pointFormat: '{series.name}:${point.y}',
                    shared: false
                },


                series: [{
                    name: 'Finance',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Banking',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Loans',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: 'Credits',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: 'Asserts & Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'ABN World Wide Share Distribution'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            distance: 10,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'

                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'ABN NL',
                        y: 12.33,
                        selected: true,
                        sliced: true
                    }, {
                        name: 'ABN US',
                        y: 6.03,
                    }, {
                        name: 'ABN IN',
                        y: 10.38
                    }, {
                        name: 'ABN Euro',
                        y: 4.77
                    }, {
                        name: 'ABN UK',
                        y: 4.91
                    }, {
                        name: 'ABN CA',
                        y: 3.2
                    }]
                }]
            });

        },10);
    };



    $scope.updatePassword = function () {
        $scope.responseObj = null;
        if ($scope.passwordObj.old != null && $scope.passwordObj.new != null && $scope.passwordObj.retype != null &&
            $scope.passwordObj.old.length > 0 && $scope.passwordObj.new.length > 0 && $scope.passwordObj.retype.length > 0) {
            if ($scope.passwordObj.new != $scope.passwordObj.retype) {
                $scope.responseObj = tempResponse(false, htmlContentConstants.new_retpe_not_match);
            } else {
                var passwordObj = {
                    "userName": $rootScope.currentUser.userName,
                    "oldPassword": $scope.passwordObj.old,
                    "newPassword": $scope.passwordObj.retype
                };
                UserFactory.changePassword(passwordObj).then(function success(response) {
                        if (response.data != null) {
                            $scope.responseObj = response.data;
                        } else {
                            $scope.responseObj = tempFailureResponse;
                        }
                    },
                    function failure(error) {
                        console.log("Home, Change Password service call failed , Error:" + JSON.stringify(error));
                        $scope.response = tempFailureResponse;
                    });
            }
        } else {
            $scope.responseObj = tempResponse(false, htmlContentConstants.enter_all_fields);
        }
        $scope.passwordObj = {};
    };
};


//Dependecy Injucting.
homeController.$inject = ['$rootScope', '$scope', 'UserFactory'];

//Registering Controller to home Module.
angular
    .module("HomeModule")
    .controller("HomeController", homeController);