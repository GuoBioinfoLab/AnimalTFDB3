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
                templateUrl: "/static/AnimalTFDB3/pages/species.html",
                controller: "SpeciesController",
            })
            .when("/family", {
                templateUrl: "/static/AnimalTFDB3/pages/family.html",
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
            .when("/blast", {
                templateUrl: "/static/AnimalTFDB3/pages/blast.html",
                controller: "BlastController",
            })
            .when("/download", {
                templateUrl: "/static/AnimalTFDB3/pages/download.html",
                controller: "DownloadController",
            })
            .when("/document", {
                templateUrl: "/static/AnimalTFDB3/pages/document.html",
                controller: "DocumentController",
            })
            .when("/contact", {
                templateUrl: "/static/AnimalTFDB3/pages/contact.html",
                controller: "ContactController",
            })
            .when("/tf_gene_info", {
                templateUrl: "/static/AnimalTFDB3/pages/gene_info.html",
                controller: "GeneInfoController",
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
            //return "/AnimalTFDB3"
            return ""
        }
    });


