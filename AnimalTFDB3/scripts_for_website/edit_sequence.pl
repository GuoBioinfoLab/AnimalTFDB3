#!usr/bin/perl
#program:edit_sequence.pl
#Author:zhanghm
#Date: Tue Jun 17 14:38:06 2014

use strict;
use Getopt::Long;
use File::Basename;

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
		this perl will edit the annotation line of fasta seq
options:
-h	--help	:print help info
-i	:input the sequence
-o	:output the edited result
e.g.:
#	perl $0 
USAGE
}

if(!(defined $in && defined $out ) || defined $help)
{
	&usage();
	exit 0;
}

#read in 
open(IN,"<$in") or die "can not open $in \n";
open(OUT,">$out") or die "can not open $out \n";
while(<IN>)
{
	chomp;
	if(/^>/)
	{
		$_=~s/\s.*//g;
		print OUT $_,"\n";
	}
	else
	{
		print OUT "$_\n";
	}
}
close IN;
close OUT;
