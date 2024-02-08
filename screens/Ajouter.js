import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Vibration, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AjouterScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [scanning, setScanning] = useState('');

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanning('');
    Vibration.vibrate();
    setScanned(true);
    //alert(`ISBN ${data} scanné`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function Ajouter_manuellement(){
    console.log("Ajouter man");
  }
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
        <Text style ={styles.scanning}>{scanning}</Text>
      </View>
      <View style={styles.button_container}>
        {scanned && (
          <TouchableOpacity
          onPress={() =>{
            setScanning('Scanner un code barre');
            setScanned(false);
          }}
          style={styles.scan_again}>
            <Ionicons name={'scan'} size={28} color={'white'} />
            <Text style={{paddingTop: 6, color:'white', fontSize: 9, textAlign: 'center'}}>Scanner</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={Ajouter_manuellement}
          style={styles.roundButton}>
          <Ionicons name={'hand-left'} size={28} color={'white'} />
          <Text style={{paddingTop: 6, color:'white', fontSize: 9, textAlign: 'center'}}>Ajouter à la main</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanning:{
    flexBasis:'auto',
    top:-150,
    textAlign:'center',
    fontSize:35,
    color:'white',
  },
  button_container:{
    flexDirection:"row",
    position:'absolute',
    bottom:15,
    right:15,

  },
  roundButton:{
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1B2430',
  },
  scan_again:{
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1B2430',
    marginRight:10
  }
});