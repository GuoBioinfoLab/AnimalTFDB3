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
    $scope.tf_zero=1;
    $scope.tf_cofactors_zero=1;
    var quick_search=0;
    var tf_list=[];
    var cofactor_list=[];
    if ($routeParams.quick_search){
        quick_search=1;
    }
    $scope.fetch_tf=function () {
        $http({
            url: base_url+'/api/tf_annotaion',
            params: {"query":query,"quick_search":quick_search},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list = response.data.tf_list;
                var arr=response.data.tf_list;
                tf_list=arr;
                $scope.tf_count=arr.length;
                $scope.dbd=response.data.family_DBD;
                $scope.id=response.data.family_ID;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<arr.length;i++){
                    var spe=arr[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                        species_list.push({"species":va})
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                console.log(species_list);
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
                    $scope.tf_zero=0;
                }
                $scope.loading=0;
            });
    };
    $scope.fetch_tf_cofactors=function () {
        $http({
            url: base_url+'/api/tf_cofactors_annotaion',
            params: {"query":query,"quick_search":quick_search},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_cofactors_list = response.data.tf_list;
                var arr=response.data.tf_list;
                cofactor_list=arr;
                if (arr.length==0){
                    $scope.tf_cofactors_zero=0;
                }
                var species_list=[];
                var check_list=[];
                for (var i=0;i<arr.length;i++){
                    var spe=arr[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                        species_list.push({"species":va})
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=species_list;
                $scope.loading=0
            });
    };
    $scope.fetch_expression=function (condition) {
        $http({
            url: base_url+'/api/expression',
            params: condition,
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;
                $scope.tf_cofactors_zero=cofactor_list.length;
                $scope.tf_zero=tf_list.length

            });

    };
    $scope.fetch_transcript=function () {
        $http({
            url: base_url+'/api/transcript',
            params: {"transcript":query},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tf_list=response.data.tf_list;
                $scope.tf_cofactors_list=response.data.tf_cofactors_list;
                $scope.loading=0;
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;
                $scope.tf_cofactors_zero=cofactor_list.length;
                $scope.tf_zero=tf_list.length

            });

    };
    if ((!($routeParams.type))&&(!$routeParams.thresh)){
        $scope.fetch_tf();
        $scope.fetch_tf_cofactors();
    }
    var type=$routeParams.type;
    var basic_array=["Ensembl_Gene_ID","Entrez_Gene_ID","Ensembl_Protein_ID","Gene_Symbol","Gene_Alias","Full_name"];
    var annotation_array=["Protein-Protein_Interaction_(Gene_ID_or_Symbol)","Pathway_(Pathway_ID_or_Description)","Gene_Ontology_(Gene_Ontology_ID_or_Description)","Ortholog_(Ensembl_ID_or_Symbol)","Paralog_(Ensembl_ID_or_Symbol)"];
    if ((basic_array.indexOf(type))>=0){
        $scope.fetch_tf();
        $scope.fetch_tf_cofactors();
    };
    if (type=="Ensembl_Transcript_ID"){
        $scope.fetch_transcript()
    }
    if($routeParams.protein){
        var tissue=$routeParams.tissue;
        var threshold=$routeParams.thresh;
        var condition={"pro_tissue":tissue.split("_").join(" "),"threshold":threshold};
        $scope.fetch_expression(condition)
    };
    if ($routeParams.mirna){
        var tissue=$routeParams.tissue;
        var threshold=$routeParams.thresh;
        var condition={"tissue":tissue.split("_").join(" "),"threshold":threshold,"species":"Homo_sapiens"};
        $scope.fetch_expression(condition)
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
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;

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
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;
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
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;

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
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;

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
                tf_list=response.data.tf_list;
                cofactor_list=response.data.tf_cofactors_list;
                var species_list=[];
                var check_list=[];
                for (var i=0;i<tf_list.length;i++){
                    var spe=tf_list[i];
                    var va=spe["species"];
                    if (check_list.indexOf(va)<0){
                        check_list.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")){
                            species_list.push({"species":va})
                        }
                    }
                }
                if (check_list.indexOf("Mus_musculus")>-1){
                    species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check_list.indexOf("Homo_sapiens")>-1){
                    species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.species_list=species_list;
                var cofactor_species_list=[];
                var check=[];
                for (var i=0;i<cofactor_list.length;i++){
                    var spe=cofactor_list[i];
                    var va=spe["species"];
                    if (check.indexOf(va)<0){
                        check.push(va);
                        if((!(va=="Homo_sapiens"))&&(!va=="Mus_musculus")) {
                            cofactor_species_list.push({"species": va})
                        }
                    }
                }
                if (check.indexOf("Mus_musculus")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Mus_musculus"});
                }
                if (check.indexOf("Homo_sapiens")>-1){
                    cofactor_species_list.splice(0, 0, {"species":"Homo_sapiens"});
                }
                $scope.cofactor_species_list=cofactor_species_list;

                // localStorage.setItem(gene+"paralog_list",JSON.stringify(response.data.paralog_list));
            });

    };
    if ((annotation_array.indexOf(type))>=0){
        console.log("half success");
        var condition={"query":query};
        switch(type){
            case "Protein-Protein_Interaction_(Gene_ID_or_Symbol)":
                $scope.fetch_ppi(condition);
                $scope.tf_cofactors_zero=!cofactor_list.length;
                $scope.tf_zero=!tf_list.length;
                break;
            case "Pathway_(Pathway_ID_or_Description)":
                $scope.fetch_pathway(condition);
                $scope.tf_cofactors_zero=!cofactor_list.length;
                $scope.tf_zero=!tf_list.length;
                break;
            case "Gene_Ontology_(Gene_Ontology_ID_or_Description)":
                $scope.fetch_go(condition);
                $scope.tf_cofactors_zero=!cofactor_list.length;
                $scope.tf_zero=!tf_list.length;
                break;
            case "Ortholog_(Ensembl_ID_or_Symbol)":
                $scope.fetch_ortholog(condition);
                $scope.tf_cofactors_zero=!cofactor_list.length;
                $scope.tf_zero=!tf_list.length;
                break;
            case "Paralog_(Ensembl_ID_or_Symbol)":
                $scope.fetch_paralog(condition);
                $scope.tf_cofactors_zero=!cofactor_list.length;
                $scope.tf_zero=!tf_list.length;
                break;
        };

    };
    $scope.filter_species=function () {
        var species = $("#filter_species").val();
        var new_arr=[];
        if (species=="All"){
            $scope.tf_list=tf_list
        }else{
            for(var i=0;i<tf_list.length;i++){
            var temp=tf_list[i];
            if (temp["species"]==species){
                new_arr.push(temp)
            }
        }
        $scope.tf_list=new_arr
        }


    };
    $scope.filter_cofactor_species=function () {
        var species = $("#filter_cofactor_species").val();
        var new_arr=[];
        if(species=="All"){
            $scope.tf_cofactors_list=cofactor_list
        }else{
             for(var i=0;i<cofactor_list.length;i++){
            var temp=cofactor_list[i];
            if (temp["species"]==species){
                new_arr.push(temp)
            }
        }
        $scope.tf_cofactors_list=new_arr
        }

    }
}