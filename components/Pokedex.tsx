import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStack } from "../App";
import { FlatList } from "react-native-gesture-handler";

import * as pokephoto from "./LocalData";
const cards = pokephoto.cards;

type PokedexProps = NativeStackScreenProps<AppStack, "Pokedex", "id_3">;

export interface pokemonTypeProps {
  results: {
    name: string;
    url: string;
    id: string;
    photo: string;
    color: string;
  }[];
}
export interface ApiDataProps {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      name: string;
      url: string;
    }
  ];
}
export interface singleItem {
  name: string;
  url: string;
  id: string;
  photo: string;
  color: string;
}

function Pokedex({ navigation, route }: PokedexProps) {
  // console.log(route.params.description);
  // console.log(route.params.name);

  const [dataFromAPI, setDataFromAPI] = useState<ApiDataProps>();
  const [dataReceived, setDataReceived] = useState(false);

  const [updatedData, setUpdatedData] = useState<pokemonTypeProps>();

  const panelInfo = "Pokedex-selectType";

  useEffect(() => {
    fetchDataAboutType();
    //console.log(cards);
  }, []);

  useEffect(() => {
    if (dataReceived && dataFromAPI !== undefined) {
      const updatedPartialData = dataFromAPI.results.map((result, index) => ({
        name: result.name,
        url: result.url,
        id: cards[index].id,
        photo: cards[index].photo,
        color: cards[index].color,
      }));
      setUpdatedData({ results: updatedPartialData });
      //console.log(updatedData);
    }
  }, [dataReceived, dataFromAPI]);

  const fetchDataAboutType = async () => {
    setDataReceived(false);
    try {
      const response = await fetch(window.api_url + "type");
      const body: ApiDataProps = await response.json();
      setDataFromAPI(body);
      //console.log(dataFromAPI);
      setDataReceived(true);
    } catch (error) {
      setDataReceived(false);
      console.log("There was an issue in ", panelInfo, ": ", error);
    }
  };

  const Item = ({ item }: any) => {
    //console.log(item);
    return (
      <>
        {item.id !== "18" && item.id !== "19" && (
          <Pressable
            style={styles.card}
            onPress={() => {
              navigation.navigate("PokemonTypeList", {
                url: item.url,
                name: item.name,
              });
            }}
          >
            <View
              style={[
                styles.colorTypeContainer,
                { backgroundColor: item.color },
              ]}
            >
              <View
                style={[styles.imageContainer, { backgroundColor: item.color }]}
              >
                <Image style={styles.image} source={item.photo} />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.pokemonTypeText}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainTitle}>
        <View style={styles.gobackWrapper}>
          <Pressable
            style={styles.goBackArrow}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.arrowBackImage}
              source={require("../assets/arrow_white.png")}
            />
          </Pressable>
          <Text style={styles.mainTitleText}>{route.params.name}</Text>
        </View>
        <Text style={styles.descriptionText}>{route.params.description}</Text>
      </View>

      <Text style={styles.selectText}>Select pokémon type</Text>
      <View style={styles.cardsHolder}>
        {!dataReceived ? (
          <ActivityIndicator style={styles.isLoading} size="large" />
        ) : (
          updatedData !== undefined && (
            <FlatList
              contentContainerStyle={{
                gap: 20,
                marginTop: 20,
                paddingBottom: 50,
              }}
              data={updatedData.results}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          )
        )}
      </View>
    </View>
  );
}
export default Pokedex;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F709C",
    fontFamily: "System",
    zIndex: -1,
  },
  mainTitle: {
    borderBottomWidth: 1,
    borderColor: "#213555",
    marginHorizontal: 15,
    marginTop: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  mainTitleText: {
    flex: 1,
    textAlign: "center",
    marginLeft: -34,
    fontWeight: "700",
    color: "#F5EFE7",
    fontSize: 26,
    marginBottom: 5,
  },
  descriptionText: {
    marginLeft: 5,
    fontWeight: "400",
    color: "#F5EFE7",
    fontSize: 16,
  },
  selectText: {
    fontWeight: "400",
    color: "#F5EFE7",
    fontSize: 26,
    marginHorizontal: 15,
    paddingLeft: 5,
    marginVertical: 5,
  },
  cardsHolder: {
    marginHorizontal: 15,
    flex: 1,
    marginBottom: 50,
  },
  card: {
    marginHorizontal: 5,
    flex: 1,
    aspectRatio: 18 / 5,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
  },
  colorTypeContainer: {
    alignSelf: "center",
    borderRadius: 10,
    width: "28%",
    aspectRatio: 1,
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
    marginRight: 15,
  },
  imageContainer: {
    padding: 5,
    alignSelf: "center",
    flex: 1,
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
    borderRadius: 10,
  },
  image: {
    backgroundColor: "#F5EFE7",
    flex: 1,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  pokemonTypeText: {
    fontSize: 22,
    color: "#213555",
    fontWeight: "400",
  },

  textContainer: {
    marginTop: 30,
    flex: 1,
    marginLeft: 20,
  },
  isLoading: {
    //backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  goBackArrow: {
    textAlign: "center",
    borderBottomWidth: 1,
    height: 34,
    width: 34,
    //marginTop: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1000,
  },
  gobackWrapper: {
    textAlign: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  arrowBackImage: {
    flex: 1,
    aspectRatio: 1,
    contentFit: "contain",
    marginBottom: 5,
  },
});
