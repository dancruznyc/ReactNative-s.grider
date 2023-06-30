import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantList from "../components/RestaurantList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, restaurants, errorMessage] = useRestaurants();

  const filterByPrice = (price) => {
    // price === $ || $$ || $$$
    return restaurants.filter((restaurant) => restaurant.price === price);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermSubmit={() => searchApi(term)}
        onTermChange={setTerm}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <ScrollView>
        <RestaurantList
          title={"Cost Effective"}
          restaurants={filterByPrice("$")}
        />
        <RestaurantList
          title={"Moderately Priced"}
          restaurants={filterByPrice("$$")}
        />
        <RestaurantList
          title={"Bit Pricier"}
          restaurants={filterByPrice("$$$")}
        />
        <RestaurantList
          title={"Big Spender"}
          restaurants={filterByPrice("$$$$")}
        />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
