import React from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WelcomePage from "./components/WelcomePage";
import HomeScreen from "./components/HomeScreen";
import Pokedex from "./components/Pokedex";
import PokemonTypeList from "./components/PokemonTypeList";
import Pokemon from "./components/Pokemon";
import DailyCard from "./components/DailyCard";
import ItemsAndLocations from "./components/ItemsAndLocations";

export type AppStack = {
  WelcomePage: undefined;
  HomeScreen: undefined;
  Pokedex: {
    name: string;
    description: string;
  };
  PokemonTypeList: {
    url: string;
    name: string;
  };
  Pokemon: {
    url: string;
  };
  DailyCard: undefined;
  ItemsAndLocations: {
    name: string;
    description: string;
    panel_info: string;
    url_part: string;
  };
};

const Stack = createNativeStackNavigator<AppStack>();

declare global {
  interface Window {
    api_url: string;
  }
}

window.api_url = "https://pokeapi.co/api/v2/";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="Home"
          initialRouteName="WelcomePage"
        >
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name="PokemonTypeList" component={PokemonTypeList} />
          <Stack.Screen name="Pokemon" component={Pokemon} />
          <Stack.Screen name="DailyCard" component={DailyCard} />
          <Stack.Screen
            name="ItemsAndLocations"
            component={ItemsAndLocations}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
