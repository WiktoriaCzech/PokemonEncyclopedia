import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { AppStack } from "../App";

type WelcomePageProps = NativeStackScreenProps<AppStack, "WelcomePage", "id_1">;

function WelcomePage({ navigation }: WelcomePageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.mainImage} source={require("../assets/ash.png")} />
      </View>
      <View style={styles.upperFieldShadow}></View>
      <View style={styles.upperField}></View>
      <View style={styles.textField}>
        <View style={styles.textGroup}>
          <Text style={[styles.mainText, styles.firstField]}>Wellcome</Text>
          <Text style={[styles.mainText, styles.comma]}>,</Text>
        </View>
        <Text style={[styles.mainText, styles.secondField]}>to the best</Text>
        <Text style={[styles.mainText, styles.thirdField]}>Pokémon</Text>
        <Text style={[styles.mainText, styles.fourthField]}>Encyclopedia!</Text>
      </View>
      <View style={styles.btnPlacement}>
        <Pressable
          style={styles.startBtn}
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Text style={styles.btnText}>Let's start!</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default WelcomePage;

//const imageWidth = Dimensions.get("window").width - 2 * 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F709C",
    fontFamily: "System",
    zIndex: -1,
    // margin: 0,
    // padding: 0,
    // fontSize: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  upperField: {
    height: "35%",
    //flex: 1,
    backgroundColor: "#F5EFE7",
    borderBottomLeftRadius: 70,
    //zIndex: 1,
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
  },
  upperFieldShadow: {
    height: "35%",
    position: "absolute",
    marginTop: 15,
    marginLeft: -3,
    borderBottomLeftRadius: 60,
    left: 0,
    right: 0,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
  },
  textField: {
    marginTop: 15,
    flex: 1,
    marginLeft: 35,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 15,
    //marginLeft: 55,
  },
  mainText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#F5EFE7",
  },
  textGroup: {
    flexDirection: "row",
    gap: 1,
  },
  comma: {
    fontSize: 30,
    fontWeight: "400",
  },
  firstField: {
    fontSize: 30,
    fontWeight: "400",
  },
  secondField: {
    fontWeight: "400",
    fontSize: 32,
    marginTop: 5,
  },
  thirdField: {
    marginTop: 5,
  },
  fourthField: {
    marginTop: 5,
  },
  btnPlacement: {
    flex: 1,
    justifyContent: "center",
    //borderWidth: 1,
    marginHorizontal: 15,
  },
  startBtn: {
    backgroundColor: "#D8C4B6",
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    shadowColor: "#213555",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    elevation: 3,
  },
  btnText: {
    color: "#213555",
    flex: 1,
    fontWeight: "400",
    fontSize: 25,
    alignSelf: "center",
    paddingTop: 8,
    // alignContent: "center",
    alignItems: "center",
    // justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    right: -2,
    top: -5,
    marginTop: 10,
    width: "81%",
    aspectRatio: 1,
    //borderWidth: 1,
    zIndex: 2,
  },
  mainImage: {
    flex: 1,
    aspectRatio: 1,
    contentFit: "contain",
  },
});
