
"use strict";

angular.module('AnimalTFDB3')
    .controller('BlastController', BlastController);

function BlastController($scope) {
    console.log("BlastController loaded");
      $scope.load=function () {
        $("#input_seq").val("hello world!");
    };
    $scope.get_result=function () {
        $scope.predict_start=1;
    };
    $scope.reset=function () {
       $("#input_seq").val("");
    }
}