import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: any) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="#213555"
          style={{ marginLeft: 14, marginRight: 17 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="#666666"
            style={{ padding: 1, marginRight: 10 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            color={"#213555"}
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    // marginHorizontal: 15,
  },
  searchBar__unclicked: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 6,
  },
  searchBar__clicked: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    blurRadius: 6,
    // paddingLeft: 14,
    // paddingRight: 10,
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    color: "#666666",
    flex: 1,
  },
});
