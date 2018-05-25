"use strict";

angular.module('AnimalTFDB3')
    .controller('GeneInfoController', GeneInfoController);
function GeneInfoController($scope,$http,$window,AnimalTFDBservice,$routeParams) {
    console.log("GeneInfoController loaded");
    var gene=$routeParams.tf;
    var species="";
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    $scope.gene=gene;
    $scope.fetch_tf=function (url) {
        $http({
            url: base_url+url,
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                var tf_info=response.data.tf_list;
                var tf;
                if (tf_info.length>0){
                    tf=tf_info[0];
                    $scope.species_title=tf["species"].split("_").join(" ");
                    $scope.species=tf["species"];
                    species=tf["species"];
                    localStorage.setItem(gene+"species_title",tf["species"].split("_").join(" "));
                    localStorage.setItem(gene+"species",tf["species"]);
                    $scope.family=tf["family"];
                    localStorage.setItem(gene+"family",tf["family"]);
                    $scope.fetch_domain();
                    $scope.fetch_go();
                    $scope.fetch_pathway(species);
                    $scope.fetch_ppi();
                    $scope.fetch_ortholog();
                    $scope.fetch_paralog();
                    $scope.fetch_phenotype();
                }
            });
    };
    if(localStorage.getItem(gene+"phenotype_list")){
        console.log("hello");
        $scope.species_title=localStorage.getItem(gene+"species_title");
        $scope.species=localStorage.getItem(gene+"species");
        $scope.family=localStorage.getItem(gene+"family");
        $scope.domain_list=JSON.parse(localStorage.getItem(gene+"domain_list"));
        $scope.go_list=JSON.parse(localStorage.getItem(gene+"go_list"));
        $scope.pathway_list=JSON.parse(localStorage.getItem(gene+"pathway_list"));
        $scope.ppi_list=JSON.parse(localStorage.getItem(gene+"ppi_list"));
        $scope.ortholog_list=JSON.parse(localStorage.getItem(gene+"ortholog_list"));
        $scope.paralog_list=JSON.parse(localStorage.getItem(gene+"paralog_list"));
        $scope.phenotype_list=JSON.parse(localStorage.getItem(gene+"phenotype_list"));
    }else{
        if($routeParams.cofactors){
            console.log("cofactors");
            $scope.fetch_tf('/api/tf_cofactors_annotaion');
        }else{
            $scope.fetch_tf('/api/tf_annotaion')
        }

    }
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper_doc").toggleClass("active");
    });
    $scope.fetch_domain=function () {
        $http({
            url: base_url+'/api/domain',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data.domain_list);
                $scope.domain_list=response.data.domain_list;
                localStorage.setItem(gene+"domain_list",JSON.stringify(response.data.domain_list));
            });

    };

    $scope.fetch_go=function () {
        $http({
            url: base_url+'/api/go',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.go_list=response.data.go_list;
                localStorage.setItem(gene+"go_list",JSON.stringify(response.data.go_list));
            });

    };

    $scope.fetch_pathway=function (species) {
        $http({
            url: base_url+'/api/pathway',
            params: {"ensembl":gene,"species":species},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.pathway_list=response.data.pathway_list;
                localStorage.setItem(gene+"pathway_list",JSON.stringify(response.data.pathway_list));
            });

    };
    $scope.fetch_ppi=function () {
        $http({
            url: base_url+'/api/ppi',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.ppi_list=response.data.ppi_list;
                localStorage.setItem(gene+"ppi_list",JSON.stringify(response.data.ppi_list));
            });

    };
    $scope.fetch_ortholog=function () {
        $http({
            url: base_url+'/api/ortholog',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.ortholog_list=response.data.ortholog_list;
                localStorage.setItem(gene+"ortholog_list",JSON.stringify(response.data.ortholog_list));
            });

    };
    $scope.fetch_paralog=function () {
        $http({
            url: base_url+'/api/paralog',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.paralog_list=response.data.paralog_list;
                localStorage.setItem(gene+"paralog_list",JSON.stringify(response.data.paralog_list));
            });

    };
    $scope.fetch_phenotype=function () {
        $http({
            url: base_url+'/api/phenotype',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.phenotype_list=response.data.phenotype_list;
                localStorage.setItem(gene+"phenotype_list",JSON.stringify(response.data.phenotype_list));
            });

    };

}
