import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import pandas as pd
import requests
import requests
from bs4 import BeautifulSoup

cred = credentials.Certificate('./Key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

df = pd.read_excel ('./Bibli.xlsx')
nb_isbn = nb_auteur=nb_titre =nb_editeurs =nb_date =nb_resume =nb_cover = 0

def extract_resume(url):
    try:
        # Effectuer la requête HTTP pour récupérer le contenu de la page
        response = requests.get(url)
        response.raise_for_status()

        # Analyser le contenu HTML avec BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Trouver le conteneur spécifié par l'ID
        container_id = "descript" 
        container = soup.find(id=container_id)

        # Extraire le texte entre les balises <br><br> s'il y a un conteneur
        if container:
            content = container.get_text(separator='\n')  # Utiliser '\n' comme séparateur entre les lignes
            print(content)
            return content
        else: return 0

    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la requête HTTP : {e}")
    except Exception as e:
        print(f"Une erreur s'est produite : {e}")
def verify(q):
    if str(q)=="nan":
        return ""
    else:
        return q
def verify_ISBN(q):
    global nb_isbn
    if str(q)=="nan":
        return 0
    else:
        nb_isbn +=1
        return q 
def verify_Titre(records, q):
    global nb_titre
    if  str(q) == "nan":
        if records:
            first_record = next(iter(records.values()), None)
            data = first_record['data']
            if 'title' in data:
                title_encode = data['title']
                try:
                    title = title_encode.encode('latin-1').decode('utf-8')
                    print("Titre = ", title)
                    nb_titre +=1
                    print(title)
                    return title
                except Exception as e:
                    print(title + " " + e)
                    exit()
                    #return ""                
            else:
                print("pas de titre")
                return ""
        else: return ""
    else:
        print(q)
        nb_titre +=1
        return q
def verify_Editeur(records, q):
    global nb_editeurs
    if str(q) == "nan":
        if records:
            first_record = next(iter(records.values()), None)
            data = first_record['data']
            if 'publishers' in data:
                Editeur_info = data['publishers'][0]
                Editeur = Editeur_info['name']
                print("Editeur = ", Editeur)
                nb_editeurs+=1
                return Editeur
        else: return ""
    nb_editeurs+=1
    return q
def verify_Auteur(records, q):
    global nb_auteur
    if str(q) == "nan":
        if records:
            first_record = next(iter(records.values()), None)
            data = first_record['data']
            if 'authors' in data:
                Auteur_info = data['authors'][0]
                if 'name' in Auteur_info:
                    Auteur = Auteur_info['name']
                    print("Auteur = ", Auteur)
                    nb_auteur +=1
                    return Auteur
                else: return ""
            else: return ""
        else: return""
    nb_auteur +=1
    return q
def verify_Date(records, q):
    global nb_date
    if str(q) == "nan":
        if records:
            first_record = next(iter(records.values()), None)
            data = first_record['data']
            if 'publish_date' in data:
                date = data['publish_date']
                print("date = ", date)
                nb_date+=1
                return date
            else: return ""
        else: return ""
    nb_date+=1
    return q
def cover(records):
    global nb_cover
    if records !=0:
        first_record = next(iter(records.values()), None)
        data = first_record['data']
        if 'cover' in data:
            cover = data['cover']
            if 'medium' in cover:
                url = cover['medium']
                print("url =", url)
                nb_cover+=1
                return url
    return ""
def verify_Serie(records, q):

    if str(q) == "nan":
        if records:
            first_record = next(iter(records.values()), None)
            data = first_record['details']
            details = data['details']
            if 'series' in details:
                series = details['series']
                serie = series[0]
                print("Serie= ", serie)
                return serie
            else: return ""
        else: return ""
    return q
def add_resume(records):
    global nb_resume
    if records != 0:
        first_record = next(iter(records.values()), None)
        data = first_record['details']
        if 'preview_url' in data:
            url = data['preview_url']
            resume = extract_resume(url)
            if resume != 0:
                nb_resume+=1
                return resume
            else: return "Pas de commentaire pour ce livre"
        else: return "Pas de commentaire pour ce livre"
    return "Pas de commentaire pour ce livre"

def from_excel_to_firestore():
    for i in range(len(df)):
        isbn = int(verify_ISBN(df.iloc[i,17]))
        print(isbn)
        if  isbn !=0 : 
            records = get_records_from_isbn(isbn)
        else: 
            records = 0
        livre_info = {
            # 'Carton'    :verify(df.iloc[i,1]),
            # 'Collection':verify(df.iloc[i,2]),
            # 'Editeur'   :verify_Editeur(records, df.iloc[i,3]),
            # 'N°'        :verify(df.iloc[i,4]),
            # 'Série'     :verify_Serie(records, df.iloc[i,5]),
            # 'Auteur'    :verify_Auteur(records, df.iloc[i,6]),
            'Titre'     :verify_Titre(records, df.iloc[i,7]),
            # 'Etagère'   :verify(df.iloc[i,8]),
            # 'Catégories':verify(df.iloc[i,9]),
            # 'Tags'      :verify(df.iloc[i,10]), 
            # 'langue'    :verify(df.iloc[i,11]), 
            # 'Editeur.1' :verify(df.iloc[i,12]),
            # 'Date'      :verify_Date(records, df.iloc[i,13]),
            # 'édition'   :verify(df.iloc[i,14]),
            # 'dédicacé'  :verify(df.iloc[i,15]),
            # 'relié'     :verify(df.iloc[i,16]),
            # 'url_cover' :cover(records),
            # 'resume'    :add_resume(records),
            # 'ISBN-13'   : isbn
        }
        # print(livre_info)
        # db.collection('Livres').add(livre_info)

def get_records_from_isbn(isbn):
    
    open_library_url = f'http://openlibrary.org/api/volumes/brief/isbn/{isbn}.json'

    try:
        r = requests.get(open_library_url)
        r.raise_for_status()  # Raise an exception for HTTP errors
        r_dict = r.json()

        # Check if 'records' key exists in the response
        if 'records' in r_dict:
            records = r_dict['records']

            # Check if 'records' is a non-empty dictionary
            if records and isinstance(records, dict):
                return records
            else: return 0
        else: return 0
                
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return 0
    

from_excel_to_firestore()
# # print("isbn {}, titre {}, editeur {}, date {}, resume {}, cover {}".format(nb_isbn, nb_titre, nb_editeurs, nb_date, nb_resume, nb_cover))

# print( len(df))
