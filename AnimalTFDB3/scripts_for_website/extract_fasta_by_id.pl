#!usr/bin/perl
#program:extract_fasta_by_id.pl
#Author:zhanghm
#Date: Tue Apr  2 12:14:59 2013

use strict;
use Getopt::Long;
use File::Basename;

my($id,$fasta,$out,$help);
GetOptions(
	'help|h' => \$help,
	'i:s' => \$id,
	'f:s' => \$fasta,
	'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        zhanghm   zhm.2009.happy@163.com
description:
		this program will extract the fasta sequence by id
options:
-h	--help	:print help info
-i	:input the id file
-f	:input fasta sequence file
-o	:output the extracted fasta file
e.g.:
#	perl $0 
USAGE
}

if(!(defined $id && defined $fasta && defined $out) || defined $help)
{
	&usage();
	exit 0;
}

#read in id file
open(IN,"<$id") or die "can not open $id\n";
my %id;
while(<IN>)
{
	chomp;
	my ($id)=(split)[0];
	$id{$id}=1;
}
close IN;

#read in fasta file and print out the result
open(IN2,"<$fasta") or die "can not open $fasta\n";
open(OUT,">$out") or die "can not open $out\n";
$/=">";
while(<IN2>)
{
	chomp;
	my $id="";
	$_=~/^(\S+)?\s/;
	$id=$1;
	if(exists $id{$id})
	{
		print OUT ">$_";
	}
}
$/="\n";
close IN2;
close OUT;
