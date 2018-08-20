<div class="title1 row">			
	        <div class="title-inner" >
                <h1>AnimalTFDB<sup>2.0</sup></h1>
                <div class="row">
                        <div class="span6 info">
                                <p>
                                  AnimalTFDB is a comprehensive database including classification and annotation of genome-wide transcription factors (TFs), transcription co-factors and chromatin remodeling factors in 65 animal genomes. The TFs are further classified into 70 families based on their DNA-binding domain (DBD).
                                </p>
                        </div>
                        <div class="span6 search-block">
                                <div class="search-block-inner">
                                                <strong>Search by Ensembl/Entrez gene ID, Symbol or Alias</strong>
                                                <p>e.g. ENSG00000141510; 7157; TP53; P53, TRP53</p> <br />
                                                <form name="quicksearch" class="form-search" action="/AnimalTFDB/search/quick.shtml">
                                                <div class="input-append">
                                                        <input type="text" name="q" class="search-query span2" placeholder="Search"/>
                                                    <input type="hidden" name="token" value="<?php echo $_COOKIE['csrf_cookie_name']; ?>"/>
                                                    <button type="submit" class="btn btn-primary">&nbsp;GO&nbsp;</button>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        </div>
</div><br/><br/>


<div class="container" style="min-height:0px;">
	<div class="tabbable">
		<ul class="nav nav-tabs" style="margin-bottom:0px;">
			<li class='active'><a href="#Guides" data-toggle="tab">For beginners</a></li>
			<li><a href="#Predict" data-toggle="tab" id="prediction-tab">Prediction</a></li>
			<li><a href="#Seeds" data-toggle="tab" id="seeds-tab">TF family assignment rules</a></li>
			<li><a href="#Annotation" data-toggle="tab" id="annotation-tab">Annotation</a></li>
		</ul>

<script language="javascript">

    var url=document.location.href;

    $(document).ready(function(){
    var pre = url.split("#")[1];
    if( pre == "prediction_tab"){
        $('#prediction-tab').click();
    }
    if( pre == "annotation_tab" ){
        $('#annotation-tab').click();
    }
    });

    $(document).ready(function(){
    if(url.match('#')){
        var id= url.split("#")[1];
        $('a[href=#' + id + ']').tab('show');
    }
        $('a.refresh-tabs').click(function(e){
            e.preventDefault();
            $($(this).data('target')).click();
        });
    });

