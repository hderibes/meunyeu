import { Text, View, ScrollView,Image, SafeAreaView, StyleSheet, TouchableOpacity, Platform, StatusBar, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBooks } from '../../components/LoadBooks'

const InfoLivreScreen = ({navigation, route}) => {
  const LivreId = route.params['LivreId'];
  const { booksData } = useBooks();
  const Livre = booksData.find(booksData => booksData.id === LivreId);
  console.log(Livre.Titre)

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <TouchableOpacity
        onPress={() =>{  navigation.navigate('Main_Livres') }}
      >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name={'chevron-back'} size={40} color={'white'} />
          <Text style={styles.text_retour}>Retour</Text>
        </View>
        
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Image style={styles.couverture} source ={{uri:Livre.url_cover}}>

        </Image>
        <View style= {{flexDirection: 'row', flexWrap: 'nowrap'}}>
          <Text style={styles.labelText}>Titre : </Text>
          <Text style={styles.text}> {Livre.Titre}</Text>
        </View>
        
        <Text style={styles.text}>Auteur : {Livre.Auteur}</Text>
        <Text style={styles.text}>Date de parution : {Livre.Date}</Text>
        <Text style={styles.text}>Editeur : {Livre.Editeur}</Text>
        <Text style={styles.text}>Etagère : {Livre.Etagère}</Text>
        <Text style={styles.text}>ISBN : {Livre.ISBN}</Text>
        <Text style={styles.text}>Commentaire : {Livre.resume}</Text>
        <Text style={{marginTop:40}}></Text>



      </ScrollView>



        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B2430',
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text_retour:{
    color:'white',
    fontSize:18
  },
  scrollView: {
    marginHorizontal: 20,
  },
  labelText: {
    fontSize: 17,
    color: 'gray', 
  },
  text: {
    color:'white',
    fontSize:20,
    marginBottom:10,
  },
  couverture:{
    width:'auto',
    height:300,
    resizeMode: 'contain',
    marginBottom:50,
  },
});

export default InfoLivreScreen;
