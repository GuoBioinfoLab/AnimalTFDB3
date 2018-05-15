from flask import Flask
from flask_restful import Api

app = Flask(__name__)

api = Api(app)

app.config.from_object('AnimalTFDB3.settings')

app.url_map.strict_slashes = False

import AnimalTFDB3.core
import AnimalTFDB3.controllers
import AnimalTFDB3.ajax
import AnimalTFDB3.TF_predict
