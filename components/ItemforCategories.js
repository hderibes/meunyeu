

import { Text, View, SafeAreaView, StyleSheet,Image, FlatList, Platform, StatusBar, Button, TouchableOpacity  } from 'react-native';


const ItemforCategories = ({ title, image, auteur, navigation, id }) => (
    <TouchableOpacity
      onPress={() =>  
        navigation.navigate('InfoLivre',{LivreId:id})}  
      style = {styles.book_container}
      >
      <Image
          style={styles.couverture}
          source={{uri: image}}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.auteur}>{auteur}</Text>
      </View>
    </TouchableOpacity>
  );

    const styles = StyleSheet.create({


    book_container:{
        margin:10,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        maxWidth:150,
    },

    title: {
        fontSize: 18,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
    },
    couverture: {
        margin:2,
        aspectRatio: 18 / 24, // Remplacez 16/9 par le rapport hauteur/largeur souhaité
        height: 80,
    },
    auteur:{
        fontSize: 14,
        paddingLeft:10,    
        color: 'black',
        textAlign:'center',

    },
    })

export default ItemforCategories;