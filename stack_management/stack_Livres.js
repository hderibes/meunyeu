
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LivresScreen from '../screens/Livres';
import InfoLivreScreen from '../screens/Livres/InfoLivre';

const Stack = createStackNavigator();

const Stack_Livres = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main_Livres" component={LivresScreen} options={{ headerShown: false }} />
      <Stack.Screen name="InfoLivre" component={InfoLivreScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Stack_Livres;
