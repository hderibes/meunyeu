
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LivresScreen from '../screens/Livres';
import infoLivreScreen from '../screens/Livres/infoLivre';

const Stack = createStackNavigator();

const Stack_Livres = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Livres" component={LivresScreen} />
      <Stack.Screen name="infoLivres" component={infoLivreScreen} />
    </Stack.Navigator>
  );
};

export default Stack_Livres;
