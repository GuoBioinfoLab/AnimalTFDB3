#!usr/bin/perl
#program:change_hmm_name.pl
#Author:zhanghm
#Date: Wed Aug 13 14:09:33 2014

use strict;
use Getopt::Long;
use File::Basename;

my($relation,$hmm,$out,$help);
GetOptions(
	'help|h' => \$help,
	'r:s' => \$relation,
	'h:s' => \$hmm,
	'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		
options:
-h	--help	:print help info
-r	:input the relation file
-h	:input the hmm file
-o	:output the changed result
e.g.:
#	perl $0 
USAGE
}

if(!(defined $relation && defined $hmm && defined $out) || defined $help)
{
	&usage();
	exit 0;
}

#read in TF family relation file
#CCAAT_and_enhancer_binding_change       C/EBP
#CEP1-DNA_bind   CEP-1
open(R,"$relation") or die "can not open $relation \n";
my %fam;
while(<R>)
{
	chomp;
	my ($old,$new)=split(/\t/,$_);
	$fam{$old}=$new;
}
close R;

#read in hmm file
open(IN,"$hmm") or die "can not open $hmm \n";
open(OUT,">$out") or die "can not open $out \n";
while(<IN>)
{
	if(/^NAME\s+(\S+)/)
	{
		if(exists $fam{$1})
		{
			print OUT "NAME  ",$fam{$1},"\n";
		}
		else
		{
			print OUT $_;
			print $1,"\n";
		}
	}
	else
	{
		print OUT $_;
	}
}
close IN;
close OUT;
