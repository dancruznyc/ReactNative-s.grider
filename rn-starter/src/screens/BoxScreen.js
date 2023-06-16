import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BoxScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Box 1</Text>
      <Text style={styles.textStyleTwo}>Box 2</Text>
      <Text style={styles.textStyleThree}>Box 3</Text>
    </View>
  );
};

export default BoxScreen;

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  textStyle: {
    borderWidth: 3,
    borderColor: "red",
    position: "relative",
  },
  textStyleTwo: {
    borderWidth: 3,
    borderColor: "red",
    position: "relative",
  },
  textStyleThree: {
    borderWidth: 3,
    borderColor: "red",
    position: "absolute",
    bottom: -50,
  },
});
