import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WishlistProvider } from './context/WishlistContext';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import DetailScreen from './screens/DetailScreen';
import EditScreen from './screens/EditScreen';
import { colors } from './styles/styles';
import 'react-native-get-random-values';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Detail: { id: string };
  EditItem: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function App() {
  return (
    <WishlistProvider>
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ma Liste de Souhaits' }} />
          <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Ajouter un Article' }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Détails de l\'Article' }} />
          <Stack.Screen name="EditItem" component={EditScreen} options={{ title: 'Modifier l\'Article' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}