</script>

		<div class="tab-content" style="background:#fff;padding:20px 20px 10px">
			<div class="tab-pane fade" id="Predict">
				<p class="lead">Methods for predicting TFs, transcription co-factors and chromatin remodeling factors</p>
				<p style="text-indent: 25px; width:300;text-align:justify;text-justify:newspaper">
				Transcription factors (TFs) are key regulators through binding to specific DNA sequence to activate or repress gene expression. Each TF has at least one DNA-binding domain (DBD) which is conserved in evolution. Based on their DBDs, TFs could be classified into different families. After reviewing literatures, we finally collected and curated 70 animal TF families and a group of them named "others" which includes some orphan TFs. We identified TFs based on the Hidden Markov Model (HMM) profiles of their DBDs. Among the 70 defined families, 56 families had HMM profiles of their DBDs in Pfam database (v27.0) and we downloaded them directly. For the remaining domains without available Pfam HMM profiles, we rebuilt the HMM profiles using the sequences in representative species (human, mouse, zebrafish and fly). To build the HMM profiles for them, we performed multiple sequence alignment by ClustalW2 for their DBD sequences and used the hmmbuild program in HMMER package to build HMM profiles. Then, we applied the hmmsearch program to search all the protein sequences in each species against the HMM profiles to predict TFs. Based on our manual curation, we took the E-value 0.0001 as the cutoff. In addition to the predicted TFs, we also found some TFs reported in publications. But none of them can be classified into one TF family, so we classified them into group "Others".
				</p><br />
				<p style="text-indent: 25px; width:300;text-align:justify;text-justify:newspaper">
				Transcription co-factors are considered as proteins that interact with TFs in the transcription complex but do not bind to the DNA directly. To identify them, we firstly got the human transcription co-factors from <a href="http://cbrc.kaust.edu.sa/tcof/" target="_blank">Tcof-DB</a> database and <a href="http://geneontology.org/" target="_blank">GO</a> database according to the GO items: "transcription coactivator activity", "transcription corepressor activity", "transcription cofactor activity" and "regulation of transcription". After removing redundant genes and the overlap with TFs, we got 415 transcription co-factors in human.
				</p><br />
				<p style="text-indent: 25px; width:300;text-align:justify;text-justify:newspaper">
				The chromatin remodeling factors were defined as proteins that regulate transcription by modifying the chromatin formation. We obtained the human chromatin remodeling factors from <a href="http://geneontology.org/" target="_blank">GO</a> database. If the gene has one of the following GO annotations: "chromatin remodeling", "chromatin-mediated maintenance of transcription", "histone *ylation", "histone .*ylase activity", "histone *transferase activity", we think it is a chromatin remodeling factors. After manual curation, we got 142 chromatin remodeling factors in human. 
				</p><br />
				<p style="text-indent: 25px; width:300;text-align:justify;text-justify:newspaper">
				In order to identify transcription co-factor and chromatin remodeling factor in other 64 species, we do the reciprocal best-hit BLAST between the human and other species with the conditions setting as e-value<=1e-4, coverage>=50%, identity>=30%. 
				</p><br />
			</div>
			<div class="tab-pane fade" id="Seeds">
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
				After systematically reviewing recently published literatures, we found two new TF families comparing to AnimalTFDB v1.0. They are NCU-G1 and CEP-1, while CEP-1 only exist in Caenorhabditis elegans. In addition, we reclassified the nuclear receptor family. In version 1.0, this family is classified into 12 sub-families based on InterPro and Pfam annotations. In the update version, we classified it into 7 sub-families according to the common classification methods of the nuclear receptor nomenclature committee [1, 2]. The nuclear transcription factor Y (NFY) is also classified into 3 sub-families based on the three different subunits.
				</p><br />
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
				In most cases, a TF only has one kind of DBD, thus it is easy to assign it into one certain family correctly. But in some cases, a TF may have more than one kind of DBD. In order to classify them into correct family, we checked all the TFs of human and mouse which contained multiple kinds of DBDs, and then set up two rules. First, if a superfamily has several subfamilies, we classified the TFs based on the subfamily DBD. For example, the Homeobox superfamily has four subfamilies: Pou, CUT, TF_Otx and other Homeobox. In this superfamily, all TFs have a Homeobox domain, and some of them have one of the Pou, CUT, and TF_Otx subfamily signature domains. We assigned them into specific family based on their subfamily signature domain. The second rule is that if a TF has more than one unrelated DBD, we will classify it into the family based on the DBD with the smallest E-value. We checked all the classification results of human and mouse, and found our method was reasonable.
				</p><br />
				<table class="table table-condensed table-hover table-bordered"> 
					<thead>
					 <tr class="success">
					  <th colspan="3">Family</th>
					  <th>DNA-binding domain</th>
					  <th>Pfam ID or InterPro ID</th>
					 </tr>
					</thead>
					<tbody>
					 <tr >
					  <td>AF-4</td>
					  <td colspan="2"></td>
					  <td>AF-4</td>
					  <td><a href="http://pfam.xfam.org/family/PF05110" target="_blank">PF05110</a></td>
					 </tr>
					 <tr >
					  <td>AP-2</td>
					  <td colspan="2"></td>
					  <td>AP_2</td>
					  <td><a href="http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=IPR004979" target="_blank">IPR004979</a> (self-build)</td>
					 </tr>
					 <tr >
					  <td>ARID</td>
					  <td colspan="2"></td>
					  <td>ARID</td>
					  <td><a href="http://pfam.xfam.org/family/PF01388"target="_blank"t>PF01388</a></td>
					 </tr>
					 <tr >
					  <td>bHLH
					  </td>
					  <td colspan="2"></td>
					  <td>HLH</td>
					  <td><a href="http://pfam.xfam.org/family/PF00010"target="_blank">PF00010</a></td>
					 </tr>
					 <tr >
					  <td>CBF
					  </td>
					  <td colspan="2"></td>
					  <td>CBF_alpha</td>
					  <td><a href="http://pfam.xfam.org/family/PF02312"target="_blank">PF02312</a></td>
					 </tr>
					 <tr >
					  <td>CEP-1</td>
					  <td colspan="2"></td>
					  <td>CEP1-DNA_bind</td>
					  <td><a href="http://pfam.xfam.org/family/PF09287"target="_blank">PF09287</a></td>
					 </tr>
					 <tr >
					  <td>CSL</td>
					  <td colspan="2"></td>
					  <td>BTD</td>
					  <td><a href="http://pfam.xfam.org/family/PF09270"target="_blank">PF09270</a></td>
					 </tr>
					 <tr >
					  <td rowspan="3">NF-Y</td>
					  <td colspan="2">NF-YA</td>
					  <td>CBFB_NFYA</td>
					  <td><a href="http://pfam.xfam.org/family/PF02045"target="_blank">PF02045</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">NF-YB
					  </td>
					  <td>NF-YB</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td colspan="2">NF-YC
					  </td>
					  <td>NF-YC</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>CG-1</td>
					  <td colspan="2"></td>
					  <td>CG-1</td>
					  <td><a href="http://pfam.xfam.org/family/PF03859"target="_blank">PF03859</a></td>
					 </tr>
					 <tr >
					  <td>CP2</td>
					  <td colspan="2"></td>
					  <td>CP2</td>
					  <td><a href="http://pfam.xfam.org/family/PF04516"target="_blank">PF04516</a></td>
					 </tr>
					 <tr >
					  <td>CSD</td>
					  <td colspan="2"></td>
					  <td>CSD</td>
					  <td><a href="http://pfam.xfam.org/family/PF00313"target="_blank">PF00313</a></td>
					 </tr>
					 <tr >
					  <td>E2F
					  </td>
					  <td colspan="2"></td>
					  <td>E2F_TDP</td>
					  <td><a href="http://pfam.xfam.org/family/PF02319"target="_blank">PF02319</a></td>
					 </tr>
					 <tr >
					  <td>ETS
					  </td>
					  <td colspan="2"></td>
					  <td>Ets</td>
					  <td><a href="http://pfam.xfam.org/family/PF00178"target="_blank">PF00178</a></td>
					 </tr>
					 <tr >
					  <td>Fork head
					  </td>
					  <td colspan="2"></td>
					  <td>Fork_head</td>
					  <td><a href="http://pfam.xfam.org/family/PF00250"target="_blank">PF00250</a></td>
					 </tr>
					 <tr >
					  <td>GCM</td>
					  <td colspan="2"></td>
					  <td>GCM</td>
					  <td><a href="http://pfam.xfam.org/family/PF03615"target="_blank">PF03615</a></td>
					 </tr>
					  <tr >
					  <td>GTF2I</td>
					  <td colspan="2"></td>
					  <td>GTF2I</td>
					  <td><a href="http://pfam.xfam.org/family/PF02946"target="_blank">PF02946</a></td>
					 </tr>
					 <tr >
					  <td>HMG
					  </td>
					  <td colspan="2"></td>
					  <td>HMG_box</td>
					  <td><a href="http://pfam.xfam.org/family/PF00505"target="_blank">PF00505</a></td>
					 </tr>
					 <tr >
					  <td>HMGI/HMGY</td>
					  <td colspan="2"></td>
					  <td>HMGI/HMGY</td>
					  <td><a href="http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=IPR000116" target="_blank">IPR000116</A> (self-build)</td>
					 </tr>
					 <tr >
					  <td>HSF
					  </td>
					  <td colspan="2"></td>
					  <td>HSF_DNA-bind</td>
					  <td><a href="http://pfam.xfam.org/family/PF00447"target="_blank">PF00447</a></td>
					 </tr>
					 <tr >
					  <td>HTH
					  </td>
					  <td colspan="2"></td>
					  <td>HTH_psq</td>
					  <td><a href="http://pfam.xfam.org/family/PF05225"target="_blank">PF05225</a></td>
					 </tr>
					 <tr >
					  <td>IRF
					  </td>
					  <td colspan="2"></td>
					  <td>IRF</td>
					  <td><a href="http://pfam.xfam.org/family/PF00605"target="_blank">PF00605</a></td>
					 </tr>
					 <tr >
					  <td>MYB
					  </td>
					  <td colspan="2"></td>
					  <td>Myb_DNA-bd</td>
					  <td><a href="http://pfam.xfam.org/family/PF00249"target="_blank">PF00249</a></td>
					 </tr>
					 <tr >
					  <td>MBD</td>
					  <td colspan="2"></td>
					  <td>MBD</td>
					  <td><a href="http://pfam.xfam.org/family/PF01429"target="_blank">PF01429</a></td>
					 </tr>
					 <tr >
					  <td>NCU-G1</td>
					  <td colspan="2"></td>
					  <td>NCU-G1</td>
					  <td><a href="http://pfam.xfam.org/family/PF15065"target="_blank">PF15065</a></td>
					 </tr>
					 <tr >
					  <td>NDT80/PhoG
					  </td>
					  <td colspan="2"></td>
					  <td>NDT80_PhoG</td>
					  <td><a href="http://pfam.xfam.org/family/PF05224"target="_blank">PF05224</a></td>
					 </tr>
					 <tr >
					  <td>Nrf1
					  </td>
					  <td colspan="2"></td>
					  <td>Nrf1_DNA-bind</td>
					  <td><a href="http://pfam.xfam.org/family/PF10491"target="_blank">PF10491</a></td>
					 </tr>
					 <tr >
					  <td>PC4</td>
					  <td colspan="2"></td>
					  <td>PC4</td>
					  <td><a href="http://pfam.xfam.org/family/PF02229"target="_blank">PF02229</a></td>
					 </tr>
					 <tr >
					  <td>P53</td>
					  <td colspan="2"></td>
					  <td>P53</td>
					  <td><a href="http://pfam.xfam.org/family/PF00870"target="_blank">PF00870</a></td>
					 </tr>
					 <tr >
					  <td>PAX</td>
					  <td colspan="2"></td>
					  <td>PAX</td>
					  <td><a href="http://pfam.xfam.org/family/PF00292"target="_blank">PF00292</a></td>
					 </tr>
					 <tr >
					  <td>HPD</td>
					  <td colspan="2"></td>
					  <td>HPD</td>
					  <td><a href="http://pfam.xfam.org/family/PF05044"target="_blank">PF05044</a></td>
					 </tr>
					 <tr >
					  <td>RFX
					  </td>
					  <td colspan="2"></td>
					  <td>RFX</td>
					  <td><a href="http://pfam.xfam.org/family/PF02257"target="_blank">PF02257</a></td>
					 </tr>
					 <tr >
					  <td>RHD</td>
					  <td colspan="2"></td>
					  <td>RHD</td>
					  <td><a href="http://pfam.xfam.org/family/PF00554"target="_blank">PF00554</a></td>
					 </tr>
					 <tr >
					  <td>Runt</td>
					  <td colspan="2"></td>
					  <td>Runt</td>
					  <td><a href="http://pfam.xfam.org/family/PF00853"target="_blank">PF00853</a></td>
					 </tr>
					 <tr >
					  <td>SAND</td>
					  <td colspan="2"></td>
					  <td>SAND</td>
					  <td><a href="http://pfam.xfam.org/family/PF01342"target="_blank">PF01342</a></td>
					 </tr>
					 <tr >
					  <td>SRF
					  </td>
					  <td colspan="2"></td>
					  <td>SRF</td>
					  <td><a href="http://pfam.xfam.org/family/PF00319"target="_blank">PF00319</a></td>
					 </tr>
					 <tr >
					  <td>STAT
					  </td>
					  <td colspan="2"></td>
					  <td>STAT_bind</td>
					  <td><a href="http://pfam.xfam.org/family/PF02864"target="_blank">PF02864</a></td>
					 </tr>
					 <tr >
					  <td>T-box</td>
					  <td colspan="2"></td>
					  <td>T-box</td>
					  <td><a href="http://pfam.xfam.org/family/PF00907"target="_blank">PF00907</a></td>
					 </tr>
					 <tr >
					  <td>TEA</td>
					  <td colspan="2"></td>
					  <td>TEA</td>
					  <td><a href="http://pfam.xfam.org/family/PF01285"target="_blank">PF01285</a></td>
					 </tr>
					 <tr >
					  <td>COE
					  </td>
					  <td colspan="2"></td>
					  <td>COE</td>
					  <td><a href="http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=IPR003523" target="_blank">IPR003523</A> (self-build)</td>
					 </tr>
					 <tr >
					  <td>TSC22</td>
					  <td colspan="2"></td>
					  <td>TSC22</td>
					  <td><a href="http://pfam.xfam.org/family/PF01166"target="_blank">PF01166</a></td>
					 </tr>
					 <tr >
					  <td>Tub</td>
					  <td colspan="2"></td>
					  <td>Tub</td>
					  <td><a href="http://pfam.xfam.org/family/PF01167"target="_blank">PF01167</a></td>
					 </tr>
					 
					 <tr >
					  <td rowspan="2">bZIP</td>
					  <td colspan="2">TF_bZIP</td>
					  <td>bZIP</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td colspan="2">C/EBP</td>
					  <td>bZIP</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td rowspan="2">MH1</td>
					  <td colspan="2">CTF/NFI</td>
					  <td>MH1</td>
					  <td><a href="http://pfam.xfam.org/family/PF00859"target="_blank">PF00859</A></td>
					 </tr>
					 <tr >
					  <td colspan="2">MH1</td>
					  <td>MH1</td>
					  <td><a href="http://pfam.xfam.org/family/PF03165"target="_blank">PF03165</a></td>
					 </tr>
					 <tr >
					  <td rowspan="4">Homeobox</td>
					  <td colspan="2">Homeobox</td>
					  <td>Homeobox</td>
					  <td><a href="http://pfam.xfam.org/family/PF00046"target="_blank">PF00046</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">Pou</td>
					  <td>Homeobox, Pou</td>
					  <td><a href="http://pfam.xfam.org/family/PF00157"target="_blank">PF00157</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">CUT</td>
					  <td>Homeobox, CUT</td>
					  <td><a href="http://pfam.xfam.org/family/PF02376"target="_blank">PF02376</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">TF_Otx</td>
					  <td>Homeobox, TF_Otx</td>
					  <td><a href="http://pfam.xfam.org/family/PF03529"target="_blank">PF03529</a></td>
					 </tr>
					 <tr >
					  <td  rowspan="19">Zinc finger</td>
					  <td colspan="2">zf-C2HC</td>
					  <td>zf-C2HC</td>
					  <td><a href="http://pfam.xfam.org/family/PF01530"target="_blank">PF01530</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">zf-GAGA</td>
					  <td>zf-GAGA</td>
					  <td><a href="http://pfam.xfam.org/family/PF09237"target="_blank">PF09237</a></td>
					 </tr>
					 <tr >
					  <td colspan="2">zf-BED</td>
					  <td>zf-BED</td>
					  <td><a href="http://pfam.xfam.org/family/PF02892"target="_blank">PF02892</a></td>
					 </tr>
					 <tr >
					  <td rowspan="2">zf-C2H2</td>
					  <td>ZBTB</td>
					  <td>zf-C2H2</td>
					  <td><a href="http://pfam.xfam.org/family/PF00651"target="_blank">PF00651</a></td>
					 </tr>
					 <tr >
					  <td>zf-C2H2</td>
					  <td>zf-C2H2</td>
					  <td><a href="http://pfam.xfam.org/family/PF00096"target="_blank">PF00096</a></td>
					 </tr>
					 <tr >
					  <td rowspan="7">Nuclear
					  Receptor</td>
					  <td>Miscellaneous</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>THR-like
					  </td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>RXR-like</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>ESR-like</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>NGFIB-like</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>SF-like</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>GCNF-like</td>
					  <td>zf-C4</td>
					  <td>self-build</td>
					 </tr>
					 <tr >
					  <td>DM
					  </td>
					  <td></td>
					  <td>DM</td>
					  <td><a href="http://pfam.xfam.org/family/PF00751"target="_blank">PF00751</a></td>
					 </tr>
					 <tr >
					  <td>zf-GATA</td>
					  <td></td>
					  <td>zf-GATA</td>
					  <td><a href="http://pfam.xfam.org/family/PF00320"target="_blank">PF00320</a></td>
					 </tr>
					 <tr >
					  <td>zf-LITAF-like</td>
					  <td></td>
					  <td>zf-LITAF-like</td>
					  <td><a href="http://pfam.xfam.org/family/PF10601"target="_blank">PF10601</a></td>
					 </tr>
					 <tr >
					  <td>zf-MIZ</td>
					  <td></td>
					  <td>zf-MIZ</td>
					  <td><a href="http://pfam.xfam.org/family/PF02891"target="_blank">PF02891</a></td>
					 </tr>
					 <tr >
					  <td>zf-NF-X1</td>
					  <td></td>
					  <td>zf-NF-X1</td>
					  <td><a href="http://pfam.xfam.org/family/PF01422"target="_blank">PF01422</a></td>
					 </tr>
					 <tr >
					  <td>THAP</td>
					  <td></td>
					  <td>THAP</td>
					  <td><a href="http://pfam.xfam.org/family/PF05485"target="_blank">PF05485</a></td>
					 </tr>
					 
					 <tr >
					  <td>Others </td>
					  <td colspan="2"></td>
					  <td></td>
					  <td></td>
					 </tr>
					</tbody>
				</table>
				<div>
					<p><strong>References:</strong></p>
					<ul style="list-style:none;">
						<li>
						1. A unified nomenclature system for the nuclear receptor superfamily. 1999 Apr 16; 97(2):161-3. PMID 10219237.</li>
						<li>
						2. Evolution of the nuclear receptor superfamily: early diversification from an ancestral orphan receptor. J Mol Endocrinol. 1997 Dec; 19 (3): 207-26. PMID 9460643
						</li>
					</ul>
				</div><br/>
			</div>

			<div class="tab-pane fade" id="Annotation">
				<p class="lead">1. Gene basic information</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
