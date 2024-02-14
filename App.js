import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';


import Stack_Livres from './stack_management/stack_Livres';
import Stack_Ajouter from './stack_management/stack_Ajouter';
import Stack_Emprunt from './stack_management/stack_Emprunt';
import AvisScreen from './screens/Avis';
import { BooksProvider } from './components/LoadBooks';



const Tab = createBottomTabNavigator();

export default function App() {

  return (
    // <RootNavigation />

    <BooksProvider>
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
          <Tab.Screen name="Livres" component={Stack_Livres} />
          <Tab.Screen name="Ajouter" component={Stack_Ajouter} />
          <Tab.Screen name="Emprunter" component={Stack_Emprunt} />
          <Tab.Screen name="Avis" component={AvisScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BooksProvider>
   
  );
}