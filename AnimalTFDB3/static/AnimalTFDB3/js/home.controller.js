"use strict";

angular.module('AnimalTFDB3')
    .controller('HomeController', HomeController)
    .controller('QuickSearchController', QuickSearchController);


function HomeController($scope) {
    console.log("HomeController loaded");
    $("[data-toggle='popover']").popover();
     $scope.next=function(){
         console.log("click");
            $("#myCarousel").carousel('next');
        };
        // 循环轮播到下一个项目

    $scope.previous=function(){
        console.log("click");
            $("#myCarousel").carousel('prev');
        };
//     $('#myCarousel').carousel({
//     interval: 7000,
//         wrap:true
// })

};
function QuickSearchController($scope,$window) {
    console.log("QuickSearchController loaded");
    $("[data-toggle='popover']").popover();
    $scope.search=function () {
        var query=$scope.input;
        window.open("#!/seach_result?query="+query+"&quick_search=1","_self");
    }

}
