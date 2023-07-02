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
import { FlatList } from "react-native-gesture-handler";
import SearchBar from "./SearchBar";

type TypeListProps = NativeStackScreenProps<
  AppStack,
  "PokemonTypeList",
  "id_4"
>;
export interface ApiResponse {
  pokemon: {
    name: string;
    url: string;
  };
}

function PokemonTypeList({ navigation, route }: TypeListProps) {
  const windowWidth = Dimensions.get("window").width;

  const [filtr, setFiltr] = useState(false);
  const [choosedFilter, setChoosedFilter] = useState("none");

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [dataFromAPI, setDataFromAPI] = useState<ApiResponse[]>([]);
  const [dataReceived, setDataReceived] = useState(false);

  const panelInfo = "PokemonTypeList";

  const fetchAllPokemonInThisType = async () => {
    setDataReceived(false);
    try {
      const response = await fetch(route.params.url);
      const body = await response.json();
      setDataFromAPI(body.pokemon);
      //console.log(dataFromAPI);
      setDataReceived(true);
    } catch (error) {
      setDataReceived(false);
      console.log("There was an issue in ", panelInfo, ": ", error);
    }
  };

  useEffect(() => {
    fetchAllPokemonInThisType();
  }, []);

  let sortedList: ApiResponse[] | undefined = dataReceived
    ? [...dataFromAPI].sort((a, b): any => {
        if (choosedFilter === "A-Z") {
          return a.pokemon.name > b.pokemon.name ? 1 : -1;
        }

        if (choosedFilter === "Z-A") {
          return a.pokemon.name < b.pokemon.name ? 1 : -1;
        }
        if (choosedFilter === "none") {
          return dataFromAPI;
        }
      })
    : undefined;

  const Item = ({ item }: { item: ApiResponse }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Pokemon", {
            url: item.pokemon.url,
          });
        }}
        style={styles.pokemonCard}
      >
        <Image
          style={styles.image}
          source={require("../assets/pokeball.jpg")}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.textName}>{item.pokemon.name}</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: ApiResponse }) => {
    if (searchPhrase === "") {
      return <Item item={item} />;
    }
    // filter of the name
    if (
      item.pokemon.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperFieldShadow}></View>
      <View style={styles.upperField}>
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
          <Text style={styles.mainTitleText}>
            Pokemon type: {route.params.name}
          </Text>
        </View>
        <View style={styles.options}>
          <SafeAreaView style={styles.searchbar}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </SafeAreaView>
          <Pressable
            style={styles.filters}
            onPress={() => {
              setFiltr(true);
            }}
            disabled={filtr}
          >
            <Image
              style={styles.filterImage}
              source={require("../assets/filter.png")}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.contentData}>
        {!dataReceived ? (
          <ActivityIndicator size="large" style={styles.isLoading} />
        ) : (
          <View style={styles.flatlistWrapper}>
            <FlatList
              data={sortedList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: 20,
                rowGap: windowWidth * 0.04,
              }}
              numColumns={2}
              columnWrapperStyle={{
                columnGap: windowWidth * 0.04,
              }}
              style={
                !filtr
                  ? styles.flatlist
                  : [styles.flatlist, styles.filtersActive]
              }
            />
          </View>
        )}
      </View>
      <View style={filtr ? styles.displayFiltr : styles.displayNone}>
        <View style={styles.uperSide}>
          <Pressable
            onPress={() => {
              setFiltr(false);
              setChoosedFilter("none");
            }}
          >
            <Text style={styles.textFiltr}>Anuluj</Text>
          </Pressable>
          <View style={styles.bar} />
          <Pressable
            onPress={() => {
              setFiltr(false);
            }}
          >
            <Text style={[styles.textFiltr, styles.bold]}>OK</Text>
          </Pressable>
        </View>
        <ScrollView>
          <Pressable
            style={
              choosedFilter === "A-Z"
                ? [styles.pill, styles.active]
                : styles.pill
            }
            onPress={() => {
              setChoosedFilter("A-Z");
            }}
          >
            <Text
              style={
                choosedFilter === "A-Z"
                  ? [styles.optionText, styles.textWhite]
                  : styles.optionText
              }
            >
              A-Z
            </Text>
          </Pressable>
          <Pressable
            style={
              choosedFilter === "Z-A"
                ? [styles.pill, styles.active]
                : styles.pill
            }
            onPress={() => {
              setChoosedFilter("Z-A");
            }}
          >
            <Text
              style={
                choosedFilter === "Z-A"
                  ? [styles.optionText, styles.textWhite]
                  : styles.optionText
              }
            >
              Z-A
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
export default PokemonTypeList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F709C",
    fontFamily: "System",
    zIndex: -1,
  },
  upperField: {
    height: "19%",
    //flex: 1,
    backgroundColor: "#F5EFE7",
    borderBottomLeftRadius: 30,
    //zIndex: 1,
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
  },
  upperFieldShadow: {
    height: "20%",
    position: "absolute",
    marginTop: 15,
    marginLeft: -3,
    borderBottomLeftRadius: 30,
    left: 0,
    right: 0,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    // zIndex: 0,
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
  },
  mainTitleText: {
    fontWeight: "700",
    fontSize: 26,
    textAlign: "center",
    flex: 1,
    marginLeft: -34,
    color: "#213555",
  },
  options: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 15,
    flex: 1,
    marginBottom: 5,
    alignItems: "center",
  },
  searchbar: {
    flex: 1,
    height: 40,
  },
  filters: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 6,
  },
  filterImage: {
    flex: 1,
    margin: 5,
  },
  contentData: {
    marginTop: "6%",
    flex: 1,
    marginBottom: 0,
  },
  flatlistWrapper: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 50,
    paddingTop: 5,
    //borderWidth: 1,
  },
  pokemonCard: {
    flex: 1,
    borderRadius: 10,
    aspectRatio: 0.87 / 1,
    height: 150,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 7,
  },
  image: {
    flex: 2,
    contentFit: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textWrapper: {
    flex: 1,
    backgroundColor: "#F5EFE7",
    marginTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
  },
  textName: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  flatlist: {
    marginBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  filtersActive: {
    marginBottom: -70,
  },
  displayNone: {
    display: "none",
  },
  displayFiltr: {
    backgroundColor: "#F5EFE7",
    height: "28%",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 25,
  },
  uperSide: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 36,
    marginBottom: 22,
  },
  bar: {
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    height: 5,
    marginHorizontal: 39,
    flex: 1,
    marginTop: 10,
  },
  textFiltr: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: "#1F1E1E",
    marginLeft: 15,
    marginTop: 15,
    flex: 1,
    width: 75,
  },
  bold: {
    fontWeight: "700",
    marginRight: 15,
    marginLeft: 0,
    textAlign: "right",
  },
  pill: {
    marginHorizontal: 15,
    borderRadius: 30,
    height: 39,
    marginBottom: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 23,
    color: "#1F1E1E",
  },
  textWhite: {
    color: "#fff",
  },
  active: {
    backgroundColor: "#F67546",
    alignItems: "center",
  },
  isLoading: {
    //backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
