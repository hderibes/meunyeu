
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LivresScreen from '../screens/Livres';
import InfoLivreScreen from '../screens/Livres/InfoLivre';
import EtageresScreen from '../screens/Livres/Etageres';
import TagsScreen from '../screens/Livres/Tags';
import EmplacementsScreen from '../screens/Livres/Emplacements';
import DatesScreen from '../screens/Livres/Dates';
import CategoriesScreen from '../screens/Livres/Categories';

const Stack = createStackNavigator();

const Stack_Livres = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main_Livres" component={LivresScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Etageres" component={EtageresScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tags" component={TagsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Emplacements" component={EmplacementsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dates" component={DatesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="InfoLivre" component={InfoLivreScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Stack_Livres;
