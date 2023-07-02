import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  PixelRatio,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStack } from "../App";
import * as SecureStore from "expo-secure-store";
import * as crypto from "expo-crypto";

type DailyCardProps = NativeStackScreenProps<AppStack, "DailyCard", "id_6">;

function DailyCard({ navigation }: DailyCardProps) {
  const [isValid, setIsValid] = useState(false);
  const [hasTimePassed, setHasTimePassed] = useState(false);
  const [readyToDrawCard, setReadyToDrawCard] = useState(true);
  const [darwID, setDrawID] = useState(0);

  const generateToken = async () => {
    const bytes = await crypto.digestStringAsync(
      crypto.CryptoDigestAlgorithm.SHA256,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
    try {
      // Store the token
      await SecureStore.setItemAsync("token", bytes);
      setIsValid(true);
    } catch (error) {
      console.log("There was an error when storing token:", error);
    }
  };

  const checkTokenValidity = async () => {
    try {
      // Retrieve token
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken) {
        setIsValid(true);
        setTimer(2000);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.log("Error at retrieving token:", error);
    }
  };

  const generatePokemonID = () => {
    const min = 1;
    const max = 1010;
    const rand = Math.floor(min + Math.random() * (max - min));
    setDrawID(rand);
    //console.log(rand);
  };

  const setTimer = (value: number) => {
    if (value === 2000) {
      setTimeout(() => {
        setHasTimePassed(true);
      }, value);
    } else {
      setTimeout(() => {
        setReadyToDrawCard(true);
      }, value);
    }
  };

  useEffect(() => {
    if (!isValid) {
      setHasTimePassed(false);
      generateToken();
    }
    checkTokenValidity();
  }, [isValid]);

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
          <Text style={styles.mainTitleText}>Daily card</Text>
        </View>
      </View>
      <View style={styles.dataContainer}>
        {isValid && hasTimePassed ? (
          <View style={styles.discoverCardContainer}>
            <View style={styles.infoWrapper}>
              <Text style={styles.instructionsText}>
                Press on the card to discover your pokemon card of the day
              </Text>
              <View style={styles.divider} />
              <Text style={[styles.instructionsText, styles.textSmall]}>
                Next draw will be available in 30 seconds, due to the
                demonstrating purposes.
              </Text>
            </View>
            <View style={styles.cardWrapper}>
              <View
                style={
                  readyToDrawCard
                    ? styles.displayNone
                    : styles.setBackgroundTint
                }
              />
              <Pressable
                style={
                  readyToDrawCard
                    ? styles.discoverCard
                    : [styles.discoverCard, styles.applyTint]
                }
                disabled={!readyToDrawCard}
                onPressIn={() => {
                  generatePokemonID();
                }}
                onPressOut={() => {
                  setTimer(30000);
                  setReadyToDrawCard(false);
                  navigation.navigate("Pokemon", {
                    url: "https://pokeapi.co/api/v2/pokemon/" + darwID,
                  });
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../assets/dailyCard.png")}
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.generateToken}>
            <Text style={styles.tokenText}>Generating token..., </Text>
            <Text style={styles.tokenText}>Please wait</Text>
            <ActivityIndicator style={styles.isLoading} size="large" />
          </View>
        )}
      </View>
    </View>
  );
}
export default DailyCard;
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
    paddingBottom: 15,
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
    textAlign: "center",
    flexDirection: "row",
  },
  arrowBackImage: {
    flex: 1,
    aspectRatio: 1,
    contentFit: "contain",
  },
  dataContainer: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 80,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
  },
  generateToken: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EFE7",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
  },
  tokenText: {
    fontWeight: "600",
    fontSize: 26,
    color: "#213555",
  },
  isLoading: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  discoverCardContainer: {
    flex: 1,
  },
  infoWrapper: {
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: "#D8C4B6",
    borderRadius: 10,

    padding: 5,
  },
  instructionsText: {
    fontSize: 24,
    color: "#213555",
    fontWeight: "400",
  },
  textSmall: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  divider: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardWrapper: {
    marginHorizontal: 15,
    marginTop: 15,
    flex: 1,
  },
  discoverCard: {
    borderRadius: 10,
    backgroundColor: "#EA2F25",
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    elevation: 3,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    aspectRatio: 0.77 / 1,
  },
  image: {
    borderRadius: 10,
    flex: 1,
    contentFit: "cover",
  },
  applyTint: {
    tintColor: "black",
    opacity: 0.7,
  },
  displayNone: {
    display: "none",
  },
  setBackgroundTint: {
    position: "absolute",
    borderWidth: 1,
    flex: 1,
    zIndex: 0,
    left: 0,
    right: 0,
    bottom: 60,
    top: 0,
    borderRadius: 10,
    backgroundColor: "#000",
  },
});
