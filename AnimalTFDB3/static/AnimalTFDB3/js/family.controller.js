"use strict";

angular.module('AnimalTFDB3')
    .controller('FamilyController', FamilyController);

function FamilyController($scope,$http,$window,AnimalTFDBservice)  {
    console.log("FamilyController loaded");
    $("[data-toggle='popover']").popover();
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var family="AF-4";
    var species="Ailuropoda_melanoleuca";
    $scope.species_title=species.split("_").join(" ");
    $scope.family=family;
    $scope.species=species;
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
    $("ul#family_ul").on("click","li",function(){
        console.log("family change");
        var s=$(this).text();
        var reg=/(\d\s)more|Less/;
        console.log(reg.test(s));
        if(!(reg.test(s))){
            $scope.family=s;
            family=s;
            $scope.fetch_tf();
            $scope.fetch_family_count()
        }
    });
    $scope.species_change=function () {
        var s=$("#species option:selected").text();
        var t=s.split(" ");
        species=t.join("_");
        $scope.species=species;
        $scope.species_title=s;
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
            params: {"family":family,"species":species},
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
    $scope.fetch_tf();
    $scope.show_modal = function (item) {
        // $scope.target = item;
    };
    $scope.fetch_family_count=function () {
        var family_count=[];
        var species_array=[];
        $http({
            url: base_url + '/api/family_count',
            params: {family: family},
            method: 'GET'
        }).then(
            function (response) {
                console.log(response.data);
                var family_count_list = response.data.count_list;
                for (var i=0;i<family_count_list.length;i++){
                    var temp=family_count_list[i];
                    species_array.push(temp["species"]);
                    family_count.push(Number(temp["count"]))
                }
                function onClick(params) {
                    species=params.name;
                    $scope.species=species;
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
                        bottom: '50%',
                        containLabel: true
                    },

                    xAxis : [
                        {
                            axisLabel: {rotate:60,interval:0},
                            type : 'category',
                            data : species_array
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
                            data:family_count,


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
    $scope.fetch_family_count()

}