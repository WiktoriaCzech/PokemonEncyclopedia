import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStack } from "../App";

export interface ApiResponse {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

type PokemonProps = NativeStackScreenProps<AppStack, "Pokemon", "id_5">;
function Pokemon({ navigation, route }: PokemonProps) {
  const [dataFromAPI, setDataFromAPI] = useState<ApiResponse | null>(null);
  const [dataReceived, setDataReceived] = useState(false);

  const panelInfo = "Pokemon";
  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setDataReceived(false);
    try {
      const response = await fetch(route.params.url);
      const body = await response.json();
      setDataFromAPI(body);
      //console.log(dataFromAPI);
      setDataReceived(true);
    } catch (error) {
      setDataReceived(false);
      console.log("There was an issue in ", panelInfo, ": ", error);
    }
  };
  return (
    <View style={styles.container}>
      {!dataReceived || dataFromAPI === null ? (
        <ActivityIndicator size="large" style={styles.isLoading} />
      ) : (
        <View style={styles.wrapTheChild}>
          <ScrollView style={styles.upperFieldShadow}>
            <View style={styles.gobackWrapper}>
              <Pressable
                style={styles.goBackArrow}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={styles.arrowBackImage}
                  source={require("../assets/arrow_dark.png")}
                />
              </Pressable>
              <Text style={styles.mainTitleText}>{dataFromAPI.name}</Text>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={dataFromAPI.sprites.front_default}
                />
              </View>
              <View style={styles.displayDataWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>
                    Height: {dataFromAPI.height / 10}m
                  </Text>
                  <Text style={styles.text}>
                    Weight: {dataFromAPI.weight / 10}kg
                  </Text>
                </View>
                <Text style={[styles.text, styles.textBold]}>Types:</Text>
                <View style={styles.TypesWrapper}>
                  {dataFromAPI.types.map((singleType, index) => (
                    <Text style={[styles.text, styles.type]} key={index}>
                      {singleType.type.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.moreInfoWrapper}>
              <Text style={styles.title}>Abilities:</Text>
              {dataFromAPI.abilities.map((pokemon, index) => (
                <Text style={[styles.text, styles.list]} key={index}>
                  •{pokemon.ability.name}
                </Text>
              ))}
            </View>
            <View style={styles.moreInfoWrapper}>
              <Text style={styles.text}>
                Base experience: {dataFromAPI.base_experience} exp
              </Text>
            </View>

            <View style={[styles.moreInfoWrapper, styles.endTheList]}>
              <Text style={styles.title}>Moves:</Text>
              {dataFromAPI.moves.map((pokemonMove, index) => (
                <Text style={[styles.text, styles.list]} key={index}>
                  •{pokemonMove.move.name}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
export default Pokemon;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F709C",
    fontFamily: "System",
    zIndex: -1,
  },
  wrapTheChild: {
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 50,
    marginHorizontal: 20,
  },
  upperFieldShadow: {
    flex: 1,
    backgroundColor: "#F5EFE7",
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
  },
  arrowBackImage: {
    flex: 1,
    aspectRatio: 1,
    contentFit: "contain",
  },
  goBackArrow: {
    textAlign: "center",
    height: 34,
    width: 34,
    //marginTop: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1000,
  },
  gobackWrapper: {
    marginTop: 50,
    textAlign: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mainTitleText: {
    fontWeight: "700",
    fontSize: 26,
    textAlign: "center",
    flex: 1,
    marginLeft: -34,
    color: "#213555",
  },
  imageWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 150,
    aspectRatio: 1 / 0.87,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
    backgroundColor: "#F5EFE7",
    // borderWidth: 1,
    // borderColor: "#4F709C",
  },
  image: {
    borderRadius: 10,
    flex: 1,
    contentFit: "contain",
  },
  wrapper: {
    flexDirection: "row",
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginVertical: 5,
    fontWeight: "500",
    color: "#213555",
    fontSize: 16,
  },
  moreInfoWrapper: {
    marginHorizontal: 15,
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#F5EFE7",
    borderBottomWidth: 1,
    borderColor: "#4F709C",
  },
  isLoading: {
    //backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#213555",
    fontWeight: "600",
    fontSize: 22,
  },
  list: {
    marginLeft: 5,
  },
  textBold: {
    fontWeight: "700",
  },
  TypesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  type: {
    borderWidth: 1,
    borderColor: "#213555",
    borderRadius: 5,
    padding: 5,
  },
  displayDataWrapper: {
    flex: 1,
    marginRight: 15,
  },
  endTheList: {
    marginBottom: 20,
  },
});
