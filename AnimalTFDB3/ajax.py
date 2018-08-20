import flask_restful


from AnimalTFDB3 import app, api
from AnimalTFDB3.core import mongo

from flask_restful import Resource, fields, marshal_with, reqparse, marshal
tf_anno = {
    'symbl': fields.String,
    'family': fields.String,
    'fullname': fields.String,
    'alia': fields.String,
    'protein': fields.String,
    'species': fields.String,
    'entrez':fields.String,
    'ensembl':fields.String,
    "category":fields.String,
    "gwas":fields.Boolean,
    "ppi":fields.Boolean,
    "pathway":fields.Boolean,
    "ortholog":fields.Boolean,
    "paralog":fields.Boolean,
    "phenotype":fields.Boolean,
    "expression":fields.Boolean,
    "evidence":fields.String
}
domain={
    "protein":fields.String(attribute="ProteinID"),
    "start":fields.Integer(attribute="alignmentstart"),
    "end":fields.Integer(attribute="alignmentend"),
    "pfam":fields.String(attribute="hmmacc"),
    "hmm":fields.String(attribute="hmmname"),
    "type":fields.String,
    "hmm_start":fields.Integer(attribute="hmmstart"),
    "hmm_end":fields.Integer(attribute="hmmend"),
    "hmm_length":fields.Integer(attribute="hmmlength"),
    "score":fields.Float,
    "evalue":fields.String(attribute="E-value"),
}
go={
    "category":fields.String(attribute="Category"),
    "term":fields.String(attribute="GO_term"),
    "id":fields.String(attribute="GO_ID"),
    "pubmed":fields.String(attribute="PubMed"),
    "ensembl":fields.String(),
    "evidence":fields.String(attribute="Evidence"),
    "geneID":fields.String(attribute="GeneID"),
    "tax_id":fields.String()
}
pathway={
    "id":fields.String(attribute="pathID"),
    "name":fields.String(attribute="pathway_name"),
    "source":fields.String,
    "kegg":fields.Boolean
}
ppi={
    "symbol":fields.String,
    "status":fields.String,
    "interactor_symbol":fields.String,
    "interactor_id":fields.String,
    "experimental":fields.String,
    "throughput":fields.String,
    "pubmed":fields.String(attribute="pubmed_id"),
    "source":fields.String,
    "url":fields.String,
    "tag":fields.String
}
ortholog={
    "ensembl":fields.String,
    "symbol":fields.String,
    "coverage":fields.String,
    "identity":fields.String,
    "ortholog":fields.String,
    "ortholog_symbol":fields.String,
    "ortholog_coverage":fields.String,
    "ortholog_identity":fields.String,
    "species":fields.String(attribute="ortholog_species"),
}
phenotype={
    "source":fields.String(attribute="Source_name"),
    "reference":fields.String,
    "transcript":fields.String(attribute="TranscriptID"),
    "phenotype":fields.String(attribute="Phenotype"),
    "ensembl":fields.String,
    "gene":fields.String(attribute="Gene_name"),
    "url":fields.String
}
count_fields = {
    'species':fields.String,
    'family':fields.String,
    'count':fields.Integer,
    "bold_tag":fields.Boolean
}
annotation_fields = {
    'ensembl_id': fields.String(attribute="Ensembl_gene_id"),
    'gene_id': fields.String(attribute="Entrez_id"),
    "gene_symbol": fields.String(attribute="Symbol"),
    "fullname":fields.String(attribute="full_name"),
    "biotype":fields.String,
    "orientation":fields.String(attribute="Orientation"),
    "length":fields.String,
    "position":fields.String(attribute="Position"),
    "hgnc":fields.String,
    "evidence":fields.String,
    "cross_link":fields.String,
    "summary":fields.String(),
    "alia":fields.String()
}
transcript_fields={
    "transcript":fields.String(attribute="transcript_id"),
    "name":fields.String(attribute="transcript_name"),
    "length":fields.String(attribute="transcript_length"),
    "refseq":fields.String(attribute="mRNA_refseq_id"),
    "protein":fields.String(attribute="protein_id"),
    "protein_length":fields.String(attribute="protein_length"),
    "protein_refseq":fields.String(attribute="protein_refseq_id"),
    "swiss_id":fields.String(attribute="UniProtKB/Swiss-Prot ID"),
    "trembl_id":fields.String(attribute="UniProtKB/TrEMBL ID"),
    "tf":fields.Boolean
}
exp_fields={
    "ensembl":fields.String,
    "tissue":fields.String,
    "species":fields.String,
    "exp":fields.String,
    "protein":fields.String,
    "types":fields.String,
}
gwas_fields={
    "snp":fields.String(attribute="SNPS"),
    "chr":fields.String(attribute="CHR_ID"),
    "pos":fields.String(attribute="CHR_POS"),
    "p_value":fields.String(attribute="P-VALUE"),
    "disease":fields.String(attribute="MAPPED_TRAIT"),
    "pubmed":fields.String(attribute="PUBMEDID"),
    "fre":fields.String(attribute="RISK ALLELE FREQUENCY"),
    "url":fields.String(attribute="MAPPED_TRAIT_URI"),
    "CI":fields.String(attribute="95% CI (TEXT)"),
    "or":fields.String(attribute="OR or BETA"),
    "ref":fields.String,
    "alt":fields.String,
    "fre1":fields.String(attribute="allele_fre1"),
    "fre2":fields.String(attribute="allele_fre2")
}
line_fields={
    "start":fields.String,
    "end":fields.Float,
    "height":fields.Float
}
scale_fields={
    "start":fields.Float,
    "num":fields.Float
}
transcript_structure_fields={
    "transcript":fields.String,
    "start":fields.Float,
    "height":fields.Float
}
structure_fields={
    "color":fields.String,
    "start":fields.Float,
    "length":fields.Float,
    "height":fields.Float
}
pfam_fields={
    "pfam":fields.String,
    "start":fields.Float,
    "height":fields.Float
}
tfbs_fields={
    "ensembl":fields.String,
    "tfbs":fields.String(attribute="figure"),
    "source":fields.String

}
gene_structure_list_fields={
    "line":fields.List(fields.Nested(line_fields)),
    "scale":fields.List(fields.Nested(scale_fields)),
    "transcript":fields.List(fields.Nested(transcript_structure_fields)),
    "structure":fields.List(fields.Nested(structure_fields)),
    "pfam":fields.List(fields.Nested(pfam_fields))
}
exp_list_fields={
    "tcga_exp":fields.List(fields.Nested(exp_fields)),
    "ebi_cellline":fields.List(fields.Nested(exp_fields)),
    "ebi_tissue":fields.List(fields.Nested(exp_fields)),
    "bgee_exp":fields.List(fields.Nested(exp_fields)),
    "pubmed_exp":fields.List(fields.Nested(exp_fields)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
    'protein_exp':fields.List(fields.Nested(exp_fields)),
    'protein_ls':fields.List(fields.Nested(exp_fields))

}
tf_list_fields = {
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'family_DBD':fields.String,
    'family_ID':fields.String,
    "description":fields.String,
    "reference":fields.String,
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
count_list_fields = {
    'count_list':fields.List(fields.Nested(count_fields))
}
tfbs_list_fields={
    'tfbs_list':fields.List(fields.Nested(tfbs_fields))
}
domain_list_fields = {
    'domain_list':fields.List(fields.Nested(domain))
}
go_list_fields = {
    'go_list':fields.List(fields.Nested(go)),
    'tf_list':fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
pathway_list_fields = {
    'pathway_list':fields.List(fields.Nested(pathway)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
ppi_list_fields = {
    'ppi_list':fields.List(fields.Nested(ppi)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
ortholog_list_fields = {
    'ortholog_list':fields.List(fields.Nested(ortholog)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
paralog_list_fields = {
    'paralog_list':fields.List(fields.Nested(ortholog)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
phenotype_list_fields = {
    'phenotype_list':fields.List(fields.Nested(phenotype))
}
annotation_fields_list = {
    "annotation_list":fields.List(fields.Nested(annotation_fields))
}
transcript_fields_list = {
    "transcript_list":fields.List(fields.Nested(transcript_fields)),
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
gwas_fields_list = {
    "gwas_list":fields.List(fields.Nested(gwas_fields))
}

class TFBS(Resource):
    @marshal_with(tfbs_list_fields)
    def get(self):
        parser=reqparse.RequestParser()
        parser.add_argument("ensembl")
        args = parser.parse_args()
        ensembl=args["ensembl"]
        # mongo.db.tfbs.ensure_index("ensembl")
        tfbs_list=list(mongo.db.tfbs.find({"ensembl":ensembl}))
        return({"tfbs_list":tfbs_list})
api.add_resource(TFBS,'/api/tfbs')

class TF_info(Resource):
    @marshal_with(tf_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species")
        parser.add_argument("family")
        parser.add_argument("ensembl")
        parser.add_argument("query")
        parser.add_argument("quick_search")
        args = parser.parse_args()
        species=args["species"]
        family=args["family"]
        ensembl=args["ensembl"]
        query=args["query"]
        quick_search=args["quick_search"]
        # mongo.db.TF_species_family_annotation.ensure_index("species")
        # mongo.db.TF_species_family_annotation.ensure_index("family")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_species_family_annotation.ensure_index("alia")
        # mongo.db.TF_species_family_annotation.ensure_index("protein")
        # mongo.db.tf_static.ensure_index("ensembl")
        # mongo.db.family_info.ensure_index("family")
        condition1={}
        condition2={}
        condition3={}
        condition4={}
        condition5={}
        condition6={}
        family_description=""
        family_reference=""
        family_DBD=""
        family_ID=""
        result=[]
        if args["species"] and args["family"]:
            tf_list=list(mongo.db.TF_species_family_annotation.find({"species":species,"family":family}))
            family_info = mongo.db.family_info.find_one({"family": family})
            family_DBD = family_info["DBD"]
            family_ID = family_info["Pfam|InterPro_ID"]
            family_description = family_info["description"]
            family_reference = family_info["reference"]
        if args["ensembl"]:
            tf_list=mongo.db.TF_species_family_annotation.find_one({"ensembl":ensembl})
        if args["query"]:
            condition1["ensembl"]={"$regex":query,"$options":"$i"}
            condition2["alia"]={"$regex":query,"$options":"$i"}
            condition3["symbl"]={"$regex":query,"$options":"$i"}
            condition4["entrez"]={"$regex":query,"$options":"$i"}
            condition5["fullname"]={"$regex":query,"$options":"$i"}
            condition6["protein"]={"$regex":query,"$options":"$i"}
            if quick_search=="1":
                tf_list = list(mongo.db.TF_species_family_annotation.find({"$or": [condition1, condition2, condition3, condition4]}))
            else:
                tf_list = list(mongo.db.TF_species_family_annotation.find({"$or": [condition1, condition2, condition3, condition4, condition5,condition6]}))
        if not args["ensembl"]:
            for i in range(0, len(tf_list)):
                item = tf_list[i]
                tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
                for var in tag_info:
                    item[var] = tag_info[var]
                result.append(item)
        else:
            tag_info = mongo.db.tf_static.find_one({"ensembl": tf_list["ensembl"]})
            for var in tag_info:
                tf_list[var] = tag_info[var]
            result.append(tf_list)
        return {"tf_list":result,"family_DBD":family_DBD,"family_ID":family_ID,"description":family_description,"reference":family_reference}
api.add_resource(TF_info, '/api/tf_annotaion')
class TF_cofactors_info(Resource):
    @marshal_with(tf_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Echinops_telfairi")
        parser.add_argument("family",default="actin")
        parser.add_argument("ensembl")
        parser.add_argument("query")
        parser.add_argument("quick_search")
        args = parser.parse_args()
        species=args["species"]
        family=args["family"]
        ensembl=args["ensembl"]
        query=args["query"]
        quick_search=args["quick_search"]
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("species")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("family")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("alia")
        # mongo.db.tf_static.ensure_index("ensembl")
        # mongo.db.family_info.ensure_index("family")
        condition1={}
        condition2={}
        condition3={}
        condition4={}
        condition5={}
        result=[]
        if args["species"] and args["family"]:
            tf_list=list(mongo.db.TF_cofactors_species_family_annotation.find({"species":species,"family":family}))
        if args["ensembl"]:
            tf_list=mongo.db.TF_cofactors_species_family_annotation.find_one({"ensembl":ensembl})
        if args["query"]:
            condition1["ensembl"]={"$regex":query,"$options":"$i"}
            condition2["alia"]={"$regex":query,"$options":"$i"}
            condition3["symbl"]={"$regex":query,"$options":"$i"}
            condition4["entrez"]={"$regex":query,"$options":"$i"}
            condition5["fullname"]={"$regex":query,"$options":"$i"}
            if quick_search==1:
                tf_list = list(mongo.db.TF_cofactors_species_family_annotation.find( {"$or": [condition1, condition2, condition3, condition4]}))
            else:
                tf_list=list(mongo.db.TF_cofactors_species_family_annotation.find({"$or":[condition1,condition2,condition3,condition4,condition5]}))
        if not args["ensembl"]:
            for i in range(0, len(tf_list)):
                item = tf_list[i]
                tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
                for var in tag_info:
                    item[var] = tag_info[var]
                result.append(item)
        else:
            tag_info = mongo.db.tf_static.find_one({"ensembl": tf_list["ensembl"]})
            for var in tag_info:
                tf_list[var] = tag_info[var]
            result.append(tf_list)
        return {"tf_list":result}
api.add_resource(TF_cofactors_info, '/api/tf_cofactors_annotaion')
class species_count(Resource):
    @marshal_with(count_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Echinops_telfairi")
        args = parser.parse_args()
        species=args["species"]
        # mongo.db.species_count.ensure_index("species")
        count_list=list(mongo.db.species_count.find({"species":species}).sort([("family",1)]))
        return {"count_list":count_list}
api.add_resource(species_count, '/api/species_count')
class family_count(Resource):
    @marshal_with(count_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("family",default="AF-4")
        args = parser.parse_args()
        family=args["family"]
        # mongo.db.family_count.ensure_index("family")
        count_list=list(mongo.db.family_count.find({"family":family}).sort([("species",1)]))
        return {"count_list":count_list}
api.add_resource(family_count, '/api/family_count')
class cofactors_family_count(Resource):
    @marshal_with(count_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("family",default="actin")
        args = parser.parse_args()
        family=args["family"]
        # mongo.db.cofactors_family_count.ensure_index("family")
        count_list=list(mongo.db.cofactors_family_count.find({"family":{"$regex":family,"$options":"$i"}}).sort([("species",1)]))
        return {"count_list":count_list}
api.add_resource(cofactors_family_count, '/api/cofactors_family_count')
class cofactors_species_count(Resource):
    @marshal_with(count_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Homo_sapiens")
        args = parser.parse_args()
        species=args["species"]
        # mongo.db.cofactors_species_count.ensure_index("species")
        count_list=list(mongo.db.cofactors_species_count.find({"species":species}).sort([("family",1)]))
        return {"count_list":count_list}
api.add_resource(cofactors_species_count, '/api/cofactors_species_count')
class domain(Resource):
    @marshal_with(domain_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl=args["ensembl"]
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.gene_pfam.ensure_index("ProteinID")
        tf_info=mongo.db.TF_species_family_annotation.find_one({"ensembl":ensembl})
        pro_batch=[]
        domain_list=[]
        if tf_info:
            pro=tf_info["protein"]
            for var in pro.split(";"):
                if len(var)>0:
                    pro_batch.append({"ProteinID":var})
                    domain_list=list(mongo.db.gene_pfam.find({"$or":pro_batch}))
        return {"domain_list":domain_list}
api.add_resource(domain, '/api/domain')
class go(Resource):
    @marshal_with(go_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        query = args["query"]
        # mongo.db.gene_go.ensure_index("ensembl")
        # mongo.db.gene_go.ensure_index("GO_ID")
        # mongo.db.gene_go.ensure_index("GO_term")
        # mongo.db.tf_static.ensure_index("ensembl")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        tf_list = []
        tf_cofactors_list = []
        if args["ensembl"]:
            go_list=list(mongo.db.gene_go.find({"ensembl":ensembl}))
        if args["query"]:
            go_list=list(mongo.db.gene_go.find({"$or":[{"GO_ID":{"$regex":query,"$options":"$i"}},{"GO_term":{"$regex":query,"$options":"$i"}}]}))
            ensembl_list=[]
            for item in go_list:
                ensembl_list.append({"ensembl":item["ensembl"]})
            condition={"$or":ensembl_list}
            tf_list=list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result=[]
        cofactor_result=[]
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)

        return {"go_list": go_list,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(go, '/api/go')
class pathway(Resource):
    @marshal_with(pathway_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("species")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        species=args["species"]
        query=args["query"]
        # mongo.db.gene_pathway.ensure_index("ensembl")
        # mongo.db.biocarta.ensure_index("ensembl")
        # mongo.db.biocarta.ensure_index("pathID")
        # mongo.db.biocarta.ensure_index("pathway_name")
        # mongo.db.gene_pathway.ensure_index("pathID")
        # mongo.db.tf_static.ensure_index("ensembl")
        # mongo.db.gene_pathway.ensure_index("pathway_name")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        kegg_list=[]
        tf_list = []
        tf_cofactors_list = []
        if args["ensembl"]:
            kegg_list = list(mongo.db.gene_pathway.find({"ensembl": ensembl}))
            biocarta_list = []
            if species == "Homo_sapiens" or species == "Mus musculus":
                biocarta_list = list(mongo.db.biocarta.find({"ensembl": ensembl}))
            kegg_list.extend(biocarta_list)
        if args["query"]:
            kegg_list = list(mongo.db.gene_pathway.find({"$or": [{"pathID": {"$regex": query, "$options": "$i"}},{"pathway_name": {"$regex": query, "$options": "$i"}}]}))
            biocarta_list = list(mongo.db.biocarta.find({"$or": [{"pathID": {"$regex": query, "$options": "$i"}},{"pathway_name": {"$regex": query, "$options": "$i"}}]}))
            kegg_list.extend(biocarta_list)
            ensembl_list = []
            for item in kegg_list:
                ensembl_list.append({"ensembl": item["ensembl"]})
            condition = {"$or": ensembl_list}
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        pathway_list=kegg_list
        tf_result=[]
        cofactor_result=[]
        pathway_result=[]
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"pathway_list": pathway_list,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(pathway, '/api/pathway')
class ppi(Resource):
    @marshal_with(ppi_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        query=args["query"]
        # mongo.db.gene_PPI.ensure_index("ensembl_id")
        # mongo.db.gene_PPI.ensure_index("gene_id")
        # mongo.db.gene_PPI.ensure_index("symbol")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        ppi_list=[]
        tf_list = []
        tf_cofactors_list = []
        if args["ensembl"]:
            ppi_list=list(mongo.db.gene_PPI.find({"ensembl_id":ensembl}))
        if args["query"]:
            ppi_list = list(mongo.db.gene_PPI.find({"$or": [{"gene_id": {"$regex": query, "$options": "$i"}}, {"symbol": {"$regex": query, "$options": "$i"}}]}))
            ensembl_list = []
            for item in ppi_list:
                ensembl_list.append({"ensembl": item["ensembl_id"]})
            if len(ensembl_list)>1:
                condition = {"$or": ensembl_list}
                tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
                tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result = []
        cofactor_result = []
        ppi_result = []
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"ppi_list": ppi_list,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(ppi, '/api/ppi')
class ortholog(Resource):
    @marshal_with(ortholog_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        query=args["query"]
        # mongo.db.gene_ortholog.ensure_index("ensembl")
        # mongo.db.gene_ortholog.ensure_index("symbol")
        # mongo.db.gene_ortholog.ensure_index("ortholog_symbol")
        # mongo.db.gene_ortholog.ensure_index("ortholog")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        # mongo.db.tf_static.ensure_index("ensembl")
        tf_list = []
        tf_cofactors_list = []
        if args["ensembl"]:
            ortholog_list=list(mongo.db.gene_ortholog.find({"ensembl":ensembl}))
        if args["query"]:
            ortholog_list = list(mongo.db.gene_ortholog.find({"$or": [{"ortholog": {"$regex": query, "$options": "$i"}},{"ortholog_symbol": {"$regex": query, "$options": "$i"}}]}))
            ensembl_list = []
            for item in ortholog_list:
                ensembl_list.append({"ensembl": item["ensembl"]})
            condition = {"$or": ensembl_list}
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result = []
        cofactor_result = []
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"ortholog_list": ortholog_list,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(ortholog, '/api/ortholog')
class paralog(Resource):
    @marshal_with(paralog_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        query=args["query"]
        # mongo.db.gene_paralog.ensure_index("ensembl")
        # mongo.db.gene_paralog.ensure_index("symbol")
        # mongo.db.gene_paralog.ensure_index("ortholog_symbol")
        # mongo.db.gene_paralog.ensure_index("ortholog")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        # mongo.db.tf_static.ensure_index("ensembl")
        tf_list=[]
        tf_cofactors_list=[]
        if args["ensembl"]:
            paralog_list=list(mongo.db.gene_paralog.find({"ensembl":ensembl}))
        if args["query"]:
            paralog_list=list(mongo.db.gene_paralog.find({"$or": [{"ortholog": {"$regex": query, "$options": "$i"}},{"ortholog_symbol": {"$regex": query, "$options": "$i"}}]}))
            ensembl_list = []
            for item in paralog_list:
                ensembl_list.append({"ensembl": item["ensembl"]})
            condition = {"$or": ensembl_list}
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result = []
        cofactor_result = []
        paralog_result = []
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"paralog_list": paralog_list,"tf_list":tf_result,'tf_cofactors_list':cofactor_result}
api.add_resource(paralog, '/api/paralog')
class phenotype(Resource):
    @marshal_with(phenotype_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        # mongo.db.gene_phenotype.ensure_index("ensembl")
        phenotype_list=list(mongo.db.gene_phenotype.find({"ensembl":ensembl}))
        return {"phenotype_list": phenotype_list}
api.add_resource(phenotype, '/api/phenotype')
class annotation(Resource):
    @marshal_with(annotation_fields_list)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        # mongo.db.gene_annotation.ensure_index("Ensembl_gene_id")
        annotation_list = mongo.db.gene_annotation.find_one({"Ensembl_gene_id": ensembl})
        return {"annotation_list": annotation_list}
api.add_resource(annotation, '/api/annotation')
class transcript(Resource):
    @marshal_with(transcript_fields_list)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("transcript")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        transcript=args["transcript"]
        # mongo.db.gene_transcript_protein.ensure_index("gene_id")
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        # mongo.db.tf_static.ensure_index("ensembl")
        transcript_list=[]
        tf_list=[]
        tf_cofactors_list=[]
        if args["ensembl"]:
            transcript_list = list(mongo.db.gene_transcript_protein.find({"gene_id": ensembl}))
        if args["transcript"]:
            result=list(mongo.db.gene_transcript_protein.find({"transcript_id": transcript}))
            ensembl_list=[]
            for item in result:
                ensembl_list.append({"ensembl": item["gene_id"]})
            condition = {"$or": ensembl_list}
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result = []
        cofactor_result = []
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"transcript_list": transcript_list,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(transcript,'/api/transcript')
class expression(Resource):
    @marshal_with(exp_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("species")
        parser.add_argument("tissue")
        parser.add_argument("pro_tissue")
        parser.add_argument("exp")
        parser.add_argument("threshold")
        parser.add_argument("protein")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        species=args["species"]
        tissue=args["tissue"]
        exp=args["exp"]
        protein=args["protein"]
        threshold=args["threshold"]
        if threshold and  threshold.startswith(">"):
            threshold=threshold.strip(">")
        pro_tissue=args["pro_tissue"]
        tcga_exp=[]
        ebi_cellline=[]
        ebi_tissue=[]
        bgee_exp=[]
        ensembl_list=[]
        result=[]
        tf_list=[]
        tf_cofactors_list=[]
        protein_ls=[]
        protein_exp=[]
        cancer_ls=["ACC","BLCA","BRCA","CESC","CHOL","COAD","DLBC","ESCA","GBM","HNSC","KICH","KIRC","KIRP","LAML","LGG", "LIHC","LUAD","LUSC","OV","PRAD","READ","SKCM","STAD","STES","THCA","UCEC","UCS","MESO","PCPG","SARC","TGCT","THYM","UVM"]
        if protein:
            protein_exp = list(mongo.db.protein_exp.find({"ensembl": ensembl}).sort([("exp", 1)]))
            # protein_exp = list(mongo.db.protein_exp.find({"ensembl": ensembl,"exp":{"$gte":float(threshold)}}))
            result=protein_exp
        if pro_tissue:
            protein_exp = list(mongo.db.protein_exp.find({ "tissue":pro_tissue,"exp": {"$gte": float(threshold)}}))
            result = protein_exp
        if ensembl:
            tcga_exp = list(mongo.db.human_exp_tcga.find({"ensembl": ensembl}).sort([("exp",1)]))
            ebi_cellline = list(mongo.db.human_exp_cellline.find({"ensembl": ensembl}).sort([("exp",1)]))
            ebi_tissue = list(mongo.db.human_exp_tissue.find({"ensembl": ensembl}).sort([("exp",1)]))
            bgee_exp = list(mongo.db.bgee_exp.find({"ensembl": ensembl}).sort([("exp",1)]))
            protein_exp = list(mongo.db.protein_exp.find({"ensembl": ensembl}).sort([("exp", 1)]))
            pubmed_exp = list(mongo.db.expression_pubmed.find({"ensembl":ensembl}).sort([("types",1),("exp",1)]))
            if len(protein_exp)>1:
                protein_ls=list(mongo.db.tf_protein.find({"ensembl":ensembl}))
        if tissue and species=="Homo_sapiens":
            condition1={"tissue":{'$regex':tissue,'$options':'i'},"species":species,"exp":{"$gte":float(threshold)}}
            condition2={"tissue":{'$regex':tissue,'$options':'i'},"exp":{"$gte":float(threshold)}}
            if tissue in cancer_ls:
                result=list(mongo.db.human_exp_tcga.find(condition2))
            else:
                cellline=list(mongo.db.EBI_cellline.find({"cellline":tissue}))
                if len(cellline)>0:
                    result=list(mongo.db.human_exp_cellline.find(condition2))
                else:
                    ebi_tissue = list(mongo.db.human_exp_tissue.find(condition1))
                    bgee_exp = list(mongo.db.bgee_exp.find(condition1))
                    ebi_tissue.extend(bgee_exp)
                    result=ebi_tissue
        for item in result:
            ensembl_list.append({"ensembl": item["ensembl"]})
        condition = {"$or": ensembl_list}
        if len(ensembl_list)>0:
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        tf_result=[]
        cofactor_result=[]
        for i in range(0, len(tf_list)):
            item = tf_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            tf_result.append(item)
        for i in range(0, len(tf_cofactors_list)):
            item = tf_cofactors_list[i]
            tag_info = mongo.db.tf_static.find_one({"ensembl": item["ensembl"]})
            for var in tag_info:
                item[var] = tag_info[var]
            cofactor_result.append(item)
        return {"tcga_exp":tcga_exp,"ebi_cellline":ebi_cellline,"ebi_tissue":ebi_tissue,"bgee_exp":bgee_exp,"pubmed_exp":pubmed_exp,'protein_exp':protein_exp,"protein_ls":protein_ls,"tf_list":tf_result,"tf_cofactors_list":cofactor_result}
api.add_resource(expression,'/api/expression')
class gwas(Resource):
    @marshal_with(gwas_fields_list)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        # mongo.db.tf_dbsnp.ensure_index("ensembl")
        # mongo.db.gwas_basic.ensure_index("SNPS")
        tfs=list(mongo.db.tf_dbsnp.find({"ensembl":ensembl}))
        snp_list=[]
        snps=[]
        for item in tfs:
            snp_list.append({"SNPS": item["dbsnp"]})
        condition = {"$or": snp_list}
        if len(snp_list)>1:
            snps=list(mongo.db.gwas_basic.find(condition))
        return {"gwas_list":snps}
api.add_resource(gwas,'/api/gwas')
class structure(Resource):
    @marshal_with(gene_structure_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        args=parser.parse_args()
        ensembl = args["ensembl"]
        # mongo.db.gene_structure.ensure_index("ensembl")
        result=mongo.db.gene_structure.find_one({"ensembl":ensembl})
        # mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        # mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        line=result["line"]
        scale=result["scale"]
        transcript=result["transcript"]
        structure=result["structure"]
        return {"line":line,"scale":scale,"transcript":transcript,"structure":structure}
api.add_resource(structure,'/api/structure')
class domain_structure(Resource):
    @marshal_with(gene_structure_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("protein")
        args=parser.parse_args()
        protein = args["protein"]
        # mongo.db.domain_structure.ensure_index("protein")
        result=mongo.db.domain_structure.find_one({"protein":protein})
        line=result["line"]
        scale=result["scale"]
        pfam=result["pfam"]
        structure=result["structure"]
        return {"line":line,"scale":scale,"pfam":pfam,"structure":structure}
api.add_resource(domain_structure,'/api/domain_structure')
