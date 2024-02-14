import React from 'react';
import AjouterScreen from '../screens/Ajouter';
import { createStackNavigator } from '@react-navigation/stack';
import AjouterManScreen from '../screens/Ajouter/AjouterMan';

const Stack = createStackNavigator();

const Stack_Ajouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main_Ajouter" component={AjouterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ajouter_Man" component={AjouterManScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Stack_Ajouter;
