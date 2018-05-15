#!/bin/bash/perl
# Program: 
#	Gather protein and gene by every species and the TF family it belongs to.
# History:
#	2013-12-17 zhanghm
#	2013-12-24 Moidified
# Usage:
#       perl gatherExtractResult.pl -a name_of_animal -e ../Extract_result -n GATHER -g ../Gathered_result

use strict;
use warnings;

use Getopt::Long;
use File::Basename;

#The input options list
my ($extractDir,$saveName,$help,$errorLog);
GetOptions(
  'help|h' => \$help,
  'e:s' => \$extractDir,
  'o:s' => \$saveName,
  'r:s' => \$errorLog
);
sub usage{
  print <<USAGE
usage:
#version:       perl $0 [options]
#author:        zhanghm <zhm.2009.happy\@163.com>
#history:       2013-12-24
#desc:          Gather the extract result to a file by species
options:
-h  --help:print the info
-e  :input the extract result directory
-o  :the save result filaname
-r	:the error log file name
#perl $0
USAGE
}


#Change the STDERR to errorlog file
if (!defined $errorLog){
	$errorLog = "errorlog";
}
if (! open (STDERR, ">> ${errorLog}")){
	die "Can not open errorlog $!";
}

#Test if given the necessary options
if (defined $help || !(defined $extractDir && defined $saveName)){
	&usage();
	exit 0;
}


#open the extract directory
opendir(TFFLIST,"$extractDir") or die "can not open $extractDir $!\n";

#Read every filename and open it
my $filename;
my %gather;
foreach $filename (readdir TFFLIST)
{
	next if $filename =~ /^\./;
	my $filepath = "${extractDir}/$filename";
	open (FILE,"$filepath") or die "Can not open the file : $filepath $!";
	my $line;
	while($line = <FILE>)
	{
		chomp $line;
		my ($protein,$evalue) = (split(/\t/,$line))[0,1];
		my $tfname = substr($filename,0,index($filename,"."));
		if (!exists $gather{$protein}){
			$gather{$protein} = "${tfname}=>${evalue}";
		}
		else{
			$gather{$protein} .= ";${tfname}=>${evalue}";
		}
	}
	close FILE;
}
closedir TFFLIST;

#Open the result file
open (OUT,">$saveName") or die "Can not open $saveName $!";
foreach my $key (keys %gather)
{
	print OUT $key,"\t",$gather{$key},"\n";
}
close OUT;
print "gather finished!\n";
