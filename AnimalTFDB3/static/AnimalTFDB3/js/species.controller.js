
"use strict";

angular.module('AnimalTFDB3')
    .controller('SpeciesController', SpeciesController)
    .controller('SpeciesSummaryController', SpeciesSummaryController);


function SpeciesController($scope,$http,$window,AnimalTFDBservice) {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper_doc").toggleClass("active");
    });
    $scope.loading=1;
    console.log("species load");
    $("[data-toggle='popover']").popover();
    var screen_heigth= window.screen.height;
    var pic=document.getElementById("title_pic");
    var nav=document.getElementById("home_nav");
    var pic_height=window.getComputedStyle(pic).height.split("px")[0];
    var nav_height=window.getComputedStyle(nav).height.split("px")[0];
    console.log(screen_heigth);
    console.log(pic_height);
    console.log(nav_height);
    document.getElementById("sidebar-wrapper_doc").style.height = screen_heigth-pic_height-nav_height-160 + "px";
    console.log(screen_heigth-pic_height-nav_height-100 );

    //console.log(document.getElementById("home_nav").style.height);
    // document.getElementById("sidebar_barchart").style.width = screen_width-400 + "px";
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var species_list=[];
    var name=["Homo_sapiens(Human)","Mus_musculus(Mouse)","Rattus_norvegicus(Rat)","Drosophila_melanogaster(Fruitfly)","Danio_rerio(Zebrafish)","Caenorhabditis_elegans(C. elegans)",,"Ailuropoda_melanoleuca(Panda)","Anas_platyrhynchos(Duck)","Anolis_carolinensis(Anole lizard)","Aotus_nancymaae(Ma's night monkey)","Astyanax_mexicanus(Cave fish)","Bos_taurus(Cow)","Caenorhabditis_elegans(C. elegans)","Callithrix_jacchus(Marmoset)","Canis_familiaris(Dog)","Capra_hircus(Goat)","Carlito_syrichta(Tarsier)","Cavia_aperea(Brazilian guinea pig)","Cavia_porcellus(Guinea Pig)","Cebus_capucinus(Capuchin)","Cercocebus_atys(Sooty mangabey)","Chinchilla_lanigera(Long-tailed chinchilla)","Chlorocebus_sabaeus(Vervet-AGM)","Choloepus_hoffmanni(Sloth)","Ciona_intestinalis(C.intestinalis)","Ciona_savignyi(C.savignyi)","Colobus_angolensis_palliatus(Angola colobus)","Cricetulus_griseus_chok1gshd(Chinese hamster CHOK1GS)","Cricetulus_griseus_crigri(Chinese hamster CriGri)","Dasypus_novemcinctus(Armadillo)","Dipodomys_ordii(Kangaroo rat)","Echinops_telfairi(Lesser hedgehog tenrec)","Equus_caballus(Horse)","Erinaceus_europaeus(Hedgehog)","Felis_catus(Cat)","Ficedula_albicollis(Flycatcher)","Fukomys_damarensis(Damara mole rat)","Gadus_morhua(Cod)","Gallus_gallus(Chicken)","Gasterosteus_aculeatus(Stickleback)","Gorilla_gorilla(Gorilla)","Heterocephalus_glaber_female(Naked mole-rat female)","Heterocephalus_glaber_male(Naked mole-rat male)","Ictidomys_tridecemlineatus(Squirrel)","Jaculus_jaculus(Lesser Egyptian jerboa)","Latimeria_chalumnae(Coelacanth)","Lepisosteus_oculatus(Spotted gar)","Loxodonta_africana(Elephant)","Macaca_fascicularis(Crab-eating macaque)","Macaca_mulatta(Macaque)","Macaca_nemestrina(Pig-tailed macaque)","Mandrillus_leucophaeus(Drill)","Meleagris_gallopavo(Turkey)","Mesocricetus_auratus(Golden Hamster)","Microcebus_murinus(Mouse Lemur)","Microtus_ochrogaster(Prairie vole)","Monodelphis_domestica(Opossum)","Mus_caroli(Ryukyu mouse)","Mus_pahari(Shrew mouse)","Mus_spretus(Algerian mouse)","Mustela_putorius_furo(Ferret)","Myotis_lucifugus(Microbat)","Nannospalax_galili(Upper Galilee mountains blind mole rat)","Nomascus_leucogenys(Gibbon)","Notamacropus_eugenii(Wallaby)","Ochotona_princeps(Pika)","Octodon_degus(Degu)","Oreochromis_niloticus(Tilapia)","Ornithorhynchus_anatinus(Platypus)","Oryctolagus_cuniculus(Rabbit)","Oryzias_latipes(Medaka)","Otolemur_garnettii(Bushbaby)","Ovis_aries(Sheep)","Pan_paniscus(Bonobo)","Pan_troglodytes(Chimpanzee)","Papio_anubis(Olive baboon)","Pelodiscus_sinensis(Chinese softshell turtle)","Peromyscus_maniculatus_bairdii(Northern American deer mouse)","Petromyzon_marinus(Lamprey)","Poecilia_formosa(Amazon molly)","Pongo_abelii(Orangutan)","Procavia_capensis(Hyrax)","Propithecus_coquereli(Coquerel's sifaka)","Pteropus_vampyrus(Megabat)","Rhinopithecus_bieti(Black snub-nosed monkey)","Rhinopithecus_roxellana(Golden snub-nosed monkey)","Saimiri_boliviensis_boliviensis(Bolivian squirrel monkey)","Sarcophilus_harrisii(Tasmanian devil)","Sorex_araneus(Shrew)","Sus_scrofa(Pig)","Taeniopygia_guttata(Zebra Finch)","Takifugu_rubripes(Fugu)","Tetraodon_nigroviridis(Tetraodon)","Tupaia_belangeri(Tree Shrew)","Tursiops_truncatus(Dolphin)","Vicugna_pacos(Alpaca)","Xenopus_tropicalis(Xenopus)","Xiphophorus_maculatus];(Platyfish)"];
    var species=["Homo_sapiens","Mus_musculus","Rattus_norvegicus","Drosophila_melanogaster","Danio_rerio","Caenorhabditis_elegans","Ailuropoda_melanoleuca","Anas_platyrhynchos","Anolis_carolinensis","Aotus_nancymaae","Astyanax_mexicanus","Bos_taurus","Caenorhabditis_elegans","Callithrix_jacchus","Canis_familiaris","Capra_hircus","Carlito_syrichta","Cavia_aperea","Cavia_porcellus","Cebus_capucinus","Cercocebus_atys","Chinchilla_lanigera","Chlorocebus_sabaeus","Choloepus_hoffmanni","Ciona_intestinalis","Ciona_savignyi","Colobus_angolensis_palliatus","Cricetulus_griseus_chok1gshd","Cricetulus_griseus_crigri","Dasypus_novemcinctus","Dipodomys_ordii","Echinops_telfairi","Equus_caballus","Erinaceus_europaeus","Felis_catus","Ficedula_albicollis","Fukomys_damarensis","Gadus_morhua","Gallus_gallus","Gasterosteus_aculeatus","Gorilla_gorilla","Heterocephalus_glaber_female","Heterocephalus_glaber_male","Ictidomys_tridecemlineatus","Jaculus_jaculus","Latimeria_chalumnae","Lepisosteus_oculatus","Loxodonta_africana","Macaca_fascicularis","Macaca_mulatta","Macaca_nemestrina","Mandrillus_leucophaeus","Meleagris_gallopavo","Mesocricetus_auratus","Microcebus_murinus","Microtus_ochrogaster","Monodelphis_domestica","Mus_caroli","Mus_pahari","Mus_spretus","Mustela_putorius_furo","Myotis_lucifugus","Nannospalax_galili","Nomascus_leucogenys","Notamacropus_eugenii","Ochotona_princeps","Octodon_degus","Oreochromis_niloticus","Ornithorhynchus_anatinus","Oryctolagus_cuniculus","Oryzias_latipes","Otolemur_garnettii","Ovis_aries","Pan_paniscus","Pan_troglodytes","Papio_anubis","Pelodiscus_sinensis","Peromyscus_maniculatus_bairdii","Petromyzon_marinus","Poecilia_formosa","Pongo_abelii","Procavia_capensis","Propithecus_coquereli","Pteropus_vampyrus","Rhinopithecus_bieti","Rhinopithecus_roxellana","Saimiri_boliviensis_boliviensis","Sarcophilus_harrisii","Sorex_araneus","Sus_scrofa","Taeniopygia_guttata","Takifugu_rubripes","Tetraodon_nigroviridis","Tupaia_belangeri","Tursiops_truncatus","Vicugna_pacos","Xenopus_tropicalis","Xiphophorus_maculatus"];
    var favo_name=["Homo sapiens(Human)","Mus musculus(Mouse)","Rattus norvegicus(Rat)","Danio rerio(Zebrafish)","Macaca mulatta(Macaque)","Drosophila melanogaster(Fruitfly)","Caenorhabditis elegans(C. elegans)"];
    var favo_species=["Homo sapiens","Mus musculus","Rattus norvegicus","Danio rerio","Macaca mulatta","Drosophila melanogaster","Caenorhabditis elegans"];
    var primates_name=["Aotus nancymaae(Ma's night monkey)","Callithrix jacchus(Marmoset)","Carlito syrichta(Tarsier)","Cebus capucinus(Capuchin)","Cercocebus atys(Sooty mangabey)","Chlorocebus sabaeus(Vervet-AGM)","Colobus angolensis palliatus(Angola colobus)","Gorilla gorilla(Gorilla)","Homo sapiens(Human)","Macaca fascicularis(Crab-eating macaque)","Macaca mulatta(Macaque)","Macaca nemestrina(Pig-tailed macaque)","Mandrillus leucophaeus(Drill)","Microcebus murinus(Mouse Lemur)","Nomascus leucogenys(Gibbon)","Otolemur garnettii(Bushbaby)","Pan paniscus(Bonobo)","Pan troglodytes(Chimpanzee)","Papio anubis(Olive baboon)","Pongo abelii(Orangutan)","Propithecus coquereli(Coquerel's sifaka)","Rhinopithecus bieti(Black snub-nosed monkey)","Rhinopithecus roxellana(Golden snub-nosed monkey)","Saimiri boliviensis boliviensis(Bolivian squirrel monkey)"];
    var primates_species=["Aotus nancymaae","Callithrix jacchus","Carlito syrichta","Cebus capucinus","Cercocebus atys","Chlorocebus sabaeus","Colobus angolensis palliatus","Gorilla gorilla","Homo sapiens","Macaca fascicularis","Macaca mulatta","Macaca nemestrina","Mandrillus leucophaeus","Microcebus murinus","Nomascus leucogenys","Otolemur garnettii","Pan paniscus","Pan troglodytes","Papio anubis","Pongo abelii","Propithecus coquereli","Rhinopithecus bieti","Rhinopithecus roxellana","Saimiri boliviensis boliviensis"];
    var rodents_name=["Cavia aperea(Brazilian guinea pig)","Cavia porcellus(Guinea Pig)","Chinchilla lanigera(Long-tailed chinchilla)","Cricetulus griseus chok1gshd(Chinese hamster CHOK1GS)","Cricetulus griseus crigri(Chinese hamster CriGri)","Dipodomys ordii(Kangaroo rat)","Fukomys damarensis(Damara mole rat)","Heterocephalus glaber male(Naked mole-rat male)","Heterocephalus glaber female(Naked mole-rat female)","Ictidomys tridecemlineatus(Squirrel)","Jaculus jaculus(Lesser Egyptian jerboa)","Mesocricetus auratus(Golden Hamster)","Microtus ochrogaster(Prairie vole)","Mus caroli(Ryukyu mouse)","Mus musculus(Mouse)","Mus pahari(Shrew mouse)","Mus spretus(Algerian mouse)","Nannospalax galili(Upper Galilee mountains blind mole rat)","Ochotona princeps(Pika)","Octodon degus(Degu)","Oryctolagus cuniculus(Rabbit)","Peromyscus maniculatus bairdii(Northern American deer mouse)","Rattus norvegicus(Rat)","Tupaia belangeri(Tree Shrew)"];
    var rodents_species=["Cavia aperea","Cavia porcellus","Chinchilla lanigera","Cricetulus griseus chok1gshd","Cricetulus griseus crigri","Dipodomys ordii","Fukomys damarensis","Heterocephalus glaber male","Heterocephalus glaber female","Ictidomys tridecemlineatus","Jaculus jaculus","Mesocricetus auratus","Microtus ochrogaster","Mus caroli","Mus musculus","Mus pahari","Mus spretus","Nannospalax galili","Ochotona princeps","Octodon degus","Oryctolagus cuniculus","Peromyscus maniculatus bairdii","Rattus norvegicus","Tupaia belangeri"];
    var Lau_name=["Ailuropoda melanoleuca(Panda)","Bos taurus(Cow)","Canis familiaris(Dog)","Capra hircus(Goat)","Equus caballus(Horse)","Erinaceus europaeus(Hedgehog)","Felis catus(Cat)","Mustela putorius furo(Ferret)","Myotis lucifugus(Microbat)","Ovis aries(Sheep)","Pteropus vampyrus(Megabat)","Sorex araneus(Shrew)","Sus scrofa(Pig)","Tursiops truncatus(Dolphin)","Vicugna pacos(Alpaca)"];
    var lau_species=["Ailuropoda melanoleuca","Bos taurus","Canis familiaris","Capra hircus","Equus caballus","Erinaceus europaeus","Felis catus","Mustela putorius furo","Myotis lucifugus","Ovis aries","Pteropus vampyrus","Sorex araneus","Sus scrofa","Tursiops truncatus","Vicugna pacos",""];
    var afro_name=["Echinops telfairi(Lesser hedgehog tenrec)","Loxodonta africana(Elephant)","Procavia capensis(Hyrax)"];
    var afro_species=["Echinops telfairi","Loxodonta africana","Procavia capensis"];
    var xena_name=["Choloepus hoffmanni(Sloth)","Dasypus novemcinctus(Armadillo)"];
    var xena_species=["Choloepus hoffmanni","Dasypus novemcinctus"];
    var other_mamm_name=["Monodelphis domestica(Opossum)","Notamacropus eugenii(Wallaby)","Ornithorhynchus anatinus(Platypus)","Sarcophilus harrisii(Tasmanian devil)"];
    var other_mamm_species=["Monodelphis domestica","Notamacropus eugenii","Ornithorhynchus anatinus","Sarcophilus harrisii"];
    var bird_name=["Anas platyrhynchos(Duck)","Anolis carolinensis(Anole lizard)","Ficedula albicollis(Flycatcher)","Gallus gallus(Chicken)","Meleagris gallopavo(Turkey)","Pelodiscus sinensis(Chinese softshell turtle)","Taeniopygia guttata(Zebra Finch)"];
    var bird_species=["Anas platyrhynchos","Anolis carolinensis","Ficedula albicollis","Gallus gallus","Meleagris gallopavo","Pelodiscus sinensis","Taeniopygia guttata",""];
    var amphi_name=["Xenopus tropicalis(Xenopus)"];
    var amphi_species=["Xenopus tropicalis"];
    var fish_name=["Astyanax mexicanus(Cave fish)","Danio rerio(Zebrafish)","Gadus morhua(Cod)","Gasterosteus aculeatus(Stickleback)","Lepisosteus oculatus(Spotted gar)","Oreochromis niloticus(Tilapia)","Oryzias latipes(Medaka)","Poecilia formosa(Amazon molly)","Takifugu rubripes(Fugu)","Tetraodon nigroviridis(Tetraodon)","Xiphophorus maculatus(Platyfish)"];
    var fish_species=["Astyanax mexicanus","Danio rerio","Gadus morhua","Gasterosteus aculeatus","Lepisosteus oculatus","Oreochromis niloticus","Oryzias latipes","Poecilia formosa","Takifugu rubripes","Tetraodon nigroviridis","Xiphophorus maculatus",""];
    var other_vert_name=["Latimeria chalumnae(Coelacanth)","Petromyzon marinus(Lamprey)"];
    var other_vert_species=["Latimeria chalumnae","Petromyzon marinus"];
    var other_chor_name=["Ciona intestinalis(C.intestinalis)","Ciona savignyi(C.savignyi)"];
    var other_chor_species=["Ciona intestinalis","Ciona savignyi"];
    var other_euka_name=["Caenorhabditis elegans(C. elegans)","Drosophila melanogaster(Fruitfly)"];
    var other_euka_species=["Caenorhabditis elegans","Drosophila melanogaster"];
    var favo_list=[];
    var prim_list=[];
    var rodents_list=[];
    var Lau_list=[];
    var afro_list=[];
    var xena_list=[];
    var other_mammal_list=[];
    var bird_list=[];
    var amphi_list=[];
    var fish_list=[];
    var other_vert_list=[];
    var other_chor_list=[];
    var other_euka_list=[];
    for (var i=0;i<favo_name.length;i++){
        var name=favo_name[i].split("(")[1];
        favo_list.push({"raw":favo_species[i],"name":name.substring(0, name.length - 1),"species":favo_species[i].split(" ").join("_")})
    };
    for (var i=0;i<primates_name.length;i++){
        var name=primates_name[i].split("(")[1];
        prim_list.push({"raw":primates_species[i],"name":name.substring(0, name.length - 1),"species":primates_species[i].split(" ").join("_")})
    };
    for (var i=0;i<rodents_name.length;i++){
        var name=rodents_name[i].split("(")[1];
        rodents_list.push({"raw":rodents_species[i],"name":name.substring(0, name.length - 1),"species":rodents_species[i].split(" ").join("_")})
    };
    for (var i=0;i<Lau_name.length;i++){
        var name=Lau_name[i].split("(")[1];
        Lau_list.push({"raw":lau_species[i],"name":name.substring(0, name.length - 1),"species":lau_species[i].split(" ").join("_")})
    };
    for (var i=0;i<afro_name.length;i++){
        var name=afro_name[i].split("(")[1];
        afro_list.push({"raw":afro_species[i],"name":name.substring(0, name.length - 1),"species":afro_species[i].split(" ").join("_")})
    };
    for (var i=0;i<xena_name.length;i++){
        var name=xena_name[i].split("(")[1];
        xena_list.push({"raw":xena_species[i],"name":name.substring(0, name.length - 1),"species":xena_species[i].split(" ").join("_")})
    };
    for (var i=0;i<other_mamm_name.length;i++){
        var name=other_mamm_name[i].split("(")[1];
        other_mammal_list.push({"raw":other_mamm_species[i],"name":name.substring(0, name.length - 1),"species":other_mamm_species[i].split(" ").join("_")})
    };
    for (var i=0;i<bird_name.length;i++){
        var name=bird_name[i].split("(")[1];
        bird_list.push({"raw":bird_species[i],"name":name.substring(0, name.length - 1),"species":bird_species[i].split(" ").join("_")})
    }
    for (var i=0;i<amphi_name.length;i++){
        var name=amphi_name[i].split("(")[1];
        amphi_list.push({"raw":amphi_species[i],"name":name.substring(0, name.length - 1),"species":amphi_species[i].split(" ").join("_")})
    };
    for (var i=0;i<fish_name.length;i++){
        var name=fish_name[i].split("(")[1];
        fish_list.push({"raw":fish_species[i],"name":name.substring(0, name.length - 1),"species":fish_species[i].split(" ").join("_")})
    };
    for (var i=0;i<other_vert_name.length;i++){
        var name=other_vert_name[i].split("(")[1];
        other_vert_list.push({"raw":other_vert_species[i],"name":name.substring(0, name.length - 1),"species":other_vert_species[i].split(" ").join("_")})
    };
    for (var i=0;i<other_chor_name.length;i++){
        var name=other_chor_name[i].split("(")[1];
        other_chor_list.push({"raw":other_chor_species[i],"name":name.substring(0, name.length - 1),"species":other_chor_species[i].split(" ").join("_")})
    };
    for (var i=0;i<other_euka_name.length;i++){
        var name=other_euka_name[i].split("(")[1];
        other_euka_list.push({"raw":other_euka_species[i],"name":name.substring(0, name.length - 1),"species":other_euka_species[i].split(" ").join("_")})
    }
    $scope.favo_list = favo_list;
    $scope.prim_list = prim_list;
    $scope.rodents_list = rodents_list;
    $scope.lau_list = Lau_list;
    $scope.afro_list = afro_list;
    $scope.xena_list = xena_list;
    $scope.other_mammal_list = other_mammal_list;
    $scope.bird_list = bird_list;
    $scope.amphi_list = amphi_list;
    $scope.fish_list = fish_list;
    $scope.vert_list = other_vert_list;
    $scope.other_chor_list = other_chor_list;
    $scope.other_euka_list = other_euka_list;

    $scope.fetch_species_count=function (item) {
        var species_count=[];
        var family_array=[];
        var family;
        var species=item["species"];
        $scope.species=species;
        // $scope.modal_header="Species: "+item["name"]+", click the bar for detail information.";
        $http({
            url: base_url + '/api/species_count',
            params: {species: species},
            method: 'GET'
        }).then(
            function (response) {
                $scope.loading=0;
                console.log(response.data);
                var species_count_list = response.data.count_list;
                $scope.species_count_list=species_count_list;
                for (var i=0;i<species_count_list.length;i++){
                    var temp=species_count_list[i];
                    family_array.push(temp["family"]);
                    species_count.push(Number(temp["count"]))
                }
                function onClick(params) {
                    family=params.name;
                    $scope.family=family;
                    window.open(base_url+"#!/tf_detail?species="+species+"&family="+family,"_blank")
                };
                $scope.lineConfig = {
                    theme: 'default',
                    event: [{click: onClick}],
                    dataLoaded: true
                };
                $scope.lineOption={
                    tooltip : {
                        trigger: 'axis',
                        position:function(p){   //其中p为当前鼠标的位置
                            return [p[0]-300, p[1]-500];
                        }
                    },
                    calculable : true,
                    grid: {
                        bottom: '25%',
                        left:'5%',
                        right:'5%',
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
                            type : 'value',
                            name:'TF count'
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
                                    label:{show:true,position:'out',color:"blue",textStyle:{color:"#1E90FF"}},
                                    color:"#FF9999"
                                }
                            }
                        }
                    ]
                }

            }
        );

    };
    // var category=["Laurasiatheria","Birds&Reptiles","Birds&Reptiles","Primates","Fishes","Laurasiatheria","Other_Eukaryotes","Primates","Laurasiatheria","Laurasiatheria","Primates","Rodents","Rodents","Primates","Primates","Rodents","Primates","Xenarthra","Other_Chordates","Other_Chordates","Primates","Rodents","Rodents","Fishes","Xenarthra","Rodents","Other_Eukaryotes","Afrotheria","Laurasiatheria","Laurasiatheria","Laurasiatheria","Birds&Reptiles","Rodents","Fishes","Birds&Reptiles","Fishes","Primates","Rodents","Rodents","Primates","Rodents","Rodents","Fishes","Fishes","Afrotheria","Primates","Primates","Primates","Primates","Birds&Reptiles","Rodents","Primates","Rodents","Other_Mammals","Rodents","Rodents","Rodents","Rodents","Laurasiatheria","Laurasiatheria","Rodents","Primates","Other_Mammals","Rodents","Rodents","Fishes","Other_Mammals","Rodents","Fishes","Primates","Laurasiatheria","Primates","Primates","Primates","Birds&Reptiles","Rodents","Other_Chordates","Fishes","Primates","Afrotheria","Primates","Laurasiatheria","Rodents","Primates","Primates","Primates","Other_Mammals","Laurasiatheria","Laurasiatheria","Birds&Reptiles","Fishes","Fishes","Rodents","Laurasiatheria","Laurasiatheria","Amphibians","Fishes"];
    // $("ul#species_ul").on("click","li",function(){
    //     var s=$(this).text();
    //     var t=s.split(" ");
    //     if (category.indexOf(s)<0){
    //         species=t.join("_");
    //         $scope.sidebar_item=1;
    //         // $scope.fetch_tf();
    //         $scope.fetch_species_count({"species":species})
    //     }
    //
    // });
    // var node_list=[];
    // var name=["Ailuropoda_melanoleuca(Panda)","Anas_platyrhynchos(Duck)","Anolis_carolinensis(Anole lizard)","Aotus_nancymaae(Ma's night monkey)","Astyanax_mexicanus(Cave fish)","Bos_taurus(Cow)","Caenorhabditis_elegans(C. elegans)","Callithrix_jacchus(Marmoset)","Canis_familiaris(Dog)","Capra_hircus(Goat)","Carlito_syrichta(Tarsier)","Cavia_aperea(Brazilian guinea pig)","Cavia_porcellus(Guinea Pig)","Cebus_capucinus(Capuchin)","Cercocebus_atys(Sooty mangabey)","Chinchilla_lanigera(Long-tailed chinchilla)","Chlorocebus_sabaeus(Vervet-AGM)","Choloepus_hoffmanni(Sloth)","Ciona_intestinalis(C.intestinalis)","Ciona_savignyi(C.savignyi)","Colobus_angolensis_palliatus(Angola colobus)","Cricetulus_griseus_chok1gshd(Chinese hamster CHOK1GS)","Cricetulus_griseus_crigri(Chinese hamster CriGri)","Danio_rerio(Zebrafish)","Dasypus_novemcinctus(Armadillo)","Dipodomys_ordii(Kangaroo rat)","Drosophila_melanogaster(Fruitfly)","Echinops_telfairi(Lesser hedgehog tenrec)","Equus_caballus(Horse)","Erinaceus_europaeus(Hedgehog)","Felis_catus(Cat)","Ficedula_albicollis(Flycatcher)","Fukomys_damarensis(Damara mole rat)","Gadus_morhua(Cod)","Gallus_gallus(Chicken)","Gasterosteus_aculeatus(Stickleback)","Gorilla_gorilla(Gorilla)","Heterocephalus_glaber_female(Naked mole-rat female)","Heterocephalus_glaber_male(Naked mole-rat male)","Homo_sapiens(Human)","Ictidomys_tridecemlineatus(Squirrel)","Jaculus_jaculus(Lesser Egyptian jerboa)","Latimeria_chalumnae(Coelacanth)","Lepisosteus_oculatus(Spotted gar)","Loxodonta_africana(Elephant)","Macaca_fascicularis(Crab-eating macaque)","Macaca_mulatta(Macaque)","Macaca_nemestrina(Pig-tailed macaque)","Mandrillus_leucophaeus(Drill)","Meleagris_gallopavo(Turkey)","Mesocricetus_auratus(Golden Hamster)","Microcebus_murinus(Mouse Lemur)","Microtus_ochrogaster(Prairie vole)","Monodelphis_domestica(Opossum)","Mus_caroli(Ryukyu mouse)","Mus_musculus(Mouse)","Mus_pahari(Shrew mouse)","Mus_spretus(Algerian mouse)","Mustela_putorius_furo(Ferret)","Myotis_lucifugus(Microbat)","Nannospalax_galili(Upper Galilee mountains blind mole rat)","Nomascus_leucogenys(Gibbon)","Notamacropus_eugenii(Wallaby)","Ochotona_princeps(Pika)","Octodon_degus(Degu)","Oreochromis_niloticus(Tilapia)","Ornithorhynchus_anatinus(Platypus)","Oryctolagus_cuniculus(Rabbit)","Oryzias_latipes(Medaka)","Otolemur_garnettii(Bushbaby)","Ovis_aries(Sheep)","Pan_paniscus(Bonobo)","Pan_troglodytes(Chimpanzee)","Papio_anubis(Olive baboon)","Pelodiscus_sinensis(Chinese softshell turtle)","Peromyscus_maniculatus_bairdii(Northern American deer mouse)","Petromyzon_marinus(Lamprey)","Poecilia_formosa(Amazon molly)","Pongo_abelii(Orangutan)","Procavia_capensis(Hyrax)","Propithecus_coquereli(Coquerel's sifaka)","Pteropus_vampyrus(Megabat)","Rattus_norvegicus(Rat)","Rhinopithecus_bieti(Black snub-nosed monkey)","Rhinopithecus_roxellana(Golden snub-nosed monkey)","Saimiri_boliviensis_boliviensis(Bolivian squirrel monkey)","Sarcophilus_harrisii(Tasmanian devil)","Sorex_araneus(Shrew)","Sus_scrofa(Pig)","Taeniopygia_guttata(Zebra Finch)","Takifugu_rubripes(Fugu)","Tetraodon_nigroviridis(Tetraodon)","Tupaia_belangeri(Tree Shrew)","Tursiops_truncatus(Dolphin)","Vicugna_pacos(Alpaca)","Xenopus_tropicalis(Xenopus)","Xiphophorus_maculatus];(Platyfish)"];
    // var species=["Ailuropoda_melanoleuca","Anas_platyrhynchos","Anolis_carolinensis","Aotus_nancymaae","Astyanax_mexicanus","Bos_taurus","Caenorhabditis_elegans","Callithrix_jacchus","Canis_familiaris","Capra_hircus","Carlito_syrichta","Cavia_aperea","Cavia_porcellus","Cebus_capucinus","Cercocebus_atys","Chinchilla_lanigera","Chlorocebus_sabaeus","Choloepus_hoffmanni","Ciona_intestinalis","Ciona_savignyi","Colobus_angolensis_palliatus","Cricetulus_griseus_chok1gshd","Cricetulus_griseus_crigri","Danio_rerio","Dasypus_novemcinctus","Dipodomys_ordii","Drosophila_melanogaster","Echinops_telfairi","Equus_caballus","Erinaceus_europaeus","Felis_catus","Ficedula_albicollis","Fukomys_damarensis","Gadus_morhua","Gallus_gallus","Gasterosteus_aculeatus","Gorilla_gorilla","Heterocephalus_glaber_female","Heterocephalus_glaber_male","Homo_sapiens","Ictidomys_tridecemlineatus","Jaculus_jaculus","Latimeria_chalumnae","Lepisosteus_oculatus","Loxodonta_africana","Macaca_fascicularis","Macaca_mulatta","Macaca_nemestrina","Mandrillus_leucophaeus","Meleagris_gallopavo","Mesocricetus_auratus","Microcebus_murinus","Microtus_ochrogaster","Monodelphis_domestica","Mus_caroli","Mus_musculus","Mus_pahari","Mus_spretus","Mustela_putorius_furo","Myotis_lucifugus","Nannospalax_galili","Nomascus_leucogenys","Notamacropus_eugenii","Ochotona_princeps","Octodon_degus","Oreochromis_niloticus","Ornithorhynchus_anatinus","Oryctolagus_cuniculus","Oryzias_latipes","Otolemur_garnettii","Ovis_aries","Pan_paniscus","Pan_troglodytes","Papio_anubis","Pelodiscus_sinensis","Peromyscus_maniculatus_bairdii","Petromyzon_marinus","Poecilia_formosa","Pongo_abelii","Procavia_capensis","Propithecus_coquereli","Pteropus_vampyrus","Rattus_norvegicus","Rhinopithecus_bieti","Rhinopithecus_roxellana","Saimiri_boliviensis_boliviensis","Sarcophilus_harrisii","Sorex_araneus","Sus_scrofa","Taeniopygia_guttata","Takifugu_rubripes","Tetraodon_nigroviridis","Tupaia_belangeri","Tursiops_truncatus","Vicugna_pacos","Xenopus_tropicalis","Xiphophorus_maculatus"];
    // var category=["Laurasiatheria","Birds&Reptiles","Birds&Reptiles","Primates","Fishes","Laurasiatheria","Other_Eukaryotes","Primates","Laurasiatheria","Laurasiatheria","Primates","Rodents","Rodents","Primates","Primates","Rodents","Primates","Xenarthra","Other_Chordates","Other_Chordates","Primates","Rodents","Rodents","Fishes","Xenarthra","Rodents","Other_Eukaryotes","Afrotheria","Laurasiatheria","Laurasiatheria","Laurasiatheria","Birds&Reptiles","Rodents","Fishes","Birds&Reptiles","Fishes","Primates","Rodents","Rodents","Primates","Rodents","Rodents","Fishes","Fishes","Afrotheria","Primates","Primates","Primates","Primates","Birds&Reptiles","Rodents","Primates","Rodents","Other_Mammals","Rodents","Rodents","Rodents","Rodents","Laurasiatheria","Laurasiatheria","Rodents","Primates","Other_Mammals","Rodents","Rodents","Fishes","Other_Mammals","Rodents","Fishes","Primates","Laurasiatheria","Primates","Primates","Primates","Birds&Reptiles","Rodents","Other_Chordates","Fishes","Primates","Afrotheria","Primates","Laurasiatheria","Rodents","Primates","Primates","Primates","Other_Mammals","Laurasiatheria","Laurasiatheria","Birds&Reptiles","Fishes","Fishes","Rodents","Laurasiatheria","Laurasiatheria","Amphibians","Fishes"];
    // var link_list=[];
    // for (var i=0;i<species.length;i++){
    //     // node_list.push({name:name[i].split("_").join(" "),symbol:"/static/AnimalTFDB3/image/species/"+species[i]+".png"});
    //     //node_list.push({name:name[i].split("_").join(" "),symbol:"image://http://bioinfo.life.hust.edu.cn/static/AnimalTFDB3/image/species/"+species[i]+".png"});
    //     node_list.push({name:name[i].split("_").join(" "),symbol:'image://http://www.iconpng.com/png/ecommerce-business/iphone.png'});
    //     link_list.push({source:category[i].split("_").join(" "),target:name[i].split("_").join(" "),weight: 1})
    // };
    // var cate=["Laurasiatheria","Birds&Reptiles","Primates","Fishes","Other_Eukaryotes","Rodents","Xenarthra","Other_Chordates","Afrotheria","Other_Mammals","Amphibians"];
    // for (var i=0;i<cate.length;i++){
    //     node_list.push({name:cate[i].split("_").join(" ")})
    // }

    // $scope.chordConfig = {
    //     theme: 'default',
    //     dataLoaded: true
    // };
    // console.log(node_list);
    // console.log(link_list);
    // $scope.chordOption = {
    //     series : [
    //         {
    //             type:'chord',
    //             sort : 'ascending',
    //             sortSub : 'descending',
    //             ribbonType: false,
    //             radius: '60%',
    //             itemStyle : {
    //                 normal : {
    //                     label : {
    //                         rotate : true
    //                     }
    //                 }
    //             },
    //             minRadius: 7,
    //             maxRadius: 20,
    //             // 使用 nodes links 表达和弦图
    //             nodes:node_list,
    //             links:link_list,
    //             showAllSymbol: true
    //         }
    //     ]
    // };

    // console.log("SpeciesController loaded");
    // $("[data-toggle='popover']").popover();
    // var screen_width= document.body.clientWidth;
    // document.getElementById("barchart").style.width = screen_width-400 + "px";
    // var base_url = AnimalTFDBservice.getAPIBaseUrl();
    // var species="Homo_sapiens";
    // var family=$("#family option:selected").text();
    // $scope.species=species;
    // $scope.species_title=species.split("_").join(" ");
    // $scope.family=family;
    // $(document).ready(function () {
    //     $('#sidebarCollapse').on('click', function () {
    //         $('#sidebar').toggleClass('active');
    //     });
    // });
    // $("ul#species_ul").on("click","li",function(){
    //     var s=$(this).text();
    //     var reg=/(\d\s)more|Less/;
    //     if(!(reg.test(s))){
    //         var t=s.split(" ");
    //         species=t.join("_");
    //         $scope.species=species;
    //         $scope.species_title=species.split("_").join(" ");
    //         $scope.fetch_tf();
    //         $scope.fetch_species_count()
    //     }
    // });
    // $scope.family_change=function () {
    //     family=$("#family option:selected").text();
    //     $scope.family=family;
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
    //
    // $scope.fetch_tf=function () {
    //     $http({
    //         url: base_url+'/api/tf_annotaion',
    //         params: {"species":species,"family":family},
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
    //             if (arr.length==0){
    //                 $scope.tf_zero=1;
    //             }
    //         });
    // };
    // //$scope.fetch_tf();
    $scope.show_modal = function (item) {
        $window.open("#!/tf_summary?species="+item["species"],"_self")
    };

    // $scope.fetch_species_count();
    // var species_list=[];
    // var species=["Ailuropoda_melanoleuca","Anas_platyrhynchos","Anolis_carolinensis","Aotus_nancymaae","Astyanax_mexicanus","Bos_taurus","Caenorhabditis_elegans","Callithrix_jacchus","Canis_familiaris","Capra_hircus","Carlito_syrichta","Cavia_aperea","Cavia_porcellus","Cebus_capucinus","Cercocebus_atys","Chinchilla_lanigera","Chlorocebus_sabaeus","Choloepus_hoffmanni","Ciona_intestinalis","Ciona_savignyi","Colobus_angolensis_palliatus","Cricetulus_griseus_chok1gshd","Cricetulus_griseus_crigri","Danio_rerio","Dasypus_novemcinctus","Dipodomys_ordii","Drosophila_melanogaster","Echinops_telfairi","Equus_caballus","Erinaceus_europaeus","Felis_catus","Ficedula_albicollis","Fukomys_damarensis","Gadus_morhua","Gallus_gallus","Gasterosteus_aculeatus","Gorilla_gorilla","Heterocephalus_glaber_female","Heterocephalus_glaber_male","Homo_sapiens","Ictidomys_tridecemlineatus","Jaculus_jaculus","Latimeria_chalumnae","Lepisosteus_oculatus","Loxodonta_africana","Macaca_fascicularis","Macaca_mulatta","Macaca_nemestrina","Mandrillus_leucophaeus","Meleagris_gallopavo","Mesocricetus_auratus","Microcebus_murinus","Microtus_ochrogaster","Monodelphis_domestica","Mus_caroli","Mus_musculus","Mus_pahari","Mus_spretus","Mustela_putorius_furo","Myotis_lucifugus","Nannospalax_galili","Nomascus_leucogenys","Notamacropus_eugenii","Ochotona_princeps","Octodon_degus","Oreochromis_niloticus","Ornithorhynchus_anatinus","Oryctolagus_cuniculus","Oryzias_latipes","Otolemur_garnettii","Ovis_aries","Pan_paniscus","Pan_troglodytes","Papio_anubis","Pelodiscus_sinensis","Peromyscus_maniculatus_bairdii","Petromyzon_marinus","Poecilia_formosa","Pongo_abelii","Procavia_capensis","Propithecus_coquereli","Pteropus_vampyrus","Rattus_norvegicus","Rhinopithecus_bieti","Rhinopithecus_roxellana","Saimiri_boliviensis_boliviensis","Sarcophilus_harrisii","Sorex_araneus","Sus_scrofa","Taeniopygia_guttata","Takifugu_rubripes","Tetraodon_nigroviridis","Tupaia_belangeri","Tursiops_truncatus","Vicugna_pacos","Xenopus_tropicalis","Xiphophorus_maculatus"];
    // for (var i=0;i<species.length;i++){
    //     species_list.push({"name":species[i].split("_").join(" "),"species":species[i]})
    // }
    // $scope.species_list=species_list;

};
function SpeciesSummaryController($scope,$http,$window,AnimalTFDBservice,$routeParams){
    var species="";
    var family="";
    var base_url = AnimalTFDBservice.getAPIBaseUrl();
    var screen_width= document.body.clientWidth;
    var all_species_tf_count=0;
    var all_species_cofactor_count=0;
    var all_tf_species_count=0;
    var all_cofactors_species_count=0;
    $("[data-toggle='popover']").popover();
    console.log($routeParams);
    document.getElementById("barchart").style.width = screen_width + "px";
    document.getElementById("barchart_cofactors").style.width = screen_width + "px";
    document.getElementById("barchart1").style.width = screen_width + "px";
    document.getElementById("barchart_cofactors1").style.width = screen_width + "px";
    $scope.draw_species_count=function (species_count_list) {
        var species_count0=[];
        var species_count1=[];
        var family_array0=[];
        var family_array1=[];
        var family;
        // function deepClone(obj){
        //     var objClone = Array.isArray(obj)?[]:{};
        //     if(obj && typeof obj==="object"){
        //         for( var key in obj){
        //             if(obj.hasOwnProperty(key)){
        //                 if(obj[key]&&typeof obj[key] ==="object"){
        //                     objClone[key] = deepClone(obj[key]);
        //                 }else{
        //                     objClone[key] = obj[key];
        //                 }
        //             }
        //         }
        //     }
        //     return objClone;
        // }
        // var sort_by_count_list=deepClone(species_count_list);
        // sort_by_count_list.sort(function(a,b){
        //     return b.count-a.count;
        // });
        // var top8=[];
        // var remain=[];
        for (var i=0;i<species_count_list.length;i++){
            var temp=species_count_list[i];
            var fa=temp["family"];
            var count=temp["count"];
            if (count>=50){
                family_array0.push(fa);
                species_count0.push(Number(count))
            }else{
                family_array1.push(fa);
                species_count1.push(Number(count))
            }
        }
        $scope.loading=0;
        $scope.species=species;
        $scope.species_count_list=species_count_list;
        var basic_domain=["AP-2","bHLH","Nrf1","RFX","TF_bZIP","TSC22"];
        var beta=["CBF","CP2","CSD","CSL","GCM","P53","RHD","Runt","STAT"];
        var helix=["ARID","COE","CUT","E2F","ETS","Fork_head","Homeobox","HPD","HSF","HTH","IRF","MYB","PAX","Pou","SRF","TEA","TF_Otx"];
        var alpha_helix=["GTF2I","HMG","NF-YA","NF-YB","NF-YC","SAND"];
        var unclass=["AF-4","CG-1","CTF/NFI","CSRNP_N","DACH","GCFC","HMGA","LRRFIP","MBD","MH1","NCU-G1","NDT80/PhoG","PC4","T-box","Others","Tub"];
        var zinc=["DM","ESR-like","GCNF-like","Miscellaneous","NGFIB-like","RXR-like","SF-like","THAP","THR-like","ZBTB","zf-BED","zf-C2H2","zf-C2HC","zf-GAGA","zf-GATA","zf-CCCH","zf-H2C2_2","zf-LITAF-like","zf-MIZ","zf-NF-X1"];
        var basic_domain_list=[];
        var beta_list=[];
        var helix_list=[];
        var alpha_list=[];
        var unclass_list=[];
        var zinc_list=[];
        for (var i=0;i<species_count_list.length;i++){
            var item=species_count_list[i];
            var fa=item["family"];
            var count=item["count"];
            all_species_tf_count+=Number(count);
            if (basic_domain.indexOf(fa)>-1){
                basic_domain_list.push({"family":fa,"count":count})
            }
            if (beta.indexOf(fa)>-1){
                beta_list.push({"family":fa,"count":count})
            }
            if (helix.indexOf(fa)>-1){
                helix_list.push({"family":fa,"count":count})
            }
            if (alpha_helix.indexOf(fa)>-1){
                alpha_list.push({"family":fa,"count":count})
            }
            if (unclass.indexOf(fa)>-1){
                unclass_list.push({"family":fa,"count":count})
            }
            if (zinc.indexOf(fa)>-1){
                zinc_list.push({"family":fa,"count":count})
            }
        }
        $scope.all_species_tf_count=all_species_tf_count;
        $scope.basic_domain_list=basic_domain_list;
        $scope.beta_list=beta_list;
        $scope.helix_list=helix_list;
        $scope.alpha_list=alpha_list;
        $scope.unclass_list=unclass_list;
        $scope.zinc_list=zinc_list;
        function onClick(params) {
            family=params.name;
            $scope.family=family;
            window.open(base_url+"#!/tf_detail?species="+species+"&family="+family,"_self")
        };
        $scope.lineConfig1 = {
            theme: 'default',
            event: [{click: onClick}],
            dataLoaded: true
        };
        $scope.lineOption1={
            tooltip : {
                trigger: 'axis',
                position:function(p){   //其中p为当前鼠标的位置
                    return [p[0], p[1]-500];
                }
            },
            calculable : true,
            grid: [{bottom: '22%', left:'2%', top:'4%', containLabel: true,width:"12%"},
                {bottom: '22%', right:'2%', top:'4%', containLabel: true,width:"83%"}
            ],

            xAxis : [
                {
                    gridIndex:0,
                    axisLabel: {rotate:60,interval:0},
                    type : 'category',
                    data:family_array0
                    // data : family_array
                },
                {
                    gridIndex:1,
                    axisLabel: {rotate:60,interval:0},
                    type : 'category',
                    data:family_array1
                    // data : family_array
                }

            ],
            yAxis : [
                {
                    gridIndex:0,
                    type : 'value',
                    name:"TF count"
                },
                {
                    gridIndex:1,
                    type : 'value',
                    name:"TF count"
                }
            ],
            series : [
                {
                    name:'TF count',
                    type:'bar',
                    barGap:20,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    // data:species_count,
                    data:species_count0,
                    itemStyle: {
                        normal: {
                            label:{show:true,position:'out',color:"blue",textStyle:{color:"#1E90FF"}},
                            color:"#FF9999"
                        }
                    }
                },
                {
                    name:'TF count',
                    type:'bar',
                    barGap:20,
                    xAxisIndex:1,
                    yAxisIndex: 1,
                    // data:species_count,
                    data:species_count1,
                    itemStyle: {
                        normal: {
                            label:{show:true,position:'out',color:"blue",textStyle:{color:"#1E90FF"}},
                            color:"#FF9999"
                        }
                    }
                }

            ]
        }
    };
    $scope.fetch_species_count=function () {
        $scope.species=species;
        // $scope.modal_header="Species: "+item["name"]+", click the bar for detail information.";
        $http({
            url: base_url + '/api/species_count',
            params: {species: species},
            method: 'GET'
        }).then(
            function (response) {
                $scope.loading=0;
                console.log(response.data);
                var species_count_list = response.data.count_list;
                $scope.species_count_list=species_count_list;
                localStorage.setItem(species+"species_count_list",JSON.stringify(response.data.count_list));
                $scope.draw_species_count(species_count_list);
            }
        );

    };
    $scope.fetch_family_count=function () {
        // $scope.modal_header="Family: "+item["name"]+", click the bar for detail information.";
        var family_count=[];
        var species_array=[];
        var species="";
        //var family=item["name"];
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
                    var count=Number(temp["count"]);
                    species_array.push(temp["species"]);
                    family_count.push(count);
                    all_tf_species_count+=count
                }
                $scope.all_tf_species_count=all_tf_species_count;
                function onClick(params) {
                    species=params.name;
                    $scope.species=species;
                    window.open(base_url+"#!/tf_detail?species="+species+"&family="+family,"_self")
                };
                $scope.lineConfig1 = {
                    theme: 'default',
                    event: [{click: onClick}],
                    dataLoaded: true
                };
                $scope.lineOption1={
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
                        top:'3%',
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
                            type : 'value',
                            name:"TF count"
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
    $scope.draw_cofactor_species=function (species_count_list) {
        var species_count=[];
        var family_array=[];
        var family;
        $scope.cofactors=1;
        $scope.species=species;
        $scope.loading=0;
        $scope.species_cofactor_count_list=species_count_list;
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
        for (var i=0;i<species_count_list.length;i++){
            var item=species_count_list[i];
            var fa=item["family"];
            var count=item["count"];
            all_species_cofactor_count+=Number(count);
            if (cell_cycle.indexOf(fa)>-1){
                cell_cycle_list.push({"family":fa,"count":count})
            }
            if (chromatin.indexOf(fa)>-1){
                chromatin_list.push({"family":fa,"count":count})
            }
            if (activator.indexOf(fa)>-1){
                activator_list.push({"family":fa,"count":count})
            }
            if (general.indexOf(fa)>-1){
                general_list.push({"family":fa,"count":count})
            }
            if (his.indexOf(fa)>-1){
                his_list.push({"family":fa,"count":count})
            }
            if (other.indexOf(fa)>-1){
                other_list.push({"family":fa,"count":count})
            }
        }
        $scope.all_species_cofactor_count=all_species_cofactor_count;
        $scope.cell_cycle_list=cell_cycle_list;
        $scope.chromatin_list=chromatin_list;
        $scope.activator_list=activator_list;
        $scope.general_list=general_list;
        $scope.his_list=his_list;
        $scope.other_list=other_list;
        for (var i=0;i<species_count_list.length;i++){
            var temp=species_count_list[i];
            if (!(temp["family"]=="Others")) {
                family_array.push(temp["family"]);
                species_count.push(Number(temp["count"]))
            }
        }
        function onClick(params) {
            family=params.name;
            $scope.family=family;
            window.open(base_url+"#!/tf_detail?species="+species+"&family="+family+"&cofactors=1","_self")
        };
        $scope.lineConfig2 = {
            theme: 'default',
            event: [{click: onClick}],
            dataLoaded: true
        };
        $scope.lineOption2={
            tooltip : {
                trigger: 'axis',
                position:function(p){   //其中p为当前鼠标的位置
                    return [p[0]-300, p[1]-500];
                }
            },
            calculable : true,
            grid: {
                bottom: '39%',
                left:'5%',
                right:'5%',
                top:'3%',
                containLabel: true
            },
            xAxis : [
                {
                    axisLabel: {rotate:45,interval:0},
                    type : 'category',
                    data : family_array
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:"TF Cofactor count"
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
                            label:{show:true,position:'out',color:"blue",textStyle:{color:"#1E90FF"}},
                            color:"#FF9999"
                        }
                    }
                }
            ]
        }
    };
    $scope.fetch_cofactors_species_count=function () {
        $scope.cofactors=1;
        $scope.species=species;
        $http({
            url: base_url + '/api/cofactors_species_count',
            params: {species: species},
            method: 'GET'
        }).then(
            function (response) {
                $scope.loading=0;
                console.log(response.data);
                var species_count_list = response.data.count_list;
                $scope.species_cofactor_count_list=species_count_list;
                localStorage.setItem(species+"species_cofactor_count_list",JSON.stringify(response.data.count_list));
                $scope.draw_cofactor_species(species_count_list);
            }
        );

    };
    $scope.fetch_cofactors_family_count=function () {
        var family_count=[];
        var species_array=[];
        $scope.cofactors=1;
        $http({
            url: base_url + '/api/cofactors_family_count',
            params: {family: family},
            method: 'GET'
        }).then(
            function (response) {
                console.log(response.data);
                var family_count_list = response.data.count_list;
                $scope.cofactors_family_count_list=family_count_list;
                for (var i=0;i<family_count_list.length;i++){
                    var temp=family_count_list[i];
                    var count=Number(temp["count"]);
                    all_cofactors_species_count+=count;
                    species_array.push(temp["species"]);
                    family_count.push(Number(temp["count"]))
                }
                 $scope.all_cofactors_species_count=all_cofactors_species_count;
                function onClick(params) {
                    species=params.name;
                    $scope.species=species;
                    $scope.species_title=species.split("_").join(" ");
                    window.open(base_url+"#!/tf_detail?species="+species+"&family="+family+"&cofactors=1","_self")
                };
                $scope.lineConfig2 = {
                    theme: 'default',
                    event: [{click: onClick}],
                    dataLoaded: true
                };
                $scope.lineOption2={
                    tooltip : {
                        trigger: 'axis',
                        position:function(p){   //其中p为当前鼠标的位置
                            return [p[0]-300, p[1]-500];
                        }
                    },
                    calculable : true,
                    grid: {
                        bottom: '50%',
                        top:'3%',
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
                            type : 'value',
                            name:"TF Cofactor"
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
    if ($routeParams.species){
        species=$routeParams.species;
        $scope.species=species;
        $scope.tf_click=1;
        $scope.species_title=species.split("_").join(" ");
        $scope.fetch_species_count();
        $scope.fetch_cofactors_species_count();
        // if(localStorage.getItem(species+"species_count_list")){
        //     var species_count_list=JSON.parse(localStorage.getItem(species+"species_count_list"));
        //     $scope.draw_species_count(species_count_list);
        //
        // };
        // if(localStorage.getItem(species+"species_cofactor_count_list")){
        //     var species_count_list=JSON.parse(localStorage.getItem(species+"species_cofactor_count_list"));
        //     $scope.draw_cofactor_species(species_count_list);
        // }
        // if((!(localStorage.getItem(species+"species_count_list")))&&(!(localStorage.getItem(species+"species_cofactor_count_list")))){
        //     $scope.fetch_species_count();
        //     $scope.fetch_cofactors_species_count();
        // }

    }
    if ($routeParams.family){
        family=$routeParams.family;
        $scope.family=family;
        if(!($routeParams.cofactors)){
            $scope.fetch_family_count();

        }
        if($routeParams.cofactors){
            $scope.fetch_cofactors_family_count();
        }
    }
    $scope.show_tf=function () {
        $scope.tf_click=1;
        $scope.cofactor_click=0
    };
    $scope.show_cofactor=function () {
        $scope.tf_click=0;
        $scope.cofactor_click=1;
    }

}
