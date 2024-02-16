import {useEffect, useState}from 'react';
import { Text, View, SafeAreaView, StyleSheet,Image, FlatList, Platform, StatusBar, Button, TouchableOpacity  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Entete } from '../../components/Entete.js';
import { Selecteur_mode } from '../../components/Selecteur_mode.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { collection, getDocs, where, limit, query, orderBy, startAfter} from "firebase/firestore"; 
import {db} from '../../firebaseConfig.js'
import Item from '../../components/Item.js';
import { update } from 'lodash';



const CategoriesScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [Data, setData] = useState([]);
  const [OriginalData, setOriginalData] = useState([]);

  let nb_livres = 10;
  let latestDoc=OriginalData[OriginalData.length-1];
  useEffect(()=>{
    ChargerLivres();
  },[]);


  const ChargerLivres = async () => {
    console.log("charger livres");
      try{
        collection_Livres = collection(db, "Livres");
        const newData = [];
        const Livres = await getDocs(
          query(
            collection_Livres,
            where("Titre", "!=", ""),
            orderBy("Titre"),
            startAfter(latestDoc?latestDoc.Titre: ""),
            limit(nb_livres)
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
        setData((Data) => [...Data, ...newData]);
        latestDoc=Data[Data.length-1];
        setOriginalData(newData);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
  }


  const searchFunction = async (text) => {
    const textData = text.toUpperCase();
    if (textData === ""){
      setData(OriginalData);
      setSearchValue(text);
    return;
    }
    setSearchValue(text);
    try{
      const Livres = await getDocs(
        query(
          collection_Livres,
          where("Titre", ">=", text),
          orderBy("Titre"),
          limit(10)
        ));
        const updatedData = [];
        Livres.forEach((element) => {
          updatedData.push({
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
        setData(updatedData);

    }catch(error){
      console.error("Erreur lors de la récupération des livres :", error);
    }


  };

  return (
    <View style={{flex:1, backgroundColor:'#254b7f'}}>
    <SafeAreaView style={styles.container}>
      <Entete/>
      <Selecteur_mode/>

      <SearchBar
        placeholder=" chercher un livre..."
        round
        lightTheme
        value={searchValue}
        onChangeText={(text) =>{
          searchFunction(text)}}
        autoCorrect={false}
        style={{backgroundColor:'white', borderRadius:6}}
        containerStyle={{
            backgroundColor: '#254b7f',
            borderTopWidth: 0,
            borderBottomWidth: 0
        }}
      />
      
      <FlatList
        style={styles.liste}
        data={Data}
        renderItem={({ item }) => <Item title={item.Titre} image={item.url_cover} auteur={item.Auteur} navigation={navigation} id={item.id} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() =>
          <TouchableOpacity
            onPress={()=> ChargerLivres()}
            style={{marginBottom:100, alignItems:'center'}}
          >
            <Ionicons name={"add-circle-outline"} size={30} color='white'/>
          </TouchableOpacity>
          }
      />
      

    </SafeAreaView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#254b7f",
    flexDirection: 'column',
    flexBasis:'auto',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  liste:{
    marginBottom:70,
},
});

export default CategoriesScreen;
