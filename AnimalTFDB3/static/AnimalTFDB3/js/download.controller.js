'use strict';

angular.module('AnimalTFDB3')
    .controller('DownloadController', DownloadController);

function DownloadController($scope) {
    console.log("DownloadController loaded");
     var screen_heigth= window.screen.height;
    var pic=document.getElementById("title_pic");
    var nav=document.getElementById("home_nav");
    var pic_height=window.getComputedStyle(pic).height.split("px")[0];
    var nav_height=window.getComputedStyle(nav).height.split("px")[0];
    document.getElementById("sidebar-wrapper_doc").style.height = screen_heigth-pic_height-nav_height-160 + "px";
    console.log(screen_heigth-pic_height-nav_height-100 );
   //$scope.species_list=[{"species":1},{"species":2},{"species":3}]
    //$scope.species_list=["Ailuropoda_melanoleuca","Anas_platyrhynchos","Anolis_carolinensis","Aotus_nancymaae","Astyanax_mexicanus","Bos_taurus","Caenorhabditis_elegans","Callithrix_jacchus","Canis_lupus_familiaris","Capra_hircus","Carlito_syrichta","Cavia_aperea","Cavia_porcellus","Cebus_capucinus_imitator","Cercocebus_atys","Chinchilla_lanigera","Chlorocebus_sabaeus","Choloepus_hoffmanni","Ciona_intestinalis","Ciona_savignyi","Colobus_angolensis_palliatus","Cricetulus_griseus","Cricetulus_griseus","Danio_rerio","Dasypus_novemcinctus","Dipodomys_ordii","Drosophila_melanogaster","Echinops_telfairi","Equus_caballus","Erinaceus_europaeus","Felis_catus","Ficedula_albicollis","Fukomys_damarensis","Gadus_morhua","Gallus_gallus","Gasterosteus_aculeatus","Gorilla_gorilla_gorilla","Heterocephalus_glaber","Heterocephalus_glaber","Homo_sapiens","Ictidomys_tridecemlineatus","Jaculus_jaculus","Latimeria_chalumnae","Lepisosteus_oculatus","Loxodonta_africana","Macaca_fascicularis","Macaca_mulatta","Macaca_nemestrina","Mandrillus_leucophaeus","Meleagris_gallopavo","Mesocricetus_auratus","Microcebus_murinus","Microtus_ochrogaster","Monodelphis_domestica","Mus_caroli","Mus_musculus","Mus_pahari","Mus_spretus","Mustela_putorius_furo","Myotis_lucifugus","Nannospalax_galili","Nomascus_leucogenys","Notamacropus_eugenii","Ochotona_princeps","Octodon_degus","Oreochromis_niloticus","Ornithorhynchus_anatinus","Oryctolagus_cuniculus","Oryzias_latipes","Otolemur_garnettii","Ovis_aries","Pan_paniscus","Pan_troglodytes","Papio_anubis","Pelodiscus_sinensis","Peromyscus_maniculatus_bairdii","Petromyzon_marinus","Poecilia_formosa","Pongo_abelii","Procavia_capensis","Propithecus_coquereli","Pteropus_vampyrus","Rattus_norvegicus","Rhinopithecus_bieti","Rhinopithecus_roxellana","Saccharomyces_cerevisiae","Saimiri_boliviensis_boliviensis","Sarcophilus_harrisii","Sorex_araneus","Sus_scrofa","Taeniopygia_guttata","Takifugu_rubripes","Tetraodon_nigroviridis","Tupaia_belangeri","Tursiops_truncatus","Vicugna_pacos","Xenopus_tropicalis","Xiphophorus_maculatus"];
    var species=["Homo_sapiens","Mus_musculus","Rattus_norvegicus","Drosophila_melanogaster","Danio_rerio","Ailuropoda_melanoleuca","Anas_platyrhynchos","Anolis_carolinensis","Aotus_nancymaae","Astyanax_mexicanus","Bos_taurus","Caenorhabditis_elegans","Callithrix_jacchus","Canis_familiaris","Capra_hircus","Carlito_syrichta","Cavia_aperea","Cavia_porcellus","Cebus_capucinus","Cercocebus_atys","Chinchilla_lanigera","Chlorocebus_sabaeus","Choloepus_hoffmanni","Ciona_intestinalis","Ciona_savignyi","Colobus_angolensis_palliatus","Cricetulus_griseus_chok1gshd","Cricetulus_griseus_crigri","Dasypus_novemcinctus","Dipodomys_ordii","Echinops_telfairi","Equus_caballus","Erinaceus_europaeus","Felis_catus","Ficedula_albicollis","Fukomys_damarensis","Gadus_morhua","Gallus_gallus","Gasterosteus_aculeatus","Gorilla_gorilla","Heterocephalus_glaber_female","Heterocephalus_glaber_male","Ictidomys_tridecemlineatus","Jaculus_jaculus","Latimeria_chalumnae","Lepisosteus_oculatus","Loxodonta_africana","Macaca_fascicularis","Macaca_mulatta","Macaca_nemestrina","Mandrillus_leucophaeus","Meleagris_gallopavo","Mesocricetus_auratus","Microcebus_murinus","Microtus_ochrogaster","Monodelphis_domestica","Mus_caroli","Mus_pahari","Mus_spretus","Mustela_putorius_furo","Myotis_lucifugus","Nannospalax_galili","Nomascus_leucogenys","Notamacropus_eugenii","Ochotona_princeps","Octodon_degus","Oreochromis_niloticus","Ornithorhynchus_anatinus","Oryctolagus_cuniculus","Oryzias_latipes","Otolemur_garnettii","Ovis_aries","Pan_paniscus","Pan_troglodytes","Papio_anubis","Pelodiscus_sinensis","Peromyscus_maniculatus_bairdii","Petromyzon_marinus","Poecilia_formosa","Pongo_abelii","Procavia_capensis","Propithecus_coquereli","Pteropus_vampyrus","Rhinopithecus_bieti","Rhinopithecus_roxellana","Saimiri_boliviensis_boliviensis","Sarcophilus_harrisii","Sorex_araneus","Sus_scrofa","Taeniopygia_guttata","Takifugu_rubripes","Tetraodon_nigroviridis","Tupaia_belangeri","Tursiops_truncatus","Vicugna_pacos","Xenopus_tropicalis","Xiphophorus_maculatus"];
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
    };
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
    $scope.show_modal = function (item) {
       $scope.species=item["species"];
    };
}
