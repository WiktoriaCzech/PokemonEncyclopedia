import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStack } from "../App";
import { FlatList } from "react-native-gesture-handler";

type HomeScreenProps = NativeStackScreenProps<AppStack, "HomeScreen", "id_2">;
type ImageSourcePropType = ImageURISource | ImageURISource[];

export interface ImageURISource {
  uri?: string | undefined;
}

export interface CardProps {
  id: string;
  name: string;
  photo: ImageSourcePropType;
  description: string;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const cards = [
    {
      id: "0",
      name: "Discover your pokemon card of the day",
      photo: require("../assets/question.jpg"),
      description: "",
    },
    {
      id: "1",
      name: "Pokédex",
      photo: require("../assets/pikathu.png"),
      description:
        "Information on various species of Pokémon that players can encounter, capture, and train in the games.",
    },
    {
      id: "2",
      name: "Items",
      photo: require("../assets/Berry_Basket.png"),
      description:
        "Items serve different purposes, such as healing Pokémon, increasing their stats, capturing wild Pokémon, enhancing battle abilities, and more.",
    },
    {
      id: "3",
      name: "Locations",
      photo: require("../assets/miasteczko.png"),
      description:
        "Locations refer to the various areas, regions, and environments where players can explore, encounter Pokémon, and engage in different activities.",
    },
  ];

  const Item = ({ item }: { item: CardProps }) => {
    return (
      <Pressable style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={item.photo} />
        </View>
        <View style={styles.textContainer}>
          {item.id !== "0" ? (
            <Text style={styles.textCard}>{item.name}</Text>
          ) : (
            <Text style={styles.discoverCard}>
              <Text style={styles.withUnderline}>{item.name.slice(0, 8)}</Text>
              {"\n" + item.name.slice(9)}
            </Text>
          )}
          {item.id !== "0" && (
            <Text style={styles.description} numberOfLines={5}>
              {item.description}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.homePageTextContainer}>
        <Text style={styles.homePageText}>
          Select the content you want to know more about
        </Text>
      </View>
      <View style={styles.cardsHolder}>
        <FlatList
          contentContainerStyle={{
            gap: 40,
            marginTop: 40,
            paddingBottom: 50,
          }}
          data={cards}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item: CardProps) => item.id}
        />
      </View>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F709C",
    fontFamily: "System",
    zIndex: -1,
  },
  homePageTextContainer: {
    borderBottomWidth: 1,
    borderColor: "#213555",
    marginHorizontal: 15,
    marginTop: 70,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  homePageText: {
    fontWeight: "700",
    color: "#F5EFE7",
    fontSize: 26,
  },
  cardsHolder: {
    //borderWidth: 1,
    marginHorizontal: 15,
    flex: 1,
    marginBottom: 50,
  },
  card: {
    marginHorizontal: 5,
    flex: 1,
    aspectRatio: 16 / 9,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  imageContainer: {
    borderRadius: 10,
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#D8C4B6",
    shadowColor: "#213555",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 10,
  },
  image: {
    backgroundColor: "#F5EFE7",
    flex: 1,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textCard: {
    fontSize: 22,
    color: "#213555",
    fontWeight: "600",
  },
  discoverCard: {
    flexDirection: "column",

    color: "#213555",
    fontWeight: "600",
    //borderWidth: 1,
    fontSize: 24,
  },
  textContainer: {
    marginTop: 30,
    flex: 1,
    marginLeft: 20,
  },
  description: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 16,
    color: "#213555",
    fontWeight: "400",
  },
  withUnderline: {
    //textDecorationLine: "underline",
    //borderWidth: 1,
    fontSize: 26,
  },
});
