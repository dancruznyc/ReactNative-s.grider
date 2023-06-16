import React from "react";
import { Text, StyleSheet, View } from "react-native";

const ComponentsScreen = () => {
  const greeting = <Text>"Hello, there!"</Text>;
  const myName = "Dan";
  return (
    <View>
      <Text>Getting started with React Native</Text>
      <Text style={styles.textStyle}>ComponentsScreen</Text>
      {greeting}
      <Text>My name is {myName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default ComponentsScreen;
