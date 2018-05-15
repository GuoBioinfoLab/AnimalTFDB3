"use strict";

angular.module('AnimalTFDB3')
    .controller('FamilyController', FamilyController);

function FamilyController($scope) {
    console.log("FamilyController loaded");
    $(document).ready(function () {
                 $('#sidebarCollapse').on('click', function () {
                     $('#sidebar').toggleClass('active');
                 });
             });
    $scope.show_more=function (para) {
        switch (para){
            case 1:
                $scope.one=1;
                break;
            case 2:
                $scope.two=1;
                break;
            case 3:
                $scope.three=1;
                break;
            case 4:
                $scope.four=1;
                break;
            case 5:
                $scope.five=1;
                break;
            case 6:
                $scope.six=1;
                break;
        }
    };
    $scope.show_less=function (para) {
        switch (para){
            case 1:
                $scope.one=0;
                break;
            case 2:
                $scope.two=0;
                break;
            case 3:
                $scope.three=0;
                break;
            case 4:
                $scope.four=0;
                break;
            case 5:
                $scope.five=0;
                break;
            case 6:
                $scope.six=0;
                break;
        }
    }
}