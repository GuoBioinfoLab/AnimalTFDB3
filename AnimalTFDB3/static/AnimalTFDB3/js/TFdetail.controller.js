/**
 * Created by miaoy on 2018/6/14.
 */

"use strict";

angular.module('AnimalTFDB3')
    .controller('TFdetailController', TFdetailController);

function TFdetailController($scope,$http,$window,AnimalTFDBservice,$routeParams) {
    console.log("TFdetailController loaded");
    $("[data-toggle='popover']").popover();
    $scope.loading=1;
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var species=$routeParams.species;
    var family=$routeParams.family;
    $scope.species=species;
    $scope.species_title=species.split("_").join(" ");
    $scope.family=family;
    $scope.loading=1;
    $scope.fetch_tf=function () {
        $http({
            url: base_url+'/api/tf_annotaion',
            params: {"species":species,"family":family},
            method: 'GET'
        }).then(
            function success(response) {
                $scope.loading=0;
                $scope.tf_zero=0;
                console.log(response.data);
                $scope.tf_list = response.data.tf_list;
                var arr=response.data.tf_list;
                $scope.tf_count=arr.length;
                $scope.dbd=response.data.family_DBD;
                $scope.id=response.data.family_ID;
                var description=response.data.description;
                var reference=response.data.reference;
                if (!(description=="-")){
                    $scope.family_info=1;
                     var ele = document.getElementById("description");
                     ele.innerHTML=description;
                     var ref = document.getElementById("reference");
                     ref.innerHTML=reference;
                }
                var id=response.data.family_ID;
                var reg=/PF/;
                var reg1=/IPR/;
                var reg2=/self/;
                if (reg.test(id)){
                    $scope.link_tag=1
                }
                if(reg1.test(id)){
                    $scope.sing_tag=1
                }
                if(reg2.test(id)){
                    $scope.self_tag=1
                }
                if (arr.length==0){
                    $scope.tf_zero=1;
                }

            });
    };
    $scope.fetch_tf_cofactors=function () {
        $http({
            url: base_url+'/api/tf_cofactors_annotaion',
            params: {"family":family,"species":species},
            method: 'GET'
        }).then(
            function success(response) {
                 $scope.loading=0;
                $scope.tf_zero=0;
                console.log(response.data);
                $scope.tf_list = response.data.tf_list;
                var arr=response.data.tf_list;
                $scope.tf_count=arr.length;
                  if (arr.length==0){
                    $scope.tf_zero=1;
                }
            });
    };
    if (!($routeParams.cofactors)){
        $scope.fetch_tf();
    }else{
        $scope.cofactors=1;
        $scope.fetch_tf_cofactors();
    }

    $scope.show_modal = function (item) {
        // $scope.target = item;
    };

}