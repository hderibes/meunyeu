import { Text, View, ScrollView, Image, SafeAreaView, StyleSheet, TextInput,TouchableOpacity, Platform, StatusBar, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from "react";

const AjouterManScreen = ({navigation, route}) => {

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    color:'white',
    padding: 10,
  },
});

export default AjouterManScreen;
