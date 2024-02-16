import {useEffect, useState}from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, Platform, StatusBar, TouchableOpacity  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Entete } from '../../components/Entete.js';
import { Selecteur_mode } from '../../components/Selecteur_mode.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs, where, limit, query, orderBy, startAfter} from "firebase/firestore"; 
import {db} from '../../firebaseConfig';
import { mycolors } from '../../components/colors.js';
import { LinearGradient } from 'expo-linear-gradient';
import ItemforCategories from '../../components/ItemforCategories.js';
import { ScrollView } from 'react-native-gesture-handler';
import { LivresForCategories } from '../../components/LoadBooks.js';

const Categorie = ({nom, mycolor, navigation} )=>{
  const [livres, setLivres] = useState([]);
  const [nb_livres, setNbLivres] = useState(1);
  function incr_nb_livres(){
    setNbLivres(nb_livres+1);
  }
  useEffect(()=>{
    const fetchData = async () => {
      const livresData = await LivresForCategories(nom, nb_livres);
      setLivres(livresData);
    };
    fetchData();
    incr_nb_livres();
  },[nom]);
  return(
  <View style={styles.categorie_container}>
    <LinearGradient
        // Background Linear Gradient
        end={{x:0.5, y: 1}}
        colors={[mycolor, 'white']}
        style={styles.background}>
    <View style={styles.top_container}>
      <Text style={styles.nom_categorie}>{nom}</Text>
      <Text onPress={()=>incr_nb_livres()} style={styles.plus}>voir plus</Text>
    </View>
    
  
    <ScrollView horizontal>
          {livres.map((item) => (
            <ItemforCategories
              key={item.id}
              title={item.Titre}
              image={item.url_cover}
              auteur={item.Auteur}
              navigation={navigation}
              id={item.id}
            />
          ))}
      </ScrollView>
  </LinearGradient>
  </View>
)};


const EtageresScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  // const [Data, setData] = useState([]);
  // const [OriginalData, setOriginalData] = useState([]);
  const [nom_Etageres, setNomEtageres] = useState([]);
  useEffect(()=>{
    ChargerNomEtageres();
  },[]);

  const ChargerNomEtageres = async () => {
    try{
      collection_Etageres = collection(db, "Etagere");
      const newData = [];
      const noms = await getDocs(collection_Etageres)
      noms.forEach((element) => {
        newData.push({
          nom : element.data().nom,
          id : element.id
        });
      })
        setNomEtageres(newData);
    }catch(error){
      console.log("Etageres non chargées", error)
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
      <Selecteur_mode navigation={navigation} actual={'Etageres'}/>

      <SearchBar
        placeholder=" chercher une etagère..."
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
        data={nom_Etageres}
        renderItem={({ item }) =>{
        return (
        <Categorie
        nom = {item.nom}
        mycolor='orange'
        navigation={navigation}
        />)}}
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
  plus:{
    color:'white',
    textDecorationLine: 'underline',
    fontSize:15,
    marginRight:10,
  },
  top_container:{
    flexDirection:'row',
    justifyContent:'space-between'

  },
  liste:{
    marginBottom:160,
  },
  background:{
    flex:1,
    borderRadius:6,
  },
  categorie_container:{
    backgroundColor:'white',
    minHeight:150,
    flex:1,
    margin:6,
    borderRadius:6,
  },
  nom_categorie:{
    color:'white',
    marginLeft:10,
    fontSize:20,
    fontWeight:'bold',
  }

});

export default EtageresScreen;
