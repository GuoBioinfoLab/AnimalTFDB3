"use strict";

angular.module('AnimalTFDB3')
    .controller('FamilyController', FamilyController);

function FamilyController($scope,$http,$window,AnimalTFDBservice)  {
    $scope.loading=1;
    var screen_heigth= window.screen.height;
    var pic=document.getElementById("title_pic");
    var nav=document.getElementById("home_nav");
    var pic_height=window.getComputedStyle(pic).height.split("px")[0];
    var nav_height=window.getComputedStyle(nav).height.split("px")[0];
    document.getElementById("sidebar-wrapper_doc").style.height = screen_heigth-pic_height-nav_height-180 + "px";
    $scope.tf_click=1;
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
    $scope.sidebar_item=0;
    var family_list=[];
    var family=["AF-4","AP-2","ARID","bHLH","CBF","CG-1","COE","CP2","CSD","CSL","CSRNP","CTF/NFI","CUT","DACH","DM","E2F","ESR-like","ETS","Fork_head","GCFC","GCM","GCNF-like","GTF2I","HMG","HMGA","Homeobox","HPD","HSF","HTH","IRF","LRRFIP","MBD","MH1","Miscellaneous","MYB","NCU-G1","NDT80/PhoG","NF-YA","NF-YB","NF-YC","NGFIB-like","Nrf1","P53","PAX","PC4","Pou","RFX","RHD","Runt","RXR-like","SAND","SF-like","SRF","STAT","T-box","TEA","TF_bZIP","TF_Otx","THAP","THR-like","TSC22","Tub","ZBTB","zf-BED","zf-C2H2","zf-C2HC","zf-CCCH","zf-GAGA","zf-GATA","zf-LITAF-like","zf-MIZ","zf-NF-X1","Others"];
    var figure=["blank","AP-2","ARID","bHLH","CBF","blank","COE","blank","CSD","CSL","blank","blank","CUT","blank","DM","E2F","ESR-like","ETS","Fork head","blank","GCM","blank","blank","blank","blank","Homeobox","blank","HSF","HTH","IRF","blank","MBD","MH1","Miscellaneous","MYB","blank","NDT80_PhoG","NF-YA","NF-YB","NF-YC","NGFIB-like","blank","P53","PAX","PC4","Pou","RFX","RHD","Runt","RXR-like","SAND","SF-like","SRF","STAT","T-box","TEA","TF_bZIP","TF_Otx","THAP","THR-like","TSC22","Tub","ZBTB","zf-BED","zf-C2H2","zf-C2HC","blank","zf-GAGA","zf-GATA","blank","zf-MIZ","blank","blank"];
    var basic_domain=["AP-2","bHLH","Nrf1","RFX","TF_bZIP","TSC22"];
    var beta=["CBF","CP2","CSD","CSL","GCM","P53","RHD","Runt","STAT"];
    var helix=["ARID","COE","CUT","E2F","ETS","Fork_head","Homeobox","HPD","HSF","HTH","IRF","MYB","PAX","Pou","SRF","TEA","TF_Otx"];
    var alpha_helix=["GTF2I","HMG","NF-YA","NF-YB","NF-YC","SAND"];
    var unclass=["AF-4","CG-1","CTF/NFI","CSRNP","DACH","GCFC","HMGA","LRRFIP","MBD","MH1","NCU-G1","NDT80/PhoG","PC4","T-box","Others","Tub"];
    var zinc=["DM","ESR-like","GCNF-like","Miscellaneous","NGFIB-like","RXR-like","SF-like","THAP","THR-like","ZBTB","zf-BED","zf-C2H2","zf-C2HC","zf-GAGA","zf-GATA","zf-CCCH","zf-H2C2_2","zf-LITAF-like","zf-MIZ","zf-NF-X1"];
    var basic_domain_list=[];
    var beta_list=[];
    var helix_list=[];
    var alpha_list=[];
    var unclass_list=[];
    var zinc_list=[];
    for (var i=0;i<family.length;i++){
        var fa=family[i];
        if (basic_domain.indexOf(fa)>-1){
            basic_domain_list.push({"name":family[i],"figure":figure[i]})
        }
        if (beta.indexOf(fa)>-1){
            beta_list.push({"name":family[i],"figure":figure[i]})
        }
        if (helix.indexOf(fa)>-1){
            helix_list.push({"name":family[i],"figure":figure[i]})
        }
        if (alpha_helix.indexOf(fa)>-1){
            alpha_list.push({"name":family[i],"figure":figure[i]})
        }
        if (unclass.indexOf(fa)>-1){
            unclass_list.push({"name":family[i],"figure":figure[i]})
        }
        if (zinc.indexOf(fa)>-1){
            zinc_list.push({"name":family[i],"figure":figure[i]})
        }
    }
    $scope.basic_domain_list=basic_domain_list;
    $scope.beta_list=beta_list;
    $scope.helix_list=helix_list;
    $scope.alpha_list=alpha_list;
    $scope.unclass_list=unclass_list;
    $scope.zinc_list=zinc_list;
    var category={"Cell Cycle":["CENP","Cyclin"],"Chromatin Remodeling Factors":["Actin","ACTR","ANP","Bromodomain","CAMK","CCR4-NOT","CHD","Chromobox","Chromodomain Y","DPF","Histone cluster 1 H1","INO80 complex","MIER","Other_CRF","PHF","RBBP","SAP","Sirtuin","SMYD","SS18","SUPT","SWI/SNF","WD"],
        "Co-activator/repressors":["Casein","CITED","Coiled-coil","CREB","EID","EYA","LPIN","MAGE","MAML","Mediator complex","NFKB associated","Notch","Nuclear coactivator","Nuclear receptor coactivator","Other_Co-activator/repressors","Ring finger protein","RNA helicase","SKI","SLC","SSX","SUPT","Thyroid hormone receptor","Transcriptional adaptor","Vestigial like","Zinc finger"],
        "General Cofactors":["ELP","GTF","POLR","TATA-box","TEF"],"Histones Modify Enzymes":["Arginine methyltransferase","DNA_methylase","Histone deacetylase","Lysine acetyltransferase","Lysine demethylase","Lysine methyltransferase family"]
        ,"Other Cofactors":["Ankyrin repeat","ASCC","BCL","Erbb2","FAM","FGF","FHL","Heat shock protein","HIPK","HNRNP","ING","LIM","MBD","Nucleoplasmin","Others","PARP","PCGF","RNA binding protein","SET","Transducin","Tripartite motif","WW"]};
    var cell_cycle=category["Cell Cycle"];
    var chromatin=category["Chromatin Remodeling Factors"];
    var activator=category["Co-activator/repressors"];
    var general=category["General Cofactors"];
    var his=category["Histones Modify Enzymes"];
    var other=category["Other Cofactors"];
    var cell_cycle_list=[];
    var chromatin_list=[];
    var activator_list=[];
    var general_list=[];
    var his_list=[];
    var other_list=[];
    for(var i=0;i<cell_cycle.length;i++){
        cell_cycle_list.push({"family":cell_cycle[i]})
    }
     for(var i=0;i<chromatin.length;i++){
        chromatin_list.push({"family":chromatin[i]})
    }
     for(var i=0;i<activator.length;i++){
        activator_list.push({"family":activator[i]})
    }
     for(var i=0;i<general.length;i++){
        general_list.push({"family":general[i]})
    }
     for(var i=0;i<his.length;i++){
        his_list.push({"family":his[i]})
    }
     for(var i=0;i<other.length;i++){
        other_list.push({"family":other[i]})
    }
    $scope.cell_cycle_list=cell_cycle_list;
    $scope.chromatin_list=chromatin_list;
    $scope.activator_list=activator_list;
    $scope.general_list=general_list;
    $scope.his_list=his_list;
    $scope.other_list=other_list;
    console.log(general_list);
    //var cofactor_family=["Actin","ACTR","Ankyrin repeat","ANP","Arginine methyltransferase","ASCC","BCL","Bromodomain","CAMK","Casein","CCR4-NOT","CHD","Chromobox","Chromodomain Y","CITED","Coiled-coil","CREB","Cyclin","DEAD-box helicase","DEAH-box helicase","DNA_methylase","DPF","EID","ELL","ELP","Erbb2","EYA","FAM","FGF","FHL","GTF","Heat shock protein","High mobility group","HIPK","Histone cluster 1 H1","Histone deacetylase","Histone lysine methyltransferase","HNRNP","ING","INO80 complex","Interferon","Interleukin","LIM","LPIN","Lysine acetyltransferase","Lysine demethylase","Lysine methyltransferase","MAGE","MAGEA2B MAGE","MAML","MAPK","MBD","Mediator complex CRSP","MIER","MTA","MYC","NELF","NFKB associated","Notch","Nuclear factor","Nuclear receptor","Nucleoplasmin","Others","PARP","PHF","Proteasome","Protein kinase","Protein phosphatase","RBBP","Ribosomal protein","Ring finger protein","RNA binding protein","SAP","SET","Sirtuin","SMYD","SS18","SSX","SUPT","SWI/SNF","TATA-box","TEF","Thyroid hormone receptor","TOX","transcriptional adaptor","Transducin","Tripartite motif","Ubiquitin_associated","Vestigial like","VPS","WD","WW","Zinc finger"];
    var cofactor_family=["Actin","ACTR","Ankyrin repeat","ANP","Arginine methyltransferase","ASCC","BCL","Bromodomain","CAMK","Casein","CCR4-NOT","CENP","CHD","Chromobox","Chromodomain Y","CITED","Coiled-coil","CREB","Cyclin","DNA_methylase","DPF","EID","ELP","Erbb2","EYA","FAM","FGF","FHL","GTF","Heat shock protein","HIPK","Histone cluster 1 H1","Histone deacetylase","Histone lysine methyltransferase","HNRNP","ING","INO80 complex","LIM","LPIN","Lysine acetyltransferase","Lysine demethylase","Lysine methyltransferase","MAGE","MAML","MBD","Mediator complex","MIER","MYB","MYC","NFKB associated","Notch","Nuclear coactivator","Nuclear receptor coactivator","Nucleoplasmin","Other_Co-activator/repressors","Other_CRF","Others","PARP","PCGF","PHF","POLR","protein","RBBP","Ring finger protein","RNA binding protein","RNA helicase","SAP","SET","Sirtuin","SKI","SLC","SMYD","SS18","SSX","SUPT","SWI/SNF","TATA-box","TEF","Thyroid hormone receptor","Transcriptional adaptor","Transducin","Tripartite motif","Vestigial like","WD","WW","Zinc finger"];
    var cofactors_family_lst=[];
    for (var i=0;i<cofactor_family.length;i++){
        cofactors_family_lst.push({"family":cofactor_family[i]})
    }
    $scope.cofactors_family_list=cofactors_family_lst;
    var category=["Basic Domains Group","Beta-Scaffold Factors","Helix-turn-helix","Other Alpha-Helix Group","Unclassified Structure","Zinc-Coordinating Group"];
    $scope.fetch_family_count=function (item) {
        $scope.modal_header="Family: "+item["name"]+", click the bar for detail information.";
        var family_count=[];
        var species_array=[];
        var species="";
        var family=item["name"];
        $scope.family=family;
        $http({
            url: base_url + '/api/family_count',
            params: {family: family},
            method: 'GET'
        }).then(
            function (response) {
                console.log(response.data);
                $scope.loading=0;
                var family_count_list = response.data.count_list;
                $scope.family_count_list=family_count_list;
                for (var i=0;i<family_count_list.length;i++){
                    var temp=family_count_list[i];
                    species_array.push(temp["species"]);
                    family_count.push(Number(temp["count"]))
                }
                function onClick(params) {
                    species=params.name;
                    $scope.species=species;
                    window.open(base_url+"#!/tf_detail?species="+species+"&family="+family,"_blank")
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
                    calculable : true,
                    grid: {
                        bottom: '50%',
                        left:'5%',
                        right:'5%',
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
                                    label:{show:true,position:'outer',color:"blue",textStyle:{color:"#1E90FF",fontSize:10}},
                                    color:"#FF9999"
                                }
                            }
                        }
                    ]
                };
            }
        );

    };
    $("ul#cofactor_ul").on("click","li",function(){
       $scope.cofactor_click=1;

    });
    $scope.show_modal = function (item) {
        $window.open("#!/tf_summary?family="+item["name"],"_self")
    };
    $scope.show_tf=function () {
        $scope.tf_click=1;
        $scope.cofactor_click=0
    };
    $scope.show_cofactor=function () {
        $scope.tf_click=0;
        $scope.cofactor_click=1;
    }

    // var family="AF-4";
    // var species="Homo_sapiens";
    // $scope.species_title=species.split("_").join(" ");
    // $scope.family=family;
    // $scope.species=species;
    // $(document).ready(function () {
    //     $('#sidebarCollapse').on('click', function () {
    //         $('#sidebar').toggleClass('active');
    //     });
    // });
    // $("ul#family_ul").on("click","li",function(){
    //     console.log("family change");
    //     var s=$(this).text();
    //     var reg=/(\d\s)more|Less/;
    //     console.log(reg.test(s));
    //     if(!(reg.test(s))){
    //         $scope.family=s;
    //         family=s;
    //         $scope.fetch_tf();
    //         $scope.fetch_family_count()
    //     }
    // });
    // $scope.species_change=function () {
    //     var s=$("#species option:selected").text();
    //     var t=s.split(" ");
    //     species=t.join("_");
    //     $scope.species=species;
    //     $scope.species_title=s;
    //     $scope.fetch_tf();
    // };
    // $scope.show_more=function (para) {
    //     switch (para){
    //         case 1:
    //             $scope.one=1;
    //             break;
    //         case 2:
    //             $scope.two=1;
    //             break;
    //         case 3:
    //             $scope.three=1;
    //             break;
    //         case 4:
    //             $scope.four=1;
    //             break;
    //         case 5:
    //             $scope.five=1;
    //             break;
    //         case 6:
    //             $scope.six=1;
    //             break;
    //     }
    // };
    // $scope.show_less=function (para) {
    //     switch (para){
    //         case 1:
    //             $scope.one=0;
    //             break;
    //         case 2:
    //             $scope.two=0;
    //             break;
    //         case 3:
    //             $scope.three=0;
    //             break;
    //         case 4:
    //             $scope.four=0;
    //             break;
    //         case 5:
    //             $scope.five=0;
    //             break;
    //         case 6:
    //             $scope.six=0;
    //             break;
    //     }
    // };
    // $scope.fetch_tf=function () {
    //     $http({
    //         url: base_url+'/api/tf_annotaion',
    //         params: {"family":family,"species":species},
    //         method: 'GET'
    //     }).then(
    //         function success(response) {
    //             $scope.tf_zero=0;
    //             console.log(response.data);
    //             $scope.tf_list = response.data.tf_list;
    //             var arr=response.data.tf_list;
    //             $scope.tf_count=arr.length;
    //             $scope.dbd=response.data.family_DBD;
    //             $scope.id=response.data.family_ID;
    //             var id=response.data.family_ID;
    //             var reg=/PF/;
    //             var reg1=/IPR/;
    //             var reg2=/self/;
    //             console.log(reg.test(id));
    //             if (reg.test(id)){
    //                 $scope.link_tag=1
    //             }
    //             if(reg1.test(id)){
    //                 $scope.sing_tag=1
    //             }
    //             if(reg2.test(id)){
    //                 $scope.self_tag=1
    //             }
    //             if (arr.length==0){
    //                 $scope.tf_zero=1;
    //             }
    //         });
    // };
    // $scope.fetch_tf();
    // $scope.show_modal = function (item) {
    //     // $scope.target = item;
    // };
    // $scope.fetch_family_count=function () {
    //     var family_count=[];
    //     var species_array=[];
    //     $http({
    //         url: base_url + '/api/family_count',
    //         params: {family: family},
    //         method: 'GET'
    //     }).then(
    //         function (response) {
    //             console.log(response.data);
    //             var myChart = echarts.init(document.getElementById('barchart'));
    //             var family_count_list = response.data.count_list;
    //             for (var i=0;i<family_count_list.length;i++){
    //                 var temp=family_count_list[i];
    //                 species_array.push(temp["species"]);
    //                 family_count.push(Number(temp["count"]))
    //             }
    //             function onClick(params) {
    //                 species=params.name;
    //                 $scope.species=species;
    //                 $scope.fetch_tf();
    //             };
    //             $scope.lineConfig = {
    //                 theme: 'default',
    //                 event: [{click: onClick}],
    //                 dataLoaded: true
    //             };
    //             $scope.lineOption={
    //                 title : {
    //                     text: "TF count"
    //                 },
    //                 tooltip : {
    //                     trigger: 'axis',
    //                     position:function(p){   //其中p为当前鼠标的位置
    //                         return [p[0]-300, p[1]-500];
    //                     }
    //                 },
    //                 toolbox: {
    //                     show : true,
    //                     feature : {
    //                         magicType : {show: true, type: ['line', 'bar']},
    //                         restore : {show: true},
    //                         saveAsImage : {show: true}
    //                     }
    //                 },
    //                 calculable : true,
    //                 grid: {
    //                     bottom: '50%',
    //                     left:'5%',
    //                     right:'5%',
    //                     containLabel: true
    //                 },
    //
    //                 xAxis : [
    //                     {
    //                         axisLabel: {rotate:60,interval:0},
    //                         type : 'category',
    //                         data : species_array
    //                     }
    //                 ],
    //                 yAxis : [
    //                     {
    //                         type : 'value'
    //                     }
    //                 ],
    //                 series : [
    //                     {
    //                         name:'TF count',
    //                         type:'bar',
    //                         barGap:20,
    //                         data:family_count,
    //
    //
    //                         itemStyle: {
    //                             normal: {
    //                                 label:{show:true,position:'outer',color:"blue",textStyle:{color:"#1E90FF"}},
    //                                 color:"#FF9999"
    //                             }
    //                         }
    //                     }
    //                 ]
    //             };
    //              window.onresize = myChart.resize;
    //         }
    //     );
    //
    // };
    // $scope.fetch_family_count()

}
