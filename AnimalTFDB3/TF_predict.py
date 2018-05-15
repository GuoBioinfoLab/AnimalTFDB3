from AnimalTFDB3 import app, api
import os
import subprocess
import string
import tempfile
import shlex
from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import multiprocessing
import uuid

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
