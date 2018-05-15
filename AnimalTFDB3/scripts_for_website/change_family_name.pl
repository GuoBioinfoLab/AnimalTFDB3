#!usr/bin/perl
#program:change_family_name.pl
#Author:zhanghm
#Date: Tue Apr 29 16:35:59 2014

use strict;
use Getopt::Long;
use File::Basename;

my($in,$out,$relation,$help);
GetOptions(
	'help|h' => \$help,
	'i:s' => \$in,
	'o:s' => \$out,
	'r:s' => \$relation,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		this perl will change the TF family name into standard name
options:
-h	--help	:print help info
-i	:input TF primary family result
-o	:output the changed result
-r	:input the family relation file
e.g.:
#	perl $0 
USAGE
}

if(!(defined $in && defined $relation && defined $out ) || defined $help)
{
	&usage();
	exit 0;
}

#read in the relation file
#BTD     CSL
#CBF_beta        CBF
#CBFB_NFYA       NF-YA
open(IN,"$relation") or die "$relation $!\n";
my %r;
while(<IN>)
{
	chomp;
	my ($old,$new)=split(/\t/,$_);
	$r{$old}=$new;
}
close IN;

#read in the primary result and print out the result
#ENSP00000464954 THAP
#ENSP00000451253 Homeobox
open(IN2,"<$in") or die "$in $!\n";
open(OUT,">$out") or die "$out $!\n";
while(<IN2>)
{
	chomp;
	my ($pr,$old)=split(/\t/,$_);
	if(exists $r{$old})
	{
		print OUT "$pr\t",$r{$old},"\n";
	}
	else
	{
		print $old,"\n";
	}
}
close IN2;
close OUT;
