"use strict";

angular.module('AnimalTFDB3')
    .controller('GeneInfoController', GeneInfoController)
    .controller('PPINetworkController', PPINeworkController)

function GeneInfoController($scope,$http,$window,AnimalTFDBservice,$routeParams,$location, $anchorScroll) {
    console.log("GeneInfoController loaded");
    var screen_width= document.body.clientWidth;
    $("[data-toggle='popover']").popover();
    $scope.ratio = (screen_width-400)/1600;
    document.getElementById("cancer_chart").style.width = screen_width-400 + "px";
    document.getElementById("cellline_chart").style.width = screen_width-400 + "px";
    document.getElementById("ebi_tissue_chart").style.width = screen_width-400 + "px";
    document.getElementById("bgee_chart").style.width = screen_width-400 + "px";
    document.getElementById("pubmed_cellline_chart").style.width = screen_width-400 + "px";
    document.getElementById("pubmed_celltype_chart").style.width = screen_width-400 + "px";
    document.getElementById("pubmed_tissue_chart").style.width = screen_width-400 + "px";
    document.getElementById("pubmed_time_chart").style.width = screen_width-400 + "px";
    document.getElementById("protein_chart").style.width = screen_width-400 + "px";
    $scope.loading=1;
    $scope.cofactors=0;
    var gene=$routeParams.tf;
    $scope.ensembl_id=$routeParams.tf;
    var species="";
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var bgee=0;
    var cellline=0;
    var tissue=0;
    var tcga=0;
    var protein=0;
    $scope.gene=gene;
    $scope.goto_target=function(tag){
        var newHash = tag;
        var id = $location.hash();
        if ($location.hash() !== newHash) {
            $location.hash(tag);
            $anchorScroll();
            $location.hash(id);
        } else {
            $anchorScroll();
        }
    }
    $scope.fetch_domain=function () {
        $http({
            url: base_url+'/api/domain',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                var temp=response.data.domain_list;
                console.log(response.data);
                if (temp.length>0){
                    var protein=temp[0]["protein"];
                    $scope.fetch_domain_structure(protein);
                    $scope.domain_list=response.data.domain_list;
                }
            });

    };
    $scope.fetch_go=function () {
        $http({
            url: base_url+'/api/go',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.go_list=response.data.go_list;
            });

    };
    $scope.fetch_pathway=function (species) {
        $http({
            url: base_url+'/api/pathway',
            params: {"ensembl":gene,"species":species},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.pathway_list=response.data.pathway_list;
                var pathway_list=response.data.pathway_list;
                var pathway_height=pathway_list.length *35+50;
                if (pathway_height>500){
                    pathway_height=500
                }
                $scope.pathway_height=pathway_height;
            });

    };
    $scope.fetch_ppi=function () {
        $http({
            url: base_url+'/api/ppi',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                var ppi_list=response.data.ppi_list;
                $scope.ppi_list=ppi_list;
                var ppi_height=ppi_list.length *35+50;
                if (ppi_height>500){
                    ppi_height=500
                }
                $scope.ppi_height=ppi_height;
            });
    };
    $scope.fetch_ortholog=function () {
        $http({
            url: base_url+'/api/ortholog',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                console.log("ortholog query")
                $scope.ortholog_list=response.data.ortholog_list;
            });

    };
    $scope.fetch_paralog=function () {
        $http({
            url: base_url+'/api/paralog',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.paralog_list=response.data.paralog_list;
            });

    };
    $scope.fetch_phenotype=function () {
        $http({
            url: base_url+'/api/phenotype',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.phenotype_list=response.data.phenotype_list;
                var temp=response.data.phenotype_list;
                var phenotype_height=temp.length *35+50;
                if (phenotype_height>500){
                    phenotype_height=500
                }
                $scope.phenotype_height=phenotype_height;
            });

    };
    $scope.fetch_tfbs=function () {
        $http({
            url: base_url+'/api/tfbs',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.tfbs_list=response.data.tfbs_list;
            });


    }
    $scope.fetch_annotation=function () {
        $http({
            url: base_url+'/api/annotation',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                var temp=response.data.annotation_list;
                if(temp) {
                    if (temp[0]["summary"]=="0"){
                        temp[0]["summary"]=0
                    }
                    if (temp[0]["gene_id"]=="0"){
                        temp[0]["gene_id"]="-"
                    }
                    if (!(temp[0]["alia"])){
                        temp[0]["alia"]="-"
                    }
                    if (temp[0]["fullname"]=="0"){
                        temp[0]["fullname"]="-"
                    }
                    $scope.tf = temp[0];
                }
            });
    };
    $scope.fetch_transcript=function () {
        $http({
            url: base_url+'/api/transcript',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                $scope.transcript_list=response.data.transcript_list;
            });

    };
    $scope.fetch_expression=function () {
        $http({
            url: base_url+'/api/expression',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                var bgee_exp=response.data.bgee_exp;
                var ebi_cellline=response.data.ebi_cellline;
                var ebi_tissue=response.data.ebi_tissue;
                var tcga_exp=response.data.tcga_exp;
                var protein_exp=response.data.protein_exp;
                var protein_ls=response.data.protein_ls;
                var pubmed_exp=response.data.pubmed_exp;
                $scope.protein_ls=protein_ls;
                $scope.plot(bgee_exp,ebi_cellline,ebi_tissue,pubmed_exp,tcga_exp,protein_exp,protein_ls);
            });

    };
    $scope.fetch_gwas=function () {
        $http({
            url: base_url+'/api/gwas',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log("hello gwas");
                console.log(response.data);
                $scope.gwas_list=response.data.gwas_list;
                var gwas_list=response.data.gwas_list;
                var gwas_height=gwas_list.length *35+50;
                if (gwas_height>500) {
                    gwas_height = 500
                }
                $scope.gwas_height=gwas_height;
            });
    };
    $scope.fetch_structure=function () {
        $http({
            url: base_url+'/api/structure',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                var line=response.data.line;
                console.log(line.length);
                var svg_height=16*(line.length)+10;
                $scope.svg_height=svg_height;
                console.log(svg_height);
                $scope.line=response.data.line;
                var scale=response.data.scale;
                for (var i=0;i<scale.length;i++){
                    var temp=scale[i];
                    scale[i]["num"]=Number(temp["num"]).toFixed(4);
                }
                $scope.scale=scale;
                $scope.transcript=response.data.transcript;
                $scope.structure=response.data.structure;
            });
    };
    $scope.fetch_domain_structure=function (protein) {
        $http({
            url: base_url+'/api/domain_structure',
            params: {"protein":protein},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                var line=response.data.line;
                var svg_height=20*line.length;
                $scope.domain_svg_height=svg_height;
                $scope.domain_line=response.data.line;
                var scale=response.data.scale;
                for (var i=0;i<scale.length;i++){
                    var temp=scale[i];
                    scale[i]["num"]=Number(temp["num"]).toFixed(1);
                }
                $scope.domain_scale=scale;
                $scope.domain_pfam=response.data.pfam;
                $scope.domain_structure=response.data.structure;
            });
    };
    $scope.plot=function (bgee_exp,ebi_cellline,ebi_tissue,pubmed_exp,tcga_exp,protein_exp,protein_ls) {
        var bgee=0;
        var cellline=0;
        var tissue=0;
        var tcga=0;
        var exp_tag=0;
        var pubmed_cellline=0;
        var pubmed_celltype=0;
        var pubmed_tissue=0;
        var pubmed_time=0;
        var cellline_array=[];
        var cellline_exp=[];
        var celltype_array=[];
        var celltype_exp=[];
        var tissue_array=[];
        var tissue_exp=[];
        var time_array=[];
        var time_exp=[];
        if(pubmed_exp.length>0){
            for(var i=0;i<pubmed_exp.length;i++){
                var temp=pubmed_exp[i];
                var type=temp["types"];
                if (type=="cell lines"){
                    cellline_array.push(temp["tissue"]);
                    cellline_exp.push(Number(temp["exp"]).toFixed(2));
                }
                if (type=="cell types"){
                    celltype_array.push(temp["tissue"]);
                    celltype_exp.push(Number(temp["exp"]).toFixed(1));
                }
                if(type=="normal tissues"){
                    tissue_array.push(temp["tissue"]);
                    tissue_exp.push(Number(temp["exp"]).toFixed(1));
                }
                if(type=="time course"){
                    time_array.push(temp["tissue"]);
                    time_exp.push(Number(temp["exp"]).toFixed(1));
                }
            }
            if(cellline_array.length>0){
                $scope.pubmed_cellline=1        
                pubmed_cellline=1        
                $scope.pubmed_cellline_config={
                    theme: 'default',
                    dataLoaded: true
                }
                $scope.pubmed_cellline_option={
                    title:{
                    show:false
                },
                calculable : true,
                grid: {
                    bottom: '30%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : cellline_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:cellline_exp,
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
            if(celltype_array.length>0){
		$scope.pubmed_celltype=1
                pubmed_celltype=1
                console.log(celltype_exp);
                $scope.pubmed_celltype_config={
                    theme: 'default',
                    dataLoaded: true
                }

                $scope.pubmed_celltype_option={
                    title:{
                    show:false
                },
                calculable : true,
                grid: {
                    bottom: '35%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : celltype_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:celltype_exp,
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
            if(tissue_array.length>0){
                $scope.pubmed_tissue=1
                pubmed_tissue=1
                $scope.pubmed_tissue_config={
                    theme: 'default',
                    dataLoaded: true
                }
                $scope.pubmed_tissue_option={
                    title:{
                    show:false
                },
                calculable : true,
                grid: {
                    bottom: '30%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:tissue_exp,
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
            if(time_array.length>0){
                $scope.pubmed_time=1
                console.log(time_exp);
                pubmed_time=1
                $scope.pubmed_time_config={
                    theme: 'default',
                    dataLoaded: true
                }
                $scope.pubmed_time_option={
                    title:{
                    show:false
                },
                calculable : true,
                grid: {
                    bottom: '20%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : time_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:time_exp,
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
}
        if(bgee_exp.length>0){
            $scope.bgee=1;
            bgee=1;
            var tissue_array=[];
            var exp=[];
            for (var i=0;i<bgee_exp.length;i++){
                var temp=bgee_exp[i];
                tissue_array.push(temp["tissue"]);
                exp.push(Number(temp["exp"]).toFixed(1))
            }
            $scope.lineConfig_bgee = {
                theme: 'default',
                dataLoaded: true
            };
            $scope.lineOption_bgee={
                title:{
                    show:false
                },
                calculable : true,
                grid: {
                    bottom: '30%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'Normalized count'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:exp,
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
        if(ebi_cellline.length>0){
            var tissue_array=[];
            var exp=[];
            $scope.cellline=1;
            var cellline=1;
            console.log("cellline");
            console.log(cellline);
            for (var i=0;i<ebi_cellline.length;i++){
                var temp=ebi_cellline[i];
                tissue_array.push(temp["tissue"]);
                exp.push(Number(temp["exp"]).toFixed(1))
            }
            $scope.lineConfig_cellline= {
                theme: 'default',
                dataLoaded: true
            };
            $scope.lineOption_cellline={
                calculable : true,
                grid: {
                    bottom: '45%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:50,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barWidth: 15,
                        data:exp,
                        itemStyle: {
                            normal: {
                                label:{show:true,position:'outer',color:"blue",textStyle:{color:"#1E90FF",fontSize:8}},
                                color:"#FF9999"
                            }
                        }
                    }
                ]
            }
        }
        if(ebi_tissue.length>0){
            var tissue_array=[];
            var exp=[];
            $scope.tissue=1;
            var tissue=1;
            console.log("tissue");
            console.log(tissue);
            for (var i=0;i<ebi_tissue.length;i++){
                var temp=ebi_tissue[i];
                tissue_array.push(temp["tissue"]);
                exp.push(Number(temp["exp"]).toFixed(1))
            }
            $scope.lineConfig_tissue = {
                theme: 'default',
                dataLoaded: true
            };
            $scope.lineOption_tissue={
                calculable : true,
                grid: {
                    bottom: '25%',
                    right:'5%',
                    left:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'FPKM',
                        barWidth:'10'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:exp,
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
        if(tcga_exp.length>0){
            var tissue_array=[];
            var exp=[];
            $scope.tcga=1;
            var tcga=1;
            console.log("tcga");
            console.log(tcga);
            for (var i=0;i<tcga_exp.length;i++){
                var temp=tcga_exp[i];
                tissue_array.push(temp["tissue"]);
                exp.push(Number(temp["exp"]).toFixed(1))
            }
            $scope.lineConfig_tcga = {
                theme: 'default',
                dataLoaded: true
            };
            $scope.lineOption_tcga={
                calculable : true,
                grid: {
                    bottom: '20%',
                    right:'5%',
                    left:'5%',
                    containLabel: true
                },
                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'RSEM'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:exp,
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
        if(protein_exp.length>0){
            $scope.protein=1;
            protein=1;
            var tissue_array=[];
            var exp=[];
            var l=protein_ls.length;
            if (l>1){
                console.log("hello");
                console.log(l);
                $scope.multi=1;
                var pro=protein_ls[0]["protein"];
                for (var i=0;i<protein_exp.length;i++){
                    var temp=protein_exp[i];
                    if (temp["protein"]==pro){
                        tissue_array.push(temp["tissue"]);
                        exp.push(Number(temp["exp"]).toFixed(1))
                    }
                }
            }else{
                $scope.multi=0;
                for (var i=0;i<protein_exp.length;i++){
                    var temp=protein_exp[i];
                    tissue_array.push(temp["tissue"]);
                    exp.push(Number(temp["exp"]).toFixed(1))
                }
            }
            $scope.lineConfig_protein = {
                theme: 'default',
                dataLoaded: true
            };
            $scope.lineOption_protein={
                calculable : true,
                grid: {
                    bottom: '30%',
                    left:'5%',
                    right:'5%',
                    containLabel: true
                },

                xAxis : [
                    {
                        axisLabel: {rotate:60,interval:0},
                        type : 'category',
                        data : tissue_array
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'iBAQ'
                    }
                ],
                series : [
                    {
                        name:'expression',
                        type:'bar',
                        barGap:20,
                        data:exp,
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
        exp_tag=bgee+cellline+tissue+tcga+protein+pubmed_cellline+pubmed_celltype+pubmed_tissue+pubmed_time;
        $scope.exp_tag=exp_tag;
    };
    $scope.fetch_tf=function (url) {
        $http({
            url: base_url+url,
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                var tf_info=response.data.tf_list;
                var tf;
                if (tf_info.length>0){
                    tf=tf_info[0];
                    $scope.loading=0;
                    $scope.evidence=tf["evidence"];
                    $scope.item=tf;
                    $scope.species_title=tf["species"].split("_").join(" ");
                    $scope.species=tf["species"];
                    console.log("species");
                    species=tf["species"];
                    console.log(species);
                    $scope.family=tf["family"];
                    $scope.fetch_annotation();
                    $scope.fetch_transcript();
                    $scope.fetch_domain();
                    $scope.fetch_go();
                    $scope.fetch_pathway(species);
                    $scope.fetch_ppi();
                    $scope.fetch_ortholog();
                    $scope.fetch_paralog();
                    $scope.fetch_tfbs();
                    $scope.fetch_phenotype();
                    $scope.fetch_expression();
                    $scope.fetch_gwas();
                    $scope.fetch_structure();
                }else{
                    $scope.no_item=1;
                }
            });
    };
    if($routeParams.cofactors){
        $scope.cofactors=1;
        $scope.fetch_tf('/api/tf_cofactors_annotaion');
    }else{
        $scope.fetch_tf('/api/tf_annotaion')
    }
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper_doc").toggleClass("active");
    });

    // $scope.draw_ppi=function (ppi_list) {
    //     coarnsole.log("draw ppi");
    //     var group_ray = [];
    //     group_array.push({group: "nodes", data: {id: ppi_list[0]["symbol"]},position:{x:100, y:100} });
    //     var source = ppi_list[0]["symbol"];
    //     for (var i = 0; i < ppi_list.length; i++) {
    //         var id = ppi_list[i]["interactor_symbol"];
    //         group_array.push({group: "nodes", data: {id: id}});
    //         group_array.push({group: "edges", data: {id: "e"+i, source: source, target: id}});
    //     }
    //     console.log(group_array);
    //     var cy = cytoscape({
    //         container:$('#cy'),
    //         elements:[ { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
    //             { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
    //             { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }],
    //         // so we can see the ids
    //         style: [
    //             {
    //                 selector: 'hub',
    //                 css: {
    //                     'content': 'data(id)',
    //                     'background-color':"#FF9999"
    //                 }
    //             },
    //              {
    //                 selector: 'tf',
    //                 css: {
    //                     'content': 'data(id)',
    //                     'background-color':"#1E90FF"
    //                 }
    //             },
    //              {
    //                 selector: 'cofactor',
    //                 css: {
    //                     'content': 'data(id)',
    //                     'background-color':"#EAF048"
    //                 }
    //             },
    //
    //
    //
    //             {
    //                 selector: 'edge',
    //                 css: {
    //                     'width': 3,
    //                     'line-color': '#FF9999',
    //                 }
    //             }
    //         ]
    //     });
    // }

};
function PPINeworkController($scope,$http,$window,AnimalTFDBservice,$routeParams){
    var gene=$routeParams.gene;
    $scope.gene=gene;
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    $scope.fetch_ppi=function () {
        $http({
            url: base_url+'/api/ppi',
            params: {"ensembl":gene},
            method: 'GET'
        }).then(
            function success(response) {
                console.log(response.data);
                var ppi_list=response.data.ppi_list;
                $scope.ppi_list=ppi_list;
                var group_array = [];
                // var screen_width= document.body.clientWidth;
                // document.getElementById("cy").style.width = screen_width + "px";
                var hub=ppi_list[0]["symbol"];
                $scope.gene_symbol=hub;
                group_array.push({group: "nodes", data: {id:hub,name:"hub" } });
                var source = ppi_list[0]["symbol"];
                for (var i = 0; i < ppi_list.length; i++) {
                    var id = ppi_list[i]["interactor_symbol"];
                    if (ppi_list[i]["tag"]=="tf"){
                        group_array.push({group: "nodes", data: {name:"tf", id:id}});
                    };
                    if (ppi_list[i]["tag"]=="none"){
                        group_array.push({group: "nodes", data: {id:id,name:"others"}});

                    }
                    group_array.push({group: "edges", data: {id: "e"+i, source: source, target: id}});

                }
                console.log(group_array);
                var cy = cytoscape({
                    container:$('#cy'),
                    elements:group_array,
                    style: cytoscape.stylesheet()
                        .selector('node[name="hub"]')
                        .css({
                            'content': 'data(id)',
                            'background-color':"#FFB8B8"
                        })
                        .selector('node[name="tf"]')
                        .css({
                            'content': 'data(id)',
                            'background-color':"#FAAE4E"
                        })
                        .selector('node[name="others"]')
                        .css({
                            'content': 'data(id)',
                            'background-color':"#96C4E6"
                        })
                        .selector('edge')
                        .css({
                            'width': 0.5,
                            'line-color': '#214579',
                        })
                    // so we can see the ids
                });
                var layout= cy.layout({
                    name: 'cose',

                    // Called on `layoutready`
                    ready: function(){},

                    // Called on `layoutstop`
                    stop: function(){},

                    // Whether to animate while running the layout
                    // true : Animate continuously as the layout is running
                    // false : Just show the end result
                    // 'end' : Animate with the end result, from the initial positions to the end positions
                    animate: true,

                    // Easing of the animation for animate:'end'
                    animationEasing: undefined,

                    // The duration of the animation for animate:'end'
                    animationDuration: undefined,

                    // A function that determines whether the node should be animated
                    // All nodes animated by default on animate enabled
                    // Non-animated nodes are positioned immediately when the layout starts
                    animateFilter: function ( node, i ){ return true; },


                    // The layout animates only after this many milliseconds for animate:true
                    // (prevents flashing on fast runs)
                    animationThreshold: 250,

                    // Number of iterations between consecutive screen positions update
                    // (0 -> only updated on the end)
                    refresh: 20,

                    // Whether to fit the network view after when done
                    fit: true,

                    // Padding on fit
                    padding: 30,

                    // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                    boundingBox: undefined,

                    // Excludes the label when calculating node bounding boxes for the layout algorithm
                    nodeDimensionsIncludeLabels: false,

                    // Randomize the initial positions of the nodes (true) or use existing positions (false)
                    randomize: false,

                    // Extra spacing between components in non-compound graphs
                    componentSpacing: 40,

                    // Node repulsion (non overlapping) multiplier
                    nodeRepulsion: function( node ){ return 2048; },

                    // Node repulsion (overlapping) multiplier
                    nodeOverlap: 4,

                    // Ideal edge (non nested) length
                    idealEdgeLength: function( edge ){ return 32; },

                    // Divisor to compute edge forces
                    edgeElasticity: function( edge ){ return 32; },

                    // Nesting factor (multiplier) to compute ideal edge length for nested edges
                    nestingFactor: 1.2,

                    // Gravity force (constant)
                    gravity: 1,

                    // Maximum number of iterations to perform
                    numIter: 1000,

                    // Initial temperature (maximum node displacement)
                    initialTemp: 1000,

                    // Cooling factor (how the temperature is reduced between consecutive iterations
                    coolingFactor: 0.99,

                    // Lower temperature threshold (below this point the layout will end)
                    minTemp: 1.0,

                    // Pass a reference to weaver to use threads for calculations
                    weaver: false
                    // name: 'circle',
                    // fit: true, // whether to fit the viewport to the graph
                    // ready: undefined, // callback on layoutready
                    // stop: undefined, // callback on layoutstop
                    // rStepSize: 10, // the step size for increasing the radius if the nodes don't fit on screen
                    // padding: 30, // the padding on fit
                    // startAngle: 3/2 * Math.PI, // the position of the first node
                    // counterclockwise: false // whether the layout should go counterclockwise (true) or clockwise (false)


                    // fit: true, // whether to fit the viewport to the graph
                    // padding: 30, // the padding on fit
                    // startAngle: 3 / 2 * Math.PI, // where nodes start in radians
                    // sweep: undefined// how many radians should be between the first and last node (defaults to full circle)
                    // clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
                    // equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
                    // minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
                    // boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                    // avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
                    // nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
                    // height: undefined, // height of layout area (overrides container height)
                    // width: undefined, // width of layout area (overrides container width)
                    // spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
                    // concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
                    // return node.degree();
                    // },
                    // levelWidth: function( nodes ){ // the letiation of concentric values in each level
                    // return nodes.maxDegree() / 4;
                    // },
                    // animate: false, // whether to transition the node positions
                    // animationDuration: 500, // duration of animation in ms if enabled
                    // animationEasing: undefined, // easing of animation if enabled
                    // animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
                    // ready: undefined, // callback on layoutready
                    // stop: undefined, // callback on layoutstop
                    // transform: function (node, position ){ return position; }
                });
                layout.run();
            });
    };
    $scope.fetch_ppi();


}
