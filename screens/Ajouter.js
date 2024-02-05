import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';


export default function AjouterScreen() {
 
    const [type, setType] = useState(Camera.Constants.Type.back);

    return (
    <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type}>
            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row',}}>
                <TouchableOpacity
                    style={{flex: 0.1, alignSelf: 'flex-end', alignItems: 'center',}}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
    </View>
    );
}