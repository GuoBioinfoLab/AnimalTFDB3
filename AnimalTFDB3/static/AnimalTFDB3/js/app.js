"use strict";

angular.module('AnimalTFDB3', ['ui.bootstrap', 'ngRoute', 'pageslide-directive', 'ui.bootstrap-slider', 'bw.paging','ng-echarts','tableSort'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/static/AnimalTFDB3/pages/home.html",
                controller: "HomeController",
            })
            .when("/search", {
                templateUrl: "/static/AnimalTFDB3/pages/search.html",
                controller: "SearchController",
            })
            .when("/seach_result", {
                templateUrl: "/static/AnimalTFDB3/pages/searchResult.html",
                controller: "SearchResultController",
            })
            .when("/species", {
                templateUrl: "/static/AnimalTFDB3/pages/species4.html",
                controller: "SpeciesController",
            })
             .when("/tf_summary", {
                templateUrl: "/static/AnimalTFDB3/pages/tf_summary.html",
                controller: "SpeciesSummaryController",
            })
            .when("/family", {
                templateUrl: "/static/AnimalTFDB3/pages/family3.html",
                controller: "FamilyController",
            })
            .when("/tcf", {
                templateUrl: "/static/AnimalTFDB3/pages/tcf.html",
                controller: "TcfController",
            })
            .when("/predict", {
                templateUrl: "/static/AnimalTFDB3/pages/predict.html",
                controller: "PredictController",
            })
              .when("/tfbs_predict", {
                templateUrl: "/static/AnimalTFDB3/pages/tfbs_predict.html",
                controller: "TfbsPredictController",
            })
             .when("/blast", {
                templateUrl: "/static/AnimalTFDB3/pages/blast.html",
                controller: "PredictController",
            })
            .when("/blast", {
                templateUrl: "/static/AnimalTFDB3/pages/blast.html",
                controller: "BlastController",
            })
            .when("/download", {
                templateUrl: "/static/AnimalTFDB3/pages/download2.html",
                controller: "DownloadController",
            })
            .when("/document", {
                templateUrl: "/static/AnimalTFDB3/pages/document.html",
                controller: "DocumentController",
            })
            .when("/citation", {
                templateUrl: "/static/AnimalTFDB3/pages/citation.html",
                controller: "ContactController",
            })
            .when("/contact", {
                templateUrl: "/static/AnimalTFDB3/pages/contact.html",
                controller: "ContactController",
            })
            .when("/tf_gene_info", {
                templateUrl: "/static/AnimalTFDB3/pages/gene_info.html",
                controller: "GeneInfoController",
            })
             .when("/tf_detail", {
                templateUrl: "/static/AnimalTFDB3/pages/tf_detail.html",
                controller: "TFdetailController",
            })
             .when("/ppi_network", {
                templateUrl: "/static/AnimalTFDB3/pages/ppi_network.html",
                controller: "PPINetworkController",
            })
            .when("/test", {
                templateUrl: "/static/AnimalTFDB3/pages/test.html",
                controller: "TestController",
            })
            .otherwise({
                redirectTo: "/404.html",
            });

    })
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .service('AnimalTFDBservice',function () {
        this.getBrowserBaseUrl = function () {
            return "http://211.69.207.247/wubrowse/browser/?genome=hg38";
        };
        this.getBrowserDataHubNaseUrl = function () {
            // return "211.69.207.247/AnimalTFDB3";
            return "0.0.0.0:3000";
        };
        this.getAPIBaseUrl = function () {
            return "/AnimalTFDB"
            //return ""
        }
    });


