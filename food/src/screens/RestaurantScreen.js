import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "../api/yelp";

const RestaurantScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`);
    setRestaurant(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  console.log(restaurant);
  return (
    <View>
      <Text>{restaurant?.name}</Text>
      <FlatList
        data={restaurant?.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});
