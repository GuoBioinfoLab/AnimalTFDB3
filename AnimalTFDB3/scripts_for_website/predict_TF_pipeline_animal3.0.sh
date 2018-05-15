#!/bin/sh
OPTIND=1

###software configure
hmmsearch=/usr/local/bin/hmmsearch

usage() {
	cat <<EOF
	Usage: $0 -d <workdir> -t <TF_hmm1> -c <TF_hmm2> -r <TF_hmm3> -e <TF_hmm4> -a <animal_pr_seq> -s <scripts_path> -p <CPU> 
	-d <string> result directory
        -t <string> TF_modify2_1e-4.hmm file
        -c <string> TF_1e-3.hmm
        -r <string> TF_1e-2.hmm
        -e <string> zf-C2H2_2.1e-8.hmm
	-a <string> the file that stored animal protein sequence
	-s <string> scripts path
EOF
exit 1
}

while getopts :d:t:c:r:e:a:s: ARGS; do
case $ARGS in
	d) PROJECT_HOME=$OPTARG ;;
        t) TF_hmm1=$OPTARG ;;
        c) TF_hmm2=$OPTARG ;;
        r) TF_hmm3=$OPTARG ;;
        e) TF_hmm4=$OPTARG ;;
	a) animal_pr_seq=$OPTARG ;;
	s) scripts_path=$OPTARG ;;
	*) usage ;;
	esac
done

if [ "$PROJECT_HOME" = "" -o "$TF_hmm1" = "" -o "$TF_hmm2" = "" -o "$TF_hmm3" = "" -o "$TF_hmm4" = "" -o "$animal_pr_seq" = "" -o "$scripts_path" = "" ]; then

	usage
fi

i=`grep ">" $animal_pr_seq | wc -l`
j=10000
if [ $i -gt $j ];then
	exit
fi

mkdir -p $PROJECT_HOME 
###########################################################################################################
cd $PROJECT_HOME
#edit fasta file
perl $scripts_path/edit_sequence.pl -i $animal_pr_seq -o $PROJECT_HOME/edit_seq.fa
#predict TF
echo "predict TF\n"
        $hmmsearch -E 1e-4 -o hmmsearch_result_e-4_tmp $TF_hmm1 $PROJECT_HOME/edit_seq.fa
        $hmmsearch -E 1e-3 -o hmmsearch_result_e-3_tmp $TF_hmm2 $PROJECT_HOME/edit_seq.fa
        $hmmsearch -E 1e-2 -o hmmsearch_result_e-2_tmp $TF_hmm3 $PROJECT_HOME/edit_seq.fa
        $hmmsearch -E 1e-8 -o hmmsearch_result_e-8_tmp $TF_hmm4 $PROJECT_HOME/edit_seq.fa
        cat hmmsearch_result_e-4_tmp hmmsearch_result_e-3_tmp hmmsearch_result_e-2_tmp hmmsearch_result_e-8_tmp >hmmsearch_result_e-4
        rm hmmsearch_result_e-4_tmp hmmsearch_result_e-3_tmp hmmsearch_result_e-2_tmp hmmsearch_result_e-8_tmp 


#extract TF predict result
mkdir $PROJECT_HOME/TF_extract/
perl $scripts_path/extractPredictResult.pl -p $PROJECT_HOME/hmmsearch_result_e-4 -e $PROJECT_HOME/TF_extract/ -r extract_error.log

#gather the TF into one file
perl $scripts_path/gatherExtractResult.pl -e $PROJECT_HOME/TF_extract/ -o $PROJECT_HOME/TF_gather1 -r gather_error.log
echo "sucessfully predict, extract and gather TF result\n"
#Discard the enzyme gene
cat $PROJECT_HOME/TF_gather1|grep -E "TIP_N|PLU-1|MOZ_SAS|TRAM_LAG1_CLN8"|cut -f 1|sort|uniq >$PROJECT_HOME/enzyme_list
perl $scripts_path/discard_the_enzyme_gene.pl -s $PROJECT_HOME/enzyme_list -l $PROJECT_HOME/TF_gather1 -o $PROJECT_HOME/TF_gather


###########################################################################################################
#classify these three factor into specific family
echo "classify TF into specific family\n"
perl $scripts_path/classify_factors.pl -i $PROJECT_HOME/TF_gather -o $PROJECT_HOME/TF_family
perl $scripts_path/extract_alignment_result.pl -f $PROJECT_HOME/TF_family -h $PROJECT_HOME/hmmsearch_result_e-4 -d $PROJECT_HOME/ -o $PROJECT_HOME/TF_final_family
#perl $scripts_path/change_family_name.pl -r $TF_family_relation -i $PROJECT_HOME/TF_primary_family -o $PROJECT_HOME/TF_final_family

###########################################################################################################
#get the best hit to human
#part one: extract the sequence for TF
#perl $scripts_path/extract_fasta_by_id.pl -i $PROJECT_HOME/TF_final_family -f $PROJECT_HOME/edit_seq.fa -o $PROJECT_HOME/TF.fa

#part two: blastp to human TF
#blastall -p blastp -i $PROJECT_HOME/TF.fa -d $human_TF -o $PROJECT_HOME/TF_blast.out -e 1e-5 -m 8

#part three: calculate the length for TF
#infoseq $PROJECT_HOME/TF.fa | awk '{print $3,$6}' | sed 's/ /\t/g' >$PROJECT_HOME/TF.len

#part four: get the homolog
#perl $scripts_path/get_homolog.pl $PROJECT_HOME/TF_blast.out $PROJECT_HOME/TF.len $PROJECT_HOME/TF_homology_to_human

#add family info
#perl $scripts_path/join_family_and_homolog.pl -f $PROJECT_HOME/TF_final_family -h $PROJECT_HOME/TF_homology_to_human -o $PROJECT_HOME/TF_family_and_homology_to_human.out

#echo "sucessfully finished\n"
