import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet,Image, FlatList, Platform, StatusBar, Button, TouchableOpacity  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useBooks } from '../components/LoadBooks';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
const Item = ({ title, image, auteur, navigation, id }) => (
  <TouchableOpacity
    onPress={() =>  
      navigation.navigate('InfoLivre',{LivreId:id})}  
    style = {{flex:1}}
    >
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
  </TouchableOpacity>
);

const Selection =({name, route})=>(
  <TouchableOpacity style={styles.selection_button}>
    <Text style={{color:'white'}}>{name}</Text>
  </TouchableOpacity>
)

const LivresScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const {booksData} = useBooks();
  const [Data, setData] = React.useState(booksData);

  const searchFunction = (text) => {
      const textData = text.toUpperCase();
      if (textData === ""){
        setData(booksData);
        setSearchValue(text);
      return;
      }

      const updatedData = booksData.filter((item) => {
      const itemData = item?.Titre?.toUpperCase() || "";
      return itemData.indexOf(textData) > -1;
      });

      setData(updatedData);
      setSearchValue(text);
  };

  return (

    <SafeAreaView style={styles.container}>
      <View>
          <Text style={styles.header}>La bibliothèque du moulin</Text>
      </View>
      <Button title="Logout" onPress={() => signOut(auth)}></Button>
      <View>
        <ScrollView style={styles.scroll_selecteur}>
          <Selection name="Livres"/>
          <Selection name="Livres"/>
        </ScrollView>
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
        renderItem={({item}) => <Item title={item.Titre} image={item.url_cover} auteur={item.Auteur} navigation={navigation} id={item.id} />}
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
  scroll_selecteur:{
    horizontal: true,
  },
  selection_button:{

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
