#!usr/bin/perl
#program:discard_the_enzyme_gene.pl
#Author:huhui
#Date: March 19th 2018

use strict;
use Getopt::Long;
use File::Basename;

my($seq,$len,$out,$help);
GetOptions(
        'help|h' => \$help,
        's:s' => \$seq,
        'l:s' => \$len,
        'o:s' => \$out,
);

sub usage{
print <<USAGE;
usage:
#        perl $0 [options]
author
#        huhui   huhui@ hust.edu.cn
description:
                this perl will discard the enzyme gene for TF predict result
options:
-h      --help  :print help info
-s      :input enzyme ensembl list file
-l      :input TF predict result gather file
-o      :output the final TF predict result without enzyme gene
e.g.:
#       perl $0
USAGE
}

if(!(defined $seq && defined $len && defined $out) || defined $help)
{
        &usage();
        exit 0;
}

#read in each species enzyme_list file
#ENSMUSP00000059744.3
my $line;
open(IN,"$seq") or die "$seq $!\n";
my %pr2gene;
while(<IN>)
  {
        chomp;
        my $pr = (split)[0];
        my $gene =(split)[0];
        $pr2gene{$pr}=$gene;
        #print "$pr\t$gene\n";
  }
close IN;

#read in TF predict result gather file
#ENSMUSP00000059744.3    AF-4=>0
open(IN2,"$len") or die "$len $!\n";
open(OUT,">$out") or die "$out $!\n";
while(defined($line = <IN2>))
  {
#        chomp($line);
 #       if($line =~ /(^EN\S+)=>(EN\S+)\s/){
        chomp;
        my $pr = (split)[0];
        my $gene =(split)[0];
#           my $pr = $2;
       #    print "$pr\n";
           if(!exists $pr2gene{$pr})
           {
                print OUT $line,"\n";
           }
 }
close IN2;
close OUT;

