import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmprunterScreen from '../screens/Emprunter';
import InfoEmpruntScreen from '../screens/Emprunter/InfoEmprunt';

const Stack = createStackNavigator();

const Stack_Emprunt = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main_Emprunt" component={EmprunterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Info_Emprunt" component={InfoEmpruntScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Stack_Emprunt;
