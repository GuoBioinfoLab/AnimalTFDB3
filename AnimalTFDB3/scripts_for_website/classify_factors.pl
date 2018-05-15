#!usr/bin/perl
#program:classify_factors.pl
#Author:zhanghm
#Date: Sat Feb 15 21:56:41 2014

use strict;
use Getopt::Long;
use File::Basename;
use List::Util qw/max min/;

my($in,$out,$help);
GetOptions(
	'help|h' => \$help,
	'i:s' => \$in,
	'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		this perl will classify the TFs into different class
options:
-h	--help	:print help info
-i	:input the TF_gather file
-o	:output the result
e.g.:
#	perl $0 
USAGE
}

if(!(defined $in && defined $out) || defined $help)
{
	&usage();
	exit 0;
}

#read in the TF gather result
#ENSP00000327025 Miscellaneous=>9.7e-05;Retinoid_X_Receptor-like=>1.6e-06;Nerve_Growth_Factor_IB-like=>1.1e-18;zf-C4=>2.2e-30;Steroidogenic_Factor-like=>3.1e-07;Thyroid_Hormone_Receptor-like=>4.8e-55;Estrogen_Receptor-like=>5.2e-13
#ENSP00000295743 T-box=>7.2e-78
open(IN,"<$in") or die "$in $!\n";
my %hash;
while(<IN>)
{
	chomp;
	my ($pr,$TF)=split(/\t/,$_);
        #Homeobox and zf-H2C2_2
        if($TF=~/Homeobox/ && $TF=~/zf-H2C2_2/)
        {
                $hash{$pr}="Homeobox";
        }
        #BTB and zf-H2C2_2
        if($TF=~/ZBTB/ && $TF=~/zf-H2C2_2/)
        {
                $hash{$pr}="ZBTB";
        }
	#BTB and zf-C2H2
	if($TF=~/ZBTB/ && $TF=~/zf-C2H2/)
	{
		$hash{$pr}="ZBTB";
	}
	#Pou and Homeobox
	elsif($TF=~/Pou/ && $TF=~/Homeobox/)
	{
		$hash{$pr}="Pou";
	}
	#CUT and Homeobox	
	elsif($TF=~/CUT/ && $TF=~/Homeobox/)
	{
		$hash{$pr}="CUT";
	}
	#TF_Otx and Homeobox
	elsif($TF=~/TF_Otx/ && $TF=~/Homeobox/)
	{
		$hash{$pr}="TF_Otx";
	}
	#CTF_NFI and MH1
	elsif($TF=~/CTF\/NFI/ && $TF=~/MH1/)
	{
		$hash{$pr}="CTF_NFI";
	}
	#BTB and TF_bZIP
	elsif($TF=~/ZBTB/ && $TF=~/TF_bZIP/)
	{
		$hash{$pr}="TF_bZIP";
	}
        elsif($TF=~/zf-C2H2_2/)
        {
                $hash{$pr}="zf-C2H2";
        }
        elsif($TF=~/zf-CCCH/)
        {
                $TF=~/zf-CCCH=>([0-9e\-\.]+)/;
                if($1<=1e-20)
                {
                        $hash{$pr}="zf-CCCH";
                }
                else
                {
                next;
                }
        }
        elsif($TF=~/TSC22/)
        {
                $TF=~/TSC22=>([0-9e\-\.]+)/;
                if($1<=1e-6)
                {
                        $hash{$pr}="TSC22";
                }
                else
                {
                next;
                }
        }


	#NFYB family
	elsif($TF=~/NF-YB/)
	{
		$TF=~/NF-YB=>([0-9e\-\.]+)/;
		if($1<=1e-30)
		{
			$hash{$pr}="NF-YB";
		}
	}
	#NFYC family
	elsif($TF=~/NF-YC/)
	{
		$TF=~/NF-YC=>([0-9e\-\.]*)/;
		if($1<=1e-30)
		{
			$hash{$pr}="NF-YC";
		}
	}
	#nuclear receptor
	elsif($TF=~/Miscellaneous|GCNF-like|RXR-like|ESR-like|THR-like|NGFIB-like|SF-like/)
	{
		my $min=10;
		my $min_family="";
		my @TF_family=split(/;/,$TF);
		foreach my $var (@TF_family)
		{
			if($var =~ /zf-C4/)
			{
				next;
			}
			else
			{
				$var=~/(.*)=>(.*)/;
				if($2<$min)
				{
					$min=$2;
					$min_family=$1;
				}
			}
		}
		$hash{$pr}=$min_family;
	}
	#if a protein only contain a zf-C4 domain, we need to delete it
	elsif($TF=~/^zf-C4=>[0-9e\.\-]+$/)
	{
		$hash{$pr}="Miscellaneous";
	}
	#if a protein only contain a BTB domain, we need to delete it
	elsif($TF=~/^ZBTB=>[0-9e\.\-]+$/)
	{
		#print "BTB\n";
		next;
	}
	elsif($TF=~/^TIG=>[0-9e\.\-]+$/)
	{
		next;
	}
	elsif($TF=~/^zf-CCCH=>[0-9e\.\-]+$/)
	{
		next;
	}
	elsif($TF=~/^zf-C2H2_2=>[0-9e\.\-]+$/)
        {
                next;
        }
	
	#other case: the class and family of pr is decided by e-value
	else
	{
		my ($family) = &TF_compare($TF);
		$hash{$pr}=$family;
	}
}
close IN;

#print out the result
open(OUT,">$out") or die "$out $!\n";
foreach my $key (keys %hash)
{
	print OUT $key,"\t",$hash{$key},"\n";
}
close OUT;

###############################################
sub TF_compare
{
	my ($TF)=shift @_;
	my $min=10;
	my $min_family="";
	my @TF_family=split(/;/,$TF);
	foreach my $var (@TF_family)
	{
		$var=~/(.*)=>(.*)/;
		my $family=$1;
		my $value=$2;
		if($value<$min)
		{
			$min=$value;
			$min_family=$family;
		}
	}
	return ($min_family);
}