This part shows the basic information for a gene, which was extracted from different sources. The Ensembl ID, Gene Symbol, Gene Type, Orientation, Length, Position and Transcripts information were extracted from <a href="http://www.ensembl.org/index.html">Ensembl</a> database. Entrez ID and HGNC ID were obtained through Ensembl BioMart. And then we used these two IDs to get gene Alias and Full Name from <a href="http://www.ncbi.nlm.nih.gov/">NCBI</a> and <a href="http://www.genenames.org/">HGNC</a>) databases. Summary information was grabbed from NCBI database by Entrez ID. Cross links were extracted from Unigene, OMIM, GeneCards, MGI, RGD and FlyBase.
				</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The <strong>evidences</strong> that a TF, co-factor or chromatin remodeling factor is experimentally verified or putative are provided in 7 model species (human, mouse, rat, chicken, zebrafish, fruit fly, and worm) based on the GO annotations. If a TF with GO annotation of "regulation of transcription or transcription factor" and the GO annotation is marked with an<a target="_blank"  href="http://geneontology.org/page/experimental-evidence-codes"> experimental evidence code</a> will be considered as experimental validated TF. If a co-factor with GO annotations of "transcription coactivator/corepressor/cofactor activity" or "regulation of transcription" and their evidence codes are experimental, we think this co-factor is an experimentally validated co-factor. Otherwise, it is putative. For chromatin remodeling factors, if their GO annotation are “chromatin remodeling”, “chromatin-mediated maintenance of transcription”, “histone *ylation”，“histone .*ylase activity”，and “histone *transferase activity” and the evidence codes are experimental, we think them as experimentally validated chromatin remodeling factors.
