import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ImageDetail = ({ title, imageSource, score }) => {
  console.log(imageSource);

  return (
    <View>
      <Image source={imageSource} style={{ height: 100 }} />
      <Text>{title}</Text>
      <Text>Image Score - {score}</Text>
    </View>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({});
