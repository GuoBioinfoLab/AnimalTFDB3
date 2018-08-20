
"use strict";

angular.module('AnimalTFDB3')
    .controller('BlastController', BlastController);

function BlastController($scope,$http,$routeParams,AnimalTFDBservice,$window) {
    console.log("BlastController loaded");
      $scope.load=function () {
          $scope.input_seq=">ENSP00000415151\nMPRVVPDQRSKFENEEFFRKLSRECEIKYTGFRDRPHEERQARFQNACRDGRSEIAFVAT\nGTNLSLQFFPASWQGEQRQTPSREYVDLEREAGKVYLKAPMILNGVCVIWKGWIDLQRLD\n" +
            "GMGCLEFDEERAQQEDALAQQAFEEARRRTREFEDRDRSHREEMEARRQQDPSPGSNLGG\n"+"GDDLKLR";
    };
    $scope.reset=function () {
       $scope.input_seq="";
    };
    $scope.get_result=function () {
        var ele = document.getElementById("blast_result");
        ele.innerHTML="";
        var base_url = AnimalTFDBservice.getAPIBaseUrl();
        $scope.predict_start=1;
        var seq=$scope.input_seq;
        var blast_temp=$("#blast option:selected").text();
        var blast=blast_temp.toLocaleLowerCase().split(":")[0];
        var evalue=$("#evalue option:selected").text();
        var species_tmp=$("#species option:selected").text();
        var species=species_tmp.split(" ").join("_");
        console.log(blast);
        console.log(species);
        console.log(evalue);
        $http({
            url: base_url + '/api/blast',
            method: 'POST',
            data:{input_seq:seq,program:blast,evalue:evalue,species:species}
        }).then(
            function (response) {
                $scope.result=1;
                console.log(response.data);
                $scope.predict_start=0;
                var pre_result=response.data.result;
                var ele = document.getElementById("blast_result");
                ele.innerHTML=pre_result;
            }
        )
    };
}