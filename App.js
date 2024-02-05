import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';


import LivresScreen from './screens/Livres';
import AjouterScreen from './screens/Ajouter';
import EmprunterScreen from './screens/Emprunter';
import AvisScreen from './screens/Avis';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Livres') {
              iconName = focused
                ? 'library' : 'library-outline';
            }
            else if (route.name == 'Ajouter'){
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            else if (route.name == 'Emprunter'){
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            }
            else if (route.name == 'Avis'){
              iconName = focused ? 'star-half' : 'star-half-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Livres" component={LivresScreen} />
        <Tab.Screen name="Ajouter" component={AjouterScreen} />
        <Tab.Screen name="Emprunter" component={EmprunterScreen} />
        <Tab.Screen name="Avis" component={AvisScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}