</p>
				<br/>
				<p class="lead">2. Gene model</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">This part describes the distribution of CDS, UTR and intron of a gene on chromosome based on the information from Ensembl gtf files.</p><br/>
				<p class="lead">3. Function domain</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The function domain displays the domains distribution of the longest protein for each gene. In order to identify the function domains for TFs, we firstly downloaded all the HMMER profiles from Pfam database (version 27.0). Then, we applied PfamScan to search the protein domain against all the TF longest protein sequences with the default setting. After a domain coverage>=70% filtration, we got the final function domain for each sequence.</p><br/>
				<p class="lead">4. Gene ontology</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The GO annotations were parsed from gene2go file, which was downloaded from <a href="ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/">NCBI ftp</a>).</p><br/>
				<p class="lead">5. Pathway</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The pathway annotations were obtained from the <a href="http://www.genome.jp/kegg/">KEGG</a> and <a href="http://www.biocarta.com/">BioCarta</a> databases.</p><br/>
				<p class="lead">6. Phenotype</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">We parsed the disease information from <a href="http://www.malacards.org/">MalaCards</a> and Ensembl Biomart.</p><br/>
				<p class="lead">7. Protein-protein Interaction</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The protein-protein interactions were extracted from <a href="http://thebiogrid.org/">BioGRID</a> version 3.2 and <a href="http://www.hprd.org/">HPRD</a> databases.</p><br/>
				<p class="lead">8. Ortholog</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">We extracted the ortholog information by Ensembl API.</p><br/>
				<p class="lead">9. Paralog</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">Paralogs also were extracted by Ensembl API.</p><br/>
				<p class="lead">10. Gene expression</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The mRNA expression profiles of human, mouse and rhesus monkey for different tissues and cell lines were obtained. In addition, the protein expression profile of human was also downloaded. </p> <br/>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
				The gene expression information of 9 model species is provided in AnimalTFDB 2.0 involving normal tissues, cell lines, development stages and cancers in human.
				</p> <br/>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
				We downloaded the human gene expression data of cancers from <a href="https://tcga-data.nci.nih.gov/tcga/findArchives.htm">TCGA</a> and downloaded the data of tissues and cell lines from <a href="http://www.ebi.ac.uk/gxa/download.html">EMBL-EBI Expression Atlas</a>. The expression data of the human proteome were parsed from recent published nature paper [1,2]. The gene expression of D. melanogaster and C. elegans was extracted from the data published by Li et al [3]. Our collaborators Drs. Yu Xue and Haibo Jia kindly provided the unpublished gene expression data of Danio rerio. We downloaded the raw data for Rattus norvegicus, Bos taurus and Gallus gallus from NCBI GEO DataSets published by Burge group and calculated gene expression with TopHat and Cufflinks programs. The gene expression data for Mus musculus and Macaca mulatta were downloaded from RhesusBase, which were calculated from the RNA-Seq data published by groups Burge, Kaessmann and Chuan-Yun Li.
				</p> <br/>
				<p class="lead">11. Family Multi-alignment and Phylogenetic Tree</p>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">
				We made multiple sequence alignment for the DBD sequences by ClustalW2 and constructed phylogenetic trees for TFs in the same family of each species by applying PHYLIP Neighbor-Joining method with bootstrap 100. The multiple sequence alignment result and phylogenetic tree were displayed by Weblogo and Phylogeny.fr, respectively.
				</p> <br/>
				<p><strong>References</strong></p>
				<ul style="list-style:none;">
					<li>
					1. Kim, M.S., Pinto, S.M. et al. (2014) A draft map of the human proteome. Nature, 509, 575-581.</li>
					<li>
					2. Wilhelm, M., Schlegl, J. et al. (2014) Mass-spectrometry-based draft of the human proteome. Nature, 509, 582-587.
					</li>
					<li>
					3. Li, J.J., Huang, H., Bickel, P.J. and Brenner, S.E. (2014) Comparison of D. melanogaster and C. elegans developmental stages, tissues, and cells by modENCODE RNA-seq data. Genome research, 24, 1086-1101.
					</li>
				</ul><br/>
			</div>
			<!--</div>-->
			<div class="tab-pane fade  in active" id="Guides">
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">AnimalTFDB is a comprehensive database including classification and annotation of genome-wide transcription factors (TFs), transcription co-factors and chromatin remodeling factors in 65 animal genomes. The TFs are further classified into 70 families based on their DNA-binding domain (DBD). The family names and assignment rules could be found in <a href="#" class="refresh-tabs" data-target="#seeds-tab" >TF family assignment rules</a> page.</p>
				<br/>
				<p style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">Current URL of AnimalTFDB is 
					<a href="http://bioinfo.life.hust.edu.cn/AnimalTFDB/">http://bioinfo.life.hust.edu.cn/AnimalTFDB/</a>.The AnimalTFDB 2.0 provides multiple ways to browse, keyword search, BLAST search and download the data in our database. We also provided an online prediction sever of TF.</p><br/>

				<p class="lead">Browse</p>
				<ul style="list-style:none;">
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">1. Browse by species. Users can browse the database by clicking the logo of species on the phylogenetic tree or by clicking the name on the left treeview. The cascading style of species->families->family gene list->single gene annotation is applied for this browse way. The family gene list page also show the multiple sequence alignment of the DBDs, the weblogo graph of the multi-alignment and phylogenetic tree of these TFs, as well as a brief introduction and reference of this TF family.</li>
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">2. Browse by family. Users can browse the database by clicking the logo of TF families or the bars of transcription co-factors and chromatin remodeling factors. The names of TFs, transcription co-factors and chromatin remodeling factors on the left treeview also could be clicked to browse the database. The full TF list in each species could be browse by clicking the “Transcription Factor Family” bar. The cascading style of families->species->family gene list->single gene annotation is applied for this browse way.</li>
				</ul>
				<br/>

				<p class="lead">Search</p>
				<ul style="list-style:none;">
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">1. A quick search box for Ensembl gene id, Entrez gene id or gene symbol locates at the head of each page.</li>
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">2. Advanced search page provides multiple ways to search the database. Users can search by different basic information (multiple gene ids, gene symbol, alias and full name), annotation information (protein-protein interactions, gene ontology, pathway, orthologs and paralogs), mRNA or protein expression of a TF. For the expression search, specific species, types of tissues, cell lines, development stages and cancers, and the lowest threshold of gene expression levels could be selected to filter the search result.</li>
				</ul>
				</br>

				<p class="lead">TF prediction</p>
				<ul style="list-style:none;">
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">To help users identify TFs from their own protein sequences, we set up a TF prediction server. The prediction method and TF family assignment rules can be found in  <a href="#" class="refresh-tabs" data-target="#prediction-tab">prediction</a> and <a href="#" class="refresh-tabs" data-target="#seeds-tab">TF family assignment rules</a> pages. Currently, users can upload up to 1000 protein sequences in one time and obtain results within a few minutes. In the prediction result, TF family, alignment e-value, and detailed alignment information will be provided.</li>
				</ul>
				</br>				

				<p class="lead">BLAST</p>
				<ul style="list-style:none;">
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">To help users find homologous gene and explore functions of poorly studied TFs, a BLAST tool was provided to search against TFs, transcription co-factors and chromatin remodeling factors in our database with protein or DNA sequences. The protein sequences of all species or one specific species could be selected as the BLAST database. The specific e-vlaue can be chose.</li>
				</ul>
				</br>

				<p class="lead">Download</p>
				<ul style="list-style:none;">
				<li style="text-indent:25px; width:300;text-align:justify;text-justify:newspaper">The gene lists of TFs, transcription co-factors and chromatin remodeling factors for each species could be downloaded from the download page. The longest protein sequences of all the genes also are provided in the download page.</li>
				</ul>
			</div><br/>
		</div>
	</div>	
</div>
