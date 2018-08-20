
"use strict";

angular.module('AnimalTFDB3')
    .controller('TcfController', TcfController);

function TcfController($scope,$http,$window,AnimalTFDBservice)  {
    console.log("TcfController loaded");
    $("[data-toggle='popover']").popover();
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var family="actin";
    var screen_width= document.body.clientWidth;
    document.getElementById("barchart").style.width = screen_width -400+ "px";
    var species="Homo_sapiens";
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
    $scope.fetch_tf=function () {
        $http({
            url: base_url+'/api/tf_cofactors_annotaion',
            params: {"family":family,"species":species},
            method: 'GET'
        }).then(
            function success(response) {
                $scope.tf_zero=0;
                console.log(response.data);
                $scope.tf_list = response.data.tf_list;
                var arr=response.data.tf_list;
                $scope.tf_count=arr.length;
            });
    };
    $scope.fetch_tf();
    $scope.fetch_family_count=function () {
        var family_count=[];
        var species_array=[];
        $http({
            url: base_url + '/api/cofactors_family_count',
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
                     $scope.species_title=species.split("_").join(" ");
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