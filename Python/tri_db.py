import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
cred = credentials.Certificate('./Key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

docs = (
    db.collection("Livres")
    .where(filter=FieldFilter("`Catégories`", "!=", ""))
    .stream()
)

Etagere = []

for doc in docs:
    data = doc.to_dict()
    if(Etagere.count(data["Catégories"])==0):
       Etagere.append(data["Catégories"])
       print(data["Catégories"])
       db.collection("Categories").add({"nom": data["Catégories"]})
