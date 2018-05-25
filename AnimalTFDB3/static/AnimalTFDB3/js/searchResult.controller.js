/**
 * Created by miaoy on 2018/5/23.
 */

"use strict";

angular.module('AnimalTFDB3')
    .controller('SearchResultController', SearchResultController);

function SearchResultController($scope,$http,$window,AnimalTFDBservice,$routeParams) {
    console.log("SearchResultController loaded");
    $scope.loading=1;
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var query=$routeParams.query;
    $scope.query=query;
    $scope.fetch_tf=function () {
        $http({
            url: base_url+'/api/tf_annotaion',
            params: {"query":query},
            method: 'GET'
        }).then(
            function success(response) {
                $scope.tf_zero=0;
                console.log(response.data);
                $scope.tf_list = response.data.tf_list;
                var arr=response.data.tf_list;
                $scope.tf_count=arr.length;
                $scope.dbd=response.data.family_DBD;
                $scope.id=response.data.family_ID;
                $scope.loading=0;
                var id=response.data.family_ID;
                var reg=/PF/;
                var reg1=/IPR/;
                var reg2=/self/;
                console.log(reg.test(id));
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
            params: {"query":query},
            method: 'GET'
        }).then(
            function success(response) {
                $scope.tf_cofactors_zero=0;
                console.log(response.data);
                $scope.tf_cofactors_list = response.data.tf_list;
                var arr=response.data.tf_list;
                $scope.tf_cofactors_count=arr.length;
                $scope.loading=0
            });
    };
    if (!($routeParams.type)){
        $scope.fetch_tf();
        $scope.fetch_tf_cofactors();
    }
    var type=$routeParams.type;
    var basic_array=["Ensembl_Gene_ID","Entrez_Gene_ID","Ensembl_Transcript_ID","Ensembl_Protein_ID","Gene_Symbol","Gene_Alias","Full_name"];
    var annotation_array=["Protein-Protein_Interaction_(Gene_ID_or_Symbol)","Pathway_(Pathway_ID_or_Description)","Gene_Ontology_(Gene_Ontology_ID_or_Description)","Ortholog_(Ensembl_ID_or_Symbol)","Paralog_(Ensembl_ID_or_Symbol)"];
    if ((basic_array.indexOf(type))>=0){
        $scope.fetch_tf();
        $scope.fetch_tf_cofactors();
        $scope.loading=0;
    }
    $scope.fetch_go=function (condition) {
        $http({
            url: base_url+'/api/go',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                // localStorage.setItem(gene+"go_list",JSON.stringify(response.data.go_list));
            });
    };
    $scope.fetch_pathway=function (condition) {
        $http({
            url: base_url+'/api/pathway',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                // localStorage.setItem(gene+"pathway_list",JSON.stringify(response.data.pathway_list));
            });

    };
    $scope.fetch_ppi=function (condition) {
        $http({
            url: base_url+'/api/ppi',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                // localStorage.setItem(gene+"ppi_list",JSON.stringify(response.data.ppi_list));
            });

    };
    $scope.fetch_ortholog=function (condition) {
        $http({
            url: base_url+'/api/ortholog',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                // localStorage.setItem(gene+"ortholog_list",JSON.stringify(response.data.ortholog_list));
            });

    };
    $scope.fetch_paralog=function (condition) {
        $http({
            url: base_url+'/api/paralog',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                $scope.loading=0;
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                // localStorage.setItem(gene+"paralog_list",JSON.stringify(response.data.paralog_list));
            });

    };
    if ((annotation_array.indexOf(type))>=0){
        console.log("half success");
        var condition={"query":query};
        switch(type){
            case "Protein-Protein_Interaction_(Gene_ID_or_Symbol)":
                $scope.fetch_ppi(condition);
                break;
            case "Pathway_(Pathway_ID_or_Description)":
                $scope.fetch_pathway(condition);
                break;
            case "Gene_Ontology_(Gene_Ontology_ID_or_Description)":
                $scope.fetch_go(condition);
                break;
            case "Ortholog_(Ensembl_ID_or_Symbol)":
                $scope.fetch_ortholog(condition);
                break;
            case "Paralog_(Ensembl_ID_or_Symbol)":
                $scope.fetch_paralog(condition);
                break;
        }

    }
}