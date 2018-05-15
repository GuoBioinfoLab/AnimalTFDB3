#!usr/bin/perl
#program:join_family_and_homolog.pl
#Author:zhanghm
#Date: Tue Jun 17 14:05:20 2014

use strict;
use Getopt::Long;
use File::Basename;

my($TF_family,$TF_homolog,$out,$help);
GetOptions(
	'help|h' => \$help,
	'f:s' => \$TF_family,
	'h:s' => \$TF_homolog,
	'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		this perl will join the two file together
options:
-h	--help	:print help info
-f	:input the TF family file
-h	:input TF homolog file
-o	:output the join result
e.g.:
#	perl $0 
USAGE
}

if(!(defined $TF_family && defined $TF_homolog && $out) || defined $help)
{
	&usage();
	exit 0;
}

#read in TF_homolog file
open(IN,"<$TF_homolog") or die "can not open $TF_homolog $!\n";
my %homolog;
while(<IN>)
{
	chomp;
	my ($id,$info)=split(/\t/,$_,2);
	$homolog{$id}=$info;
}
close IN;

#read in TF family information
open(IN2,"<$TF_family") or die "can not open $TF_family \n";
open(OUT,">$out") or die "can not open $out\n";
print OUT "TF_id\tFamily\tbest_hit_in_human\te-value\tidentity\tcoverage\n";
while(<IN2>)
{
	chomp;
	my ($id,$family)=split;
	print OUT $_,"\t";
	if(exists $homolog{$id})
	{
		print OUT $homolog{$id},"\n";
	}
	else
	{
		print OUT "-\t-\t-\n";
	}
}
close IN2;
close OUT;
