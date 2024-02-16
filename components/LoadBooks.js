import { collection, getDocs, where, limit, query, } from "firebase/firestore"; 
import {db} from '../firebaseConfig';

export async function LivresForCategories (nom, nb_livres) {
  try{
    collection_Livres = collection(db, "Livres");
    const newData = [];
    const Livres = await getDocs(
      query(
        collection_Livres,
        where("Etagère", "==", nom),
        limit(1)
      ));
    Livres.forEach((element) => {
      newData.push({
        id: element.id,
        Titre: element.data().Titre,
        Auteur: element.data().Auteur,
        url_cover: element.data().url_cover != "" ?
          element.data().url_cover:
          'https://servimg.eyrolles.com/static/media/4987/9788883704987_internet_w290.jpg',
        resume : element.data().resume,
        Date : element.data().Date,
        Editeur : element.data().Editeur,
        ISBN : element.data()['ISBN-13'],
      });
    });
    
    return newData;
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
  }
}
