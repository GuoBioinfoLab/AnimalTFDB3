
"use strict";

angular.module('AnimalTFDB3')
    .controller('SpeciesController', SpeciesController);

function SpeciesController($scope,$http,$window,AnimalTFDBservice) {
    console.log("SpeciesController loaded");
    $("[data-toggle='popover']").popover();
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var species="Echinops_telfairi";
    var family=$("#family option:selected").text();
    $scope.species=species;
    $scope.species_title=species.split("_").join(" ");
    $scope.family=family;
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
    $("ul#species_ul").on("click","li",function(){
        var s=$(this).text();
        var reg=/(\d\s)more|Less/;
        if(!(reg.test(s))){
            var t=s.split(" ");
            species=t.join("_");
            $scope.species=species;
            $scope.species_title=species.split("_").join(" ");
            $scope.fetch_tf();
            $scope.fetch_species_count()
        }
    });
    $scope.family_change=function () {
        family=$("#family option:selected").text();
        $scope.family=family;
        $scope.fetch_tf();
    };
    $scope.show_more=function (para) {
        switch (para){
            case 1:
                $scope.one=1;
                break;
            case 2:
                $scope.two=1;
                break;
            case 3:
                $scope.three=1;
                break;
            case 4:
                $scope.four=1;
                break;
            case 5:
                $scope.five=1;
                break;
            case 6:
                $scope.six=1;
                break;
        }
    };
    $scope.show_less=function (para) {
        switch (para){
            case 1:
                $scope.one=0;
                break;
            case 2:
                $scope.two=0;
                break;
            case 3:
                $scope.three=0;
                break;
            case 4:
                $scope.four=0;
                break;
            case 5:
                $scope.five=0;
                break;
            case 6:
                $scope.six=0;
                break;
        }
    };

    $scope.fetch_tf=function () {
        $http({
            url: base_url+'/api/tf_annotaion',
            params: {"species":species,"family":family},
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
                if (arr.length==0){
                    $scope.tf_zero=1;
                }
            });
    };
    $scope.fetch_tf();
    $scope.show_modal = function (item) {
        // $scope.target = item;
    };
    $scope.fetch_species_count=function () {
        var species_count=[];
        var family_array=[];
        $http({
            url: base_url + '/api/species_count',
            params: {species: species},
            method: 'GET'
        }).then(
            function (response) {
                console.log(response.data);
                var species_count_list = response.data.count_list;
                for (var i=0;i<species_count_list.length;i++){
                    var temp=species_count_list[i];
                    family_array.push(temp["family"]);
                    species_count.push(Number(temp["count"]))
                }
                function onClick(params) {
                    family=params.name;
                    $scope.family=family;
                    $scope.fetch_tf();
                };
                $scope.lineConfig = {
                    theme: 'default',
                    event: [{click: onClick}],
                    dataLoaded: true
                };
                $scope.lineOption={
                    title : {
                        text: "TF count"
                    },
                    tooltip : {
                        trigger: 'axis',
                        position:function(p){   //其中p为当前鼠标的位置
                            return [p[0]-300, p[1]-500];
                        }
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    grid: {
                        bottom: '20%',
                        containLabel: true
                    },

                    xAxis : [
                        {
                            axisLabel: {rotate:60,interval:0},
                            type : 'category',
                            data : family_array
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'TF count',
                            type:'bar',
                            barGap:20,
                            data:species_count,


                            itemStyle: {
                                normal: {
                                    label:{show:true,position:'outer',color:"blue",textStyle:{color:"#1E90FF"}},
                                    color:"#FF9999"
                                }
                            }
                        }
                    ]
                }

            }
        );

    };
    $scope.fetch_species_count()

}