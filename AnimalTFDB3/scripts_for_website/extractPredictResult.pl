#!/bin/bash/perl
# Program: 
#	Extract the TF family and its matched protein and gene
# History:

use strict;
use warnings;
use Getopt::Long;
#The input options list
my ($predictResult,$extractedDir,$help,$errorLog);
GetOptions(
  'help|h' => \$help,
  'p:s' => \$predictResult,
  'e:s' => \$extractedDir,
  'r:s' => \$errorLog
);
sub usage{
  print <<USAGE
usage:
#version:       perl $0 [options]
#author:        zhanghm <zhm.2009.happy\@163.com>
#history:       2013-12-24
#desc:          Extract the predict result to a file
options:
-h	--help:print the info
-e	:input the extracted result directory 
-p	:input the predict result
-r	:the error log file name
#perl $0
USAGE
}

#Change the STDERR to errorlog file
if (!defined $errorLog){$errorLog = "errorlog";}
if (! open (STDERR, ">> ${errorLog}")){
	die "Can not open errorlog $!";
}
#Test if given the necessary options
if (defined $help || !(defined $extractedDir && defined $predictResult)){
	&usage();
	exit 0;
}

print "start extracting hmmsearch result\n";
open HMMRESULT,"<$predictResult" or die "$predictResult $!";

my $line;	
while($line = <HMMRESULT>)
{
	chomp $line;
	if ($line =~ /^Query:[\s]+([\w\-]+)/){
		my $filename;
		$filename = $1.".match";
		open OUT, "> ${extractedDir}/${filename}" or die "Can not open $filename";
	}
	if ($line =~ /E-value\s+score\s+bias\s+E-value\s+score\s+bias\s+exp\s+N\s+Sequence\s+Description/){
		<HMMRESULT>;
		while($line=<HMMRESULT>)
		{
			if($line !~/^$/)
			{
				my @data=split(/\s+/,$line);
				print OUT "$data[9]\t$data[1]\n";
			}
			if($line =~/^$/)
			{
				last;
			}
		}
	}	
	if ($line =~ m%^//$%){
		close OUT;
	}
}
close HMMRESULT;
print "extract finished!\n";
