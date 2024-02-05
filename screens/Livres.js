import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet,Image, FlatList, Platform, StatusBar  } from 'react-native';
import { SearchBar } from 'react-native-elements';

const DATA = [
  {
    id: '1',
    title: 'Bel Ami',
    auteur:'Guy de Maupassant',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maupassant_par_Nadar.jpg/440px-Maupassant_par_Nadar.jpg'
  },
  {
    id: '2',
    title: 'Poésies imaginaires',
    auteur:'Victor Hugo',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rimbaud%2C_Po%C3%A9sies_-_022.jpg/1280px-Rimbaud%2C_Po%C3%A9sies_-_022.jpg'
  },
  {
    id: '3',
    title: 'tout sur la prépa !',
    auteur:'Les profs',
    img:'https://www.vuibert.fr/sites/default/files/produits/images/couvertures/9782311408720-g.jpg'
  },
];

const Item = ({ title, image, auteur }) => (
  <View style={styles.item}>
    <Image
        style={styles.couverture}
        source={{uri: image,}}
    />
    <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.auteur}>{auteur}</Text>
    </View>
   
  </View>
);

const LivresScreen = () => {
  const [data, setData] = useState(DATA);
  const [searchValue, setSearchValue] = useState('');

  const searchFunction = (text) => {
    const updatedData = DATA.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
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
        data={data}
        renderItem={({ item }) => <Item title={item.title} image={item.img} auteur={item.auteur} />}
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
