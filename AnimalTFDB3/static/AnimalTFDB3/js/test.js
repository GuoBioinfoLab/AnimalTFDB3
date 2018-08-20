'use strict';

angular.module('AnimalTFDB3')
    .controller('TestController', TestController)
    .controller('Test2Controller', Test2Controller)
    .controller('Test3Controller', Test3Controller);

function TestController($scope,$window, $http,$location, $anchorScroll) {
    console.log("testcontrollerloaded");
   $scope.gotoTop=function () {
       console.log("top");
        $location.hash("top");
        $anchorScroll();
   };
   $scope.gotoBottom=function () {
       console.log("bottom");
       $location.hash("bottom");
        $anchorScroll();

   }
}

    // $scope.uploadStatus = $scope.uploadStatus1 = false; //定义两个上传后返回的状态，成功获失败
    // var uploader = new FileUploader({
    // });
    // var uploader1 = new FileUploader({
    // });
    // $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
    //     uploader.clearQueue();
    // }
    // $scope.clearItems1 = function(){
    //     uploader1.clearQueue();
    // }
    // uploader.onAfterAddingFile = function(fileItem) {
    //     $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
    // };
    // uploader1.onAfterAddingFile = function(fileItem) {
    //     $scope.fileItem1 = fileItem._file;    //添加文件之后，把文件信息赋给scope
    //     //能够在这里判断添加的文件名后缀和文件大小是否满足需求。
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     $scope.uploadStatus = true;   //上传成功则把状态改为true
    // };
    // uploader1.onSuccessItem = function(fileItem,response, status, headers){
    //     $scope.uploadStatus1 = true;
    // }
    // $scope.UploadFile = function(){
    //     uploader.uploadAll();
    //     uploader1.uploadAll();
    //     console.log("test upload");
    //     if(status){
    //         if(status1){
    //             alert('上传成功！');
    //         }else{
    //             alert('证书成功！私钥失败！');
    //         }
    //    }else{
    //         if(status1){
    //            alert('私钥成功！证书失败！');
    //         }else{
    //            alert('上传失败！');
    //         }
    //    }
    // }



//     var cy = cytoscape({
//         container:$('#cy'),
//   elements:[ { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
//   { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
//   { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }],
//     style: [
//                 {
//                     selector: 'node',
//                     css: {
//                         'content': 'data(id)',
//                         'background-color':"#1E90FF"
//                     }
//                 },
//
//                 {
//                     selector: 'edge',
//                     css: {
//                         'width': 3,
//                         'line-color': '#EAF048',
//                     }
//                 }
//             ]
//         });
//   // so we can see the ids
// //   style: [
// //     {
// //       selector: 'node',
// //       css: {
// //         'content': 'data(weight)',
// // 'background-color':'red'
// //       }
// //     }
// //   ]
// // });
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA1', snp: 'rs1'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA2', snp: 'rs2'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA3', snp: 'rs3'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA4', snp: 'rs4'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA5', snp: 'rs5'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA6', snp: 'rs6'},
//     //     {start: 1, end: 10, chromosome: 'chr1', strand: '+', lnc: 'lncRNA7', snp: 'rs7'},
//     // ];
//
//
//     $scope.jump_to_test2 = function () {
//         $window.open("#!/test2");
//     };
//
//     $scope.fetch_results = function () {
//         $http({
//             url: '/api/lncrna_snp_list',
//             method: 'GET',
//             params: {lncrna: $scope.q_lncrna}
//         }).then(
//             function (response) {
//                 console.log(response);
//                 $scope.lncrna_snp_list = response.data.lncrna_snp_list;
//             }
//         )
//     };
//
//     $scope.fetch_lncrna_snp_list = function () {
//         $http({
//             url: '/api/lncrna_snp_list',
//             method: 'GET',
//             params: {page: 1, per_page: 30}
//         }).then(
//             function (response) {
//                 console.log(response);
//                 $scope.lncrna_snp_list = response.data.lncrna_snp_list;
//             }
//         )
//     };
//
//     $scope.fetch_lncrna_snp_list();

function Test2Controller($scope, $http, $routeParams) {
    console.log("Test2Controller loaded");
    var params = $routeParams;
    console.log(params);
    $http({
        url: '',
        method: 'GET',
        params: {gene: parms.gene}
    }).then(
        function (response) {
            $scope.xxx = response.data.genes;
        }
    )
}

function Test3Controller($scope, $http) {
    console.log("Test3Controller loaded!");

    $scope.page = 1;
    $scope.per_page=30;
    $http({}).then(
        function (response) {
            $scope.num_records = response.data.num_lncrnas;
        }
    )
    $scope.update_page = function (a, page) {
        $http({
            url: '',
            method: 'GET',
            params: {page: page}
        }).then(
            function (response) {

            }
        );
    };
}
