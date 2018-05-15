#!usr/bin/perl
##program: get the longest homologene from the blast result
#such as:
# query            Hit             hitL    queryL  coverage              	score   evalue    identity  Q_start Q_end         H_start  H_end  num_hsps
#ENSP00000394086 ENSMUSP00000103840      674     738     0.913279132791328       1798    0.0     50.1355013550135        1  734      1       678     2
#zhanghm 2010-1-4
die "input blast_out,query_len,outfile\n" if (@ARGV!=3);
($Bresult,$query_len,$outfile)=@ARGV;
open(LE,"<$query_len") or die "can not open $query_len\n";
my %pr_len;
while(<LE>)
{
	chomp;
	my ($pr,$len)=split(/\t/,$_);
	$pr_len{$pr}=$len;
}
close LE;

open(IN,"<$Bresult") or die "can not open $Bresult\n";
while($line=<IN>)
{
	chomp $line;
	@data=split("\t",$line);
#	print "$data[0]\t$data[1]\t$data[2]\t$data[3]\t$data[4]\t$data[5]\t$data[6]\n";
	if (exists $homoloG{$data[0]})
	{
		if ($data[11]>$homoloG{$data[0]}->{"score"})
		{
              $homoloG{$data[0]}->{"homoloP"} = $data[1];
              $homoloG{$data[0]}->{"identity"}=$data[2];
              $homoloG{$data[0]}->{"qs"} = $data[6];
              $homoloG{$data[0]}->{"qe"} = $data[7];
              $homoloG{$data[0]}->{"score"} = $data[11];
              $homoloG{$data[0]}->{"evalue"} = $data[10];
		}
		elsif ($data[11]==$homoloG{$data[0]}->{"score"}) 
		{
			if ($data[10] < $homoloG{$data[0]}->{"evalue"})
			{
                    $homoloG{$data[0]}->{"homoloP"} = $data[1];
                    $homoloG{$data[0]}->{"identity"}=$data[2];
                    $homoloG{$data[0]}->{"qs"} = $data[6];
                    $homoloG{$data[0]}->{"qe"} = $data[7];
                    $homoloG{$data[0]}->{"score"} = $data[11];
                    $homoloG{$data[0]}->{"evalue"} = $data[10];
			}

			elsif ($data[10]==$homoloG{$data[0]}->{"evalue"})
			{
				if ($data[2]>$homoloG{$data[0]}->{"identity"})
				{
                    $homoloG{$data[0]}->{"homoloP"} = $data[1];
                    $homoloG{$data[0]}->{"identity"}=$data[2];
					$homoloG{$data[0]}->{"qs"} = $data[6];
                    $homoloG{$data[0]}->{"qe"} = $data[7];
                    $homoloG{$data[0]}->{"score"} = $data[11];
                    $homoloG{$data[0]}->{"evalue"} = $data[10];

				}
			}
        }
	}
	else
	{
		$homoloG{$data[0]}=
			{
				"homoloP" => $data[1],
				"identity" => $data[2],
				"qs" => $data[6],
				"qe" => $data[7],
				"evalue" => $data[10],
				"score" => $data[11],
			};
	}
}
close IN;
open (OUT,">$outfile") or die "can not open $outfile\n";
foreach $key (sort keys %homoloG)
{
	my $map_len=abs($homoloG{$key}->{"qe"}-$homoloG{$key}->{"qs"}+1);
	my $cov=$map_len/$pr_len{$key};
	print OUT "$key","\t",$homoloG{$key}->{"homoloP"},"\t",$homoloG{$key}->{"evalue"},"\t",$homoloG{$key}->{"identity"},"\t";
	printf OUT "%.2f\n",$cov;
}
close OUT;
