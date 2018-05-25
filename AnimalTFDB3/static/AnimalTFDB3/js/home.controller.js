"use strict";

angular.module('AnimalTFDB3')
    .controller('HomeController', HomeController)
    .controller('QuickSearchController', QuickSearchController);


function HomeController($scope) {
    console.log("HomeController loaded");
}
function QuickSearchController($scope,$window) {
    console.log("QuickSearchController loaded");
    $scope.search=function () {
        var query=$scope.input;
        window.open("#!/seach_result?query="+query,"_self");
    }

}