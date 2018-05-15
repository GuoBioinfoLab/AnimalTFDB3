#!usr/bin/perl
#program:extract_alignment_result.pl
#Author:zhanghm
#Date: Tue Aug 12 21:12:44 2014

use strict;
use Getopt::Long;
use File::Basename;

my($TF_family,$hmm,$outdir,$out,$help);
GetOptions(
	'help|h' => \$help,
	'f:s' => \$TF_family,
	'h:s' => \$hmm,
	'd:s' => \$outdir,
	'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		this perl will extract the predicted result
options:
-h	--help	:print help info
-f	:input TF final family file
-h	:input the hmmsearch result
-d	:input the output directory
-o	:output the final predict result
e.g.:
#	perl $0 
USAGE
}

if(!(defined $TF_family && defined $hmm && defined $outdir && defined $out) || defined $help)
{
	&usage();
	exit 0;
}


#read in TF family file
#ENSMUSP00000099083      zf-C2H2
#ENSMUSP00000075552      zf-C2H2
open(F,"$TF_family") or die "can not open $TF_family \n";
my %TF_fam;
while(<F>)
{
	chomp;
	my ($id,$fam)=split(/\t/,$_);
	$TF_fam{$fam}->{$id}=1;
}
close F;

#read in hmmsearch result
open(IN,"$hmm") or die "can not open $hmm \n";
open(OUT,">$out") or die "can not open $out \n";
$/="//";
while(<IN>)
{
	chomp;
	my ($full_evalue,$best_evalue,$domain_num,$protein,$fam,$len);
	my $flag=0;
	my @data=split(/\n/,$_);
	foreach my $line (@data)
	{
		if($line=~/^Query:\s+(\S+)\s+\[M=(\d+)\]/)
		{
			($fam,$len)=($1,$2);
		}
		if($line=~/^\s+?(0|[0-9\.]+e\-[0-9]+)[0-9e\.\- ]+?/)
		{
			($full_evalue,$best_evalue,$domain_num,$protein) = (split(/\s+/,$line))[1,4,8,9];
			if(exists $TF_fam{$fam}->{$protein})
			{
				print OUT "$protein\t",$fam,"\t","$full_evalue\t$best_evalue\t$domain_num\n";
			}
		}
		if($line=~/^>>\s+(\S+)/)
		{
			$flag=0;
			close OUT_new;
			$protein=$1;
			if(exists $TF_fam{$fam}->{$protein})
			{
				$flag=1;
				my $outfile=$outdir."/${protein}_alignment.detail";
				open(OUT_new,">$outfile") or die "can not open $outfile\n";
				print OUT_new "HMM length of domain: $len aa\n\n";
				print OUT_new "c-Evalue (conditional Evalue): It is an attempt to measure the statistical significance of each domain, given that we’ve already decided that the target sequence is a true homolog. It is the expected number of additional domains we’d find with a domain score this big in the set of sequences reported in the top hits list, if those sequences consisted only of random nonhomologous sequence outside the region that sufficed to define them as homologs.\ni-Evalue (independent Evalue): The significance of the sequence in the whole database search, if this were the only domain we had identified. \n";
				print OUT_new "Domain annotation for each sequence:\n";
			}
			next;
		}
		if($flag==1)
		{
			if($line=~/\s+#\s+score\s+bias\s+c-Evalue\s+i-Evalue\s+hmmfrom\s+hmm to\s+alifrom\s+ali to/)
			{
				print OUT_new "#\tscore\tbias\tc-Evalue\ti-Evalue\thmmfrom\thmm to\talifrom\tali to\n";
				print OUT_new "--\t-----\t----\t--------\t--------\t-------\t------\t-------\t------\n";
			}
			if($line=~/\s+[0-9]+\s+[\!\?]\s+[0-9\.\-]+/)
			{
				my @data=split(/\s+/,$line);
				print OUT_new "$data[1]\t$data[3]\t$data[4]\t$data[5]\t$data[6]\t$data[7]\t$data[8]\t$data[10]\t$data[11]\n";
			}
			if($line=~/Alignments for each domain:|== domain.*|^$/)
			{
				print OUT_new $line,"\n";
			}
			else
			{
				if($line=~/^\s+$fam/)
				{
					#my ($p1,$p2)=split(/\s+/,$line,2);
					#my $len=30-length($p1);
					#print OUT_new " " x $len,$p1,"  $p2\n";
					print OUT_new $line,"\n";
				}
				elsif($line=~/^\s+$protein/)
				{
					#my ($p1,$p2)=split(/\s+/,$line,2);
					#my $len=30-length($protein);
					#print OUT_new " " x $len,$protein,"  $p2\n";
					print OUT_new $line,"\n";
				}
				elsif($line=~/^\s+[a-zA-Z0-9\+\.\*\- ][a-zA-Z0-9\+\.\*\- ]+[a-zA-Z0-9\+\.\*\- ]$/)
				{
					print OUT_new $line,"\n";
				}
			}
		}
	}
}
$/="\n";
close IN;
close OUT;
