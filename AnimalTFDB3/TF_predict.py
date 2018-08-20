from AnimalTFDB3 import app, api
import os
import subprocess
import string
import tempfile
import shlex
from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import multiprocessing
import uuid
import json
import shutil
from pprint import pprint


def command_excute(command):
    args = shlex.split(command)
    #subprocess.check_call(args)
    with open(os.devnull, 'w') as devnull:
        subprocess.check_call(args, stdout=devnull, stderr=devnull)
class Prediction(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('input_seq')
        args = parser.parse_args()
        protein_seq=args['input_seq']
        seq_count=protein_seq.count(">")
        uuid_str=str(uuid.uuid4())
        prefix="/home/miaoyr/AnimalTFDB3/AnimalTFDB3/static/AnimalTFDB3/predict_result_tmp_file/"
        temp=prefix+uuid_str
        command="mkdir {filename}".format(filename=temp)
        command_excute(command)
        command="vi {filename}".format(filename=temp+"/input_seq.fasta")
        input_file=temp+"/input_seq.fasta"
        with open(input_file, 'w') as writer:
            writer.write(protein_seq)
        writer.close()
        command="sh /home/miaoyr/AnimalTFDB3/AnimalTFDB3/scripts_for_website/predict_TF_pipeline_animal3.0.sh -d {result_dir} -t /home/miaoyr/AnimalTFDB3_data/scripts_for_website/TF_modify2_1e-4.hmm -c /home/miaoyr/AnimalTFDB3_data/scripts_for_website/TF_1e-3.hmm -r /home/miaoyr/AnimalTFDB3_data/scripts_for_website/TF_1e-2.hmm -e /home/miaoyr/AnimalTFDB3_data/scripts_for_website/zf-C2H2_2.1e-8.hmm -a {input_seq}  -s /home/miaoyr/AnimalTFDB3_data/scripts_for_website".format(result_dir=temp,input_seq=input_file)
        command_excute(command)
        hit_count=0
        header=["TF","Family","F_e_value","B_e_value","Domain_number"]
        result_ls=[]
        with open(temp+"/TF_final_family") as reader:
            for line in reader:
                hit_count+=1
                fields=line.strip().split('\t')
                record=dict(zip(header,fields))
                result_ls.append(record)
        return {'result': result_ls,'dir':uuid_str,'hit_count':hit_count,'seq_count':seq_count}
api.add_resource(Prediction,'/api/prediction')
class blast(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('input_seq')
        parser.add_argument('program')
        parser.add_argument('evalue')
        parser.add_argument('species')
        args = parser.parse_args()
        protein_seq=args['input_seq']
        program=args['program']
        evalue=args['evalue']
        species=args['species']
        seq_count=protein_seq.count(">")
        uuid_str=str(uuid.uuid4())
        prefix="/home/miaoyr/AnimalTFDB3/AnimalTFDB3/static/AnimalTFDB3/blast_tmp_file/"
        temp=prefix+uuid_str
        command="mkdir {filename}".format(filename=temp)
        command_excute(command)
        command="vi {filename}".format(filename=temp+"/input_seq.fasta")
        input_file=temp+"/input_seq.fasta"
        with open(input_file, 'w') as writer:
            writer.write(protein_seq)
        writer.close()
        command="blastall -p {program} -i {input_file} -d {database} -o {output} -T -v 20 -e {evalue}".format(program=program,input_file=input_file, database="/home/miaoyr/AnimalTFDB3/AnimalTFDB3/blast_data/"+species, output=temp+"/blast_result", evalue=evalue)
        command_excute(command)
        result=""
        with open(temp+"/blast_result") as reader:
            for line in reader:
                result=result+line
        command="rm -rf {filename}".format(filename=temp)
        command_excute(command)
        return {"result":result}
api.add_resource(blast,'/api/blast')

def get_tempfile_name():
    temp = tempfile.NamedTemporaryFile()
    temp.close()
    return temp.name
def run_fimo(pattern_file, fasta_file, out_dir):
    command = "/home/liuwei/Softwares/meme_4.10.0/install/bin/fimo --oc {out_dir} {pattern_file} {fasta_file}".format(out_dir=out_dir, pattern_file=pattern_file, fasta_file=fasta_file)
    args = shlex.split(command)
    app.logger.debug(command)
    with open(os.devnull, 'w') as devnull:
        subprocess.check_call(args, stdout=devnull, stderr=devnull)


def extract_result(result_file, tfs=[]):
    header = ["pattern_name", "sequence_name", "start", "stop", "strand", "score", "p_value", "q_value", "matched_sequence"]
    result = []
    with open(result_file) as reader:
        for index, line in enumerate(reader):
            if not index: continue
            fields = line.strip().split("\t")
            record = dict(zip(header, fields))
            if '%' in record['pattern_name']:
                record['source'] = 'hTFtarget'
                record['tf'], record['pattern_name'] = record['pattern_name'].split('%', 1)
            else:
                record['source'] = ""
                record['tf'], record['pattern_name'] = record['pattern_name'], ""
            result.append(record)
    return result



class PredictionService(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('fasta', help="upload sequence file in fasta format")
        parser.add_argument('tfs')
        parser.add_argument('species',default="Human")
        args = parser.parse_args()
        app.logger.debug("args={}".format(args))
        if args['tfs']:
            tfs = json.loads(args['tfs'])
        else:
            tfs = []
        fasta_file = get_tempfile_name()
        with open(fasta_file, 'w') as writer:
            print >> writer,args["fasta"]
        # fasta_file = "/home/liuwei/Websites/hTFtarget-flask/hTFtarget/data/STIM1-exon.fasta"
        out_dir = get_tempfile_name()
        os.mkdir(out_dir)
        pattern_file = "/home/liuwei/Websites/hTFtarget-flask/hTFtarget/data/hTFtarget_prediction.motifs_matrix.meme"
        run_fimo(pattern_file, fasta_file, out_dir)
        fimo_result_file = os.path.join(out_dir, "fimo.txt")
        result = extract_result(fimo_result_file, tfs)
        shutil.rmtree(out_dir)
        os.remove(fasta_file)
        return {'result': list(result)}
api.add_resource(PredictionService, '/api/tfbs_prediction')
