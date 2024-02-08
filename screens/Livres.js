import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet,Image, FlatList, Platform, StatusBar  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { collection, getDocs, where, limit, query} from "firebase/firestore"; 
import db from '../firebaseConfig'


const Item = ({ title, image, auteur }) => (
  <View style={styles.item}>
    <Image
        style={styles.couverture}
        source={{uri: image}}
    />
    <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.auteur}>{auteur}</Text>
    </View>
   
  </View>
);

const LivresScreen = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [Data, setData] = React.useState([]);
  const [OriginalData, setOriginalData] = React.useState([]);

  const searchFunction = (text) => {
    const textData = text.toUpperCase();
    if (textData === "") {
      setData(OriginalData); // Utilisez la variable contenant toutes les données d'origine
      setSearchValue(text);
      return;
    }

    const updatedData = OriginalData.filter((item) => {
      const itemData = item?.Titre?.toUpperCase() || "";
      return itemData.indexOf(textData) > -1;
    });

    setData(updatedData);
    setSearchValue(text);
  };


  React.useEffect(()=>{
      AfficherLivres();
      
  },[]);

  async function AfficherLivres(){
      try{
          collection_Livres = collection(db, "Livres");
          const newData = [];
          const Livres = await getDocs(
            query(
              collection_Livres,
              where("url_cover", "!=", ""),
              limit(10)
            ));
          Livres.forEach((element) => {
            newData.push({
              id: element.id,
              Titre: element.data().Titre,
              Auteur: element.data().Auteur,
              url_cover: element.data().url_cover,
            });
        });
        setData(newData);
        setOriginalData(newData);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
      console.log(Data);
  }


  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.header}>La bibliothèque du moulin</Text>
        </View>

      <SearchBar
        placeholder="chercher un livre..."
        round
        value={searchValue}
        onChangeText={(text) => searchFunction(text)}
        autoCorrect={false}
        containerStyle={{
            backgroundColor: '#1B2430',
            borderTopWidth: 0,
            borderBottomWidth: 0
        }}
      />

      <FlatList
        data={Data}
        renderItem={({item}) => <Item title={item.Titre} image={item.url_cover} auteur={item.Auteur} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B2430',
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'white',
    textAlign: 'center',
    marginVertical: 2,
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 8,
    fontSize: 20,
    
  },
  title: {
    paddingLeft: 10,
    fontSize: 18,
    
    color:'white',
  },
  couverture: {
    aspectRatio: 18 / 24, // Remplacez 16/9 par le rapport hauteur/largeur souhaité
    height: 80,
  },
  auteur:{
    fontSize: 12,
    paddingLeft:10,    
    color: '#F0F0F2',
  }
});

export default LivresScreen;
