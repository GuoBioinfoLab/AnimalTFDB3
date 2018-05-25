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
    'count':fields.Integer
}

tf_list_fields = {
    'tf_list': fields.List(fields.Nested(tf_anno)),
    'family_DBD':fields.String,
    'family_ID':fields.String,
    'tf_cofactors_list':fields.List(fields.Nested(tf_anno)),
}
count_list_fields = {
    'count_list':fields.List(fields.Nested(count_fields))
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

class TF_info(Resource):
    @marshal_with(tf_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Echinops_telfairi")
        parser.add_argument("family",default="AP-2")
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        species=args["species"]
        family=args["family"]
        ensembl=args["ensembl"]
        query=args["query"]
        mongo.db.TF_species_family_annotation.ensure_index("species")
        mongo.db.TF_species_family_annotation.ensure_index("family")
        mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        mongo.db.TF_species_family_annotation.ensure_index("alia")
        mongo.db.TF_species_family_annotation.ensure_index("protein")
        mongo.db.family_info.ensure_index("family")
        family_DBD=""
        family_ID=""
        condition1={}
        condition2={}
        condition3={}
        condition4={}
        condition5={}
        condition6={}
        if args["species"] and args["family"]:
            tf_list=list(mongo.db.TF_species_family_annotation.find({"species":species,"family":family}))
            family_info = mongo.db.family_info.find_one({"family": family})
            family_DBD = family_info["DBD"]
            family_ID = family_info["Pfam|InterPro_ID"]
        if args["ensembl"]:
            tf_list=mongo.db.TF_species_family_annotation.find_one({"ensembl":ensembl})
        if args["query"]:
            condition1["ensembl"]={"$regex":query,"$options":"$i"}
            condition2["alia"]={"$regex":query,"$options":"$i"}
            condition3["symbl"]={"$regex":query,"$options":"$i"}
            condition4["entrez"]={"$regex":query,"$options":"$i"}
            condition5["fullname"]={"$regex":query,"$options":"$i"}
            condition6["protein"]={"$regex":query,"$options":"$i"}
            tf_list = list(mongo.db.TF_species_family_annotation.find({"$or": [condition1, condition2, condition3, condition4, condition5,condition6]}))
        return {"tf_list":tf_list,"family_DBD":family_DBD,"family_ID":family_ID}
api.add_resource(TF_info, '/api/tf_annotaion')


class TF_cofactors_info(Resource):
    @marshal_with(tf_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Echinops_telfairi")
        parser.add_argument("family",default="actin")
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        species=args["species"]
        family="Transcription_Cofactors:"+args["family"]
        ensembl=args["ensembl"]
        query=args["query"]
        mongo.db.TF_cofactors_species_family_annotation.ensure_index("species")
        mongo.db.TF_cofactors_species_family_annotation.ensure_index("family")
        mongo.db.TF_cofactors_species_family_annotation.ensure_index("ensembl")
        mongo.db.TF_cofactors_species_family_annotation.ensure_index("alia")
        condition1={}
        condition2={}
        condition3={}
        condition4={}
        condition5={}
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
            tf_list=list(mongo.db.TF_cofactors_species_family_annotation.find({"$or":[condition1,condition2,condition3,condition4,condition5]}))
            # tf_list1 = list(mongo.db.TF_cofactors_species_family_annotation.find(condition1))
            # tf_list2=list(mongo.db.TF_cofactors_species_family_annotation.find(condition2))
            # tf_list3=list(mongo.db.TF_cofactors_species_family_annotation.find(condition3))
            # tf_list4=list(mongo.db.TF_cofactors_species_family_annotation.find(condition4))
            # tf_list5=list(mongo.db.TF_cofactors_species_family_annotation.find(condition5))
            # tf_list4.extend(tf_list5)
            # tf_list3.extend(tf_list4)
            # tf_list2.extend(tf_list3)
            # tf_list1.extend(tf_list2)
            # tf_list=tf_list1
        return {"tf_list":tf_list}
api.add_resource(TF_cofactors_info, '/api/tf_cofactors_annotaion')
class species_count(Resource):
    @marshal_with(count_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species",default="Echinops_telfairi")
        args = parser.parse_args()
        species=args["species"]
        mongo.db.species_count.ensure_index("species")
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
        mongo.db.family_count.ensure_index("family")
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
        mongo.db.cofactors_family_count.ensure_index("family")
        count_list=list(mongo.db.cofactors_family_count.find({"family":family}).sort([("species",1)]))
        return {"count_list":count_list}
api.add_resource(cofactors_family_count, '/api/cofactors_family_count')


class domain(Resource):
    @marshal_with(domain_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        parser.add_argument("query")
        args = parser.parse_args()
        ensembl=args["ensembl"]
        mongo.db.TF_species_family_annotation.ensure_index("ensembl")
        mongo.db.gene_pfam.ensure_index("ProteinID")
        tf_info=mongo.db.TF_species_family_annotation.find_one({"ensembl":ensembl})
        pro_batch=[]
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
        mongo.db.gene_go.ensure_index("ensembl")
        mongo.db.gene_go.ensure_index("GO_ID")
        mongo.db.gene_go.ensure_index("GO_term")
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
        return {"go_list": go_list,"tf_list":tf_list,"tf_cofactors_list":tf_cofactors_list}
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
        mongo.db.gene_pathway.ensure_index("ensembl")
        mongo.db.biocarta.ensure_index("ensembl")
        mongo.db.biocarta.ensure_index("pathID")
        mongo.db.biocarta.ensure_index("pathway_name")
        mongo.db.gene_pathway.ensure_index("pathID")
        mongo.db.gene_pathway.ensure_index("pathway_name")
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
        return {"pathway_list": pathway_list,"tf_list":tf_list,"tf_cofactors_list":tf_cofactors_list}
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
        mongo.db.gene_PPI.ensure_index("ensembl_id")
        mongo.db.gene_PPI.ensure_index("gene_id")
        mongo.db.gene_PPI.ensure_index("symbol")
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
            condition = {"$or": ensembl_list}
            tf_list = list(mongo.db.TF_species_family_annotation.find(condition))
            tf_cofactors_list = list(mongo.db.TF_cofactors_species_family_annotation.find(condition))
        return {"ppi_list": ppi_list,"tf_list":tf_list,"tf_cofactors_list":tf_cofactors_list}
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
        mongo.db.gene_ortholog.ensure_index("ensembl")
        mongo.db.gene_ortholog.ensure_index("symbol")
        mongo.db.gene_ortholog.ensure_index("ortholog_symbol")
        mongo.db.gene_ortholog.ensure_index("ortholog")
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
        return {"ortholog_list": ortholog_list,"tf_list":tf_list,"tf_cofactors_list":tf_cofactors_list}
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
        mongo.db.gene_paralog.ensure_index("ensembl")
        mongo.db.gene_paralog.ensure_index("symbol")
        mongo.db.gene_paralog.ensure_index("ortholog_symbol")
        mongo.db.gene_paralog.ensure_index("ortholog")
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
        return {"paralog_list": paralog_list,"tf_list":tf_list,'tf_cofactors_list':tf_cofactors_list}
api.add_resource(paralog, '/api/paralog')

class phenotype(Resource):
    @marshal_with(phenotype_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("ensembl")
        args = parser.parse_args()
        ensembl = args["ensembl"]
        mongo.db.gene_phenotype.ensure_index("ensembl")
        phenotype_list=list(mongo.db.gene_phenotype.find({"ensembl":ensembl}))
        return {"phenotype_list": phenotype_list}
api.add_resource(phenotype, '/api/phenotype')