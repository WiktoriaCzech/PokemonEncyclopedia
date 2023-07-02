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

type ItemsProps = NativeStackScreenProps<AppStack, "ItemsAndLocations", "id_7">;

export interface ApiDataProps {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
}

function ItemsAndLocations({ navigation, route }: ItemsProps) {
  const [dataFromAPI, setDataFromAPI] = useState<ApiDataProps>();
  const [dataReceived, setDataReceived] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  const panelInfo = route.params.panel_info;

  const fetchDataAboutItems = async () => {
    setDataReceived(false);
    try {
      const response = await fetch(
        window.api_url +
          route.params.url_part +
          "?offset=" +
          offset +
          "&limit=" +
          limit
      );
      const body: ApiDataProps = await response.json();
      setDataFromAPI(body);
      //console.log(dataFromAPI);
      setDataReceived(true);
    } catch (error) {
      setDataReceived(false);
      console.log("There was an issue in ", panelInfo, ": ", error);
    }
  };

  useEffect(() => {
    fetchDataAboutItems();
  }, [offset]);

  const Item = ({ item }: any) => {
    //console.log(item);
    return (
      <View style={[styles.cardShadowWrapper, styles.shadow]}>
        <View style={styles.card}>
          <View style={[styles.smallSquare, styles.shadow]} />
          <View style={styles.textContainer}>
            <Text style={styles.ItemText}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  const listName = route.params.name;

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

      <Text style={styles.selectText}>
        List of all {listName.charAt(0).toLowerCase() + listName.slice(1)}
      </Text>
      <View style={styles.cardsHolder}>
        {!dataReceived ? (
          <ActivityIndicator style={styles.isLoading} size="large" />
        ) : (
          dataFromAPI !== undefined && (
            <>
              <FlatList
                contentContainerStyle={{
                  gap: 20,
                  marginTop: 20,
                  paddingBottom: 50,
                }}
                data={dataFromAPI.results}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.name}
              />
              <View style={styles.loadMorebtn}>
                <Pressable
                  style={
                    offset === 0
                      ? styles.displayNone
                      : [styles.loadBtn, styles.shadow]
                  }
                  onPress={() => {
                    setOffset(offset - limit);
                  }}
                  disabled={offset === 0}
                >
                  <Text>Go back</Text>
                </Pressable>
                <Pressable
                  style={[styles.loadBtn, styles.shadow]}
                  onPress={() => {
                    setOffset(offset + limit);
                  }}
                  disabled={offset === 2050}
                >
                  <Text>Load more</Text>
                </Pressable>
                <Text style={styles.additionalInfo}>
                  Showing {offset + limit} out of {dataFromAPI.count}.
                </Text>
              </View>
            </>
          )
        )}
      </View>
    </View>
  );
}
export default ItemsAndLocations;
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
  cardShadowWrapper: {
    marginHorizontal: 5,
    flex: 1,
    aspectRatio: 35 / 5,
    borderRadius: 10,
    backgroundColor: "#F5EFE7",
  },
  card: {
    backgroundColor: "#D8C4B6",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
  },
  ItemText: {
    fontSize: 16,
    color: "#213555",
    fontWeight: "400",
  },

  textContainer: {
    flex: 1,
    marginLeft: 20,
  },

  isLoading: {
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
  smallSquare: {
    backgroundColor: "#F5EFE7",
    borderRadius: 5,
    marginLeft: 15,
    width: 20,
    height: 20,
  },
  shadow: {
    elevation: 6,
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
  },
  loadMorebtn: {
    paddingTop: 10,
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -25,
  },
  loadBtn: {
    backgroundColor: "#4F709C",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  additionalInfo: {
    textAlign: "center",
    alignSelf: "center",
  },

  displayNone: {
    display: "none",
  },
});
