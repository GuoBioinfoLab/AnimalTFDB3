import os
import subprocess
import string
import tempfile
import shlex
import multiprocessing
import uuid
def command_excute(command):
    args = shlex.split(command)
    #subprocess.check_call(args)
    with open(os.devnull, 'w') as devnull:
        subprocess.check_call(args, stdout=devnull, stderr=devnull)
species="all_species"
program="blastp"
uuid_str=str(uuid.uuid4())
evalue="1e-5"
prefix="/home/miaoyr/AnimalTFDB3/AnimalTFDB3/static/AnimalTFDB3/blast_tmp_file/"
temp=prefix+uuid_str
input_file="test.fasta"
command="blastall -p {program} -i {input_file} -d {database} -o {output} -T -v 20".format(program=program,input_file=input_file, database="/home/miaoyr/AnimalTFDB3/AnimalTFDB3/fasta_file/result/blast_file/"+species, output=temp)
command_excute(command)

