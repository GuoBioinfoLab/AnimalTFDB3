
"use strict";

angular.module('AnimalTFDB3')
    .controller('SearchController', SearchController);

function SearchController($scope) {

    console.log("SearchController loaded");
    $scope.query="ENSG00000072364";
    $scope.annotation_query="2624";
    $scope.query_change=function () {
        var idType = $("#basicSelect option:selected").text();
        switch(idType){
            case "Ensembl Gene ID":
                $scope.query="ENSG00000072364";
                break;
            case "Entrez Gene ID":
                $scope.query="27125";
                break;
            case "Ensembl Transcript ID":
                $scope.query="ENST00000265460";
                break;
            case "Ensembl Protein ID":
                $scope.query="ENSTGUP00000013908";
                break;
            case "Gene Symbol":
                $scope.query="AFF4";
                break;
            case "Gene Alias":
                $scope.query="p53";
                break;
            case "Full name":
                $scope.query="AF4/FMR2 family member 4";
                break;
        }
    };
    $scope.basic_search=function () {
        var idType = $("#basicSelect option:selected").text();
        var input = $("#basicInput").val();
        window.open("#!/seach_result?type="+idType.split(" ").join("_")+"&query="+input,"_self")
    };
    $scope.annotation_change=function () {
        var idType = $("#annotationSelect option:selected").text();
        switch (idType){
            case "Protein-Protein Interaction (Gene ID or Symbol)":
                $scope.annotation_query="2624";
                break;
            case "Pathway (Pathway ID or Description)":
                $scope.annotation_query="hsa04931";
                break;
            case "Gene Ontology (Gene Ontology ID or Description)":
                $scope.annotation_query="GO:0002151";
                break;
            case "Ortholog (Ensembl ID or Symbol)":
                $scope.annotation_query="ENSGALG00000042066";
                break;
            case "Paralog (Ensembl ID or Symbol)":
                $scope.annotation_query="ENSG00000123358";
                break;
        }
    };
    $scope.annotation_search=function () {
        var idType = $("#annotationSelect option:selected").text();
        var input = $("#annotationInput").val();
        window.open("#!/seach_result?type="+idType.split(" ").join("_")+"&query="+input,"_self")
    };
    $scope.protein_search=function () {
         var pro_tissue = $("#pro_tissue option:selected").text();
         var thresh = $("#threshold option:selected").text();
         window.open("#!/seach_result?tissue="+pro_tissue.split(" ").join("_")+"&thresh="+thresh+"&protein=1","_self")
    };
    $scope.human_mirna_exp_search=function () {
         var tissue = $("#mirna_tissue option:selected").text();
         if (tissue.indexOf("--")>-1){
             alert("please choose a source!");
             return false;
         }
         var thresh = $("#mirna_threshold option:selected").text();
         if (tissue.indexOf(":")>-1){
             window.open("#!/seach_result?tissue="+tissue.split(":")[0]+"&thresh="+thresh+"&mirna=1","_self")
         }else{
             window.open("#!/seach_result?tissue="+tissue.split(" ").join("_")+"&thresh="+thresh+"&mirna=1","_self")
         }

    }
}