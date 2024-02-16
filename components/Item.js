import { Text, View, SafeAreaView, StyleSheet,Image, FlatList, Platform, StatusBar, Button, TouchableOpacity  } from 'react-native';


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

    const styles = StyleSheet.create({

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
    },
    })

export default Item;