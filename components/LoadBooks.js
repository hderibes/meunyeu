// BooksProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import db from '../firebaseConfig';// Assurez-vous d'importer votre configuration Firebase correcte

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collection_Livres = collection(db, "Livres");
        const Livres = await getDocs(
          query(
            collection_Livres,
            //where("url_cover", "!=", ""),
            limit(10)
          )
        );
        const newData = Livres.docs.map((element) => ({
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

        }));
        setBooksData(newData);
      } catch (error) {
        console.error("Erreur lors du chargement des livres :", error);
      }
      
    };

    if (booksData.length === 0) {
      fetchData();
      console.log(booksData);
    }
  }, [booksData]);

  return (
    <BooksContext.Provider value={{ booksData }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
