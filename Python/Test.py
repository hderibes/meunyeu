import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate('./Key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection("Livres").document("00jtFQalO6Sgt2eqRDLi")

doc = doc_ref.get()

if doc.exists:
    #print(f"Document data: {doc.to_dict()}")
    auteur = doc.to_dict()['Carton']
    print(auteur)
else:
    print("No such document!")


