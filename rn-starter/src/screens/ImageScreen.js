import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageDetail from "../components/ImageDetail";
import forestImg from "../../assets/forest.jpg";
import beachImg from "../../assets/beach.jpg";
import mountainImg from "../../assets/mountain.jpg";

const ImageScreen = () => {
  return (
    <View>
      <ImageDetail title="Forest" imageSource={forestImg} score={9} />
      <ImageDetail title="Beach" imageSource={beachImg} score={7} />
      <ImageDetail title="Mountain" imageSource={mountainImg} score={10} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;
