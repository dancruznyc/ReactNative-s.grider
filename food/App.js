import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SearchScreen from "./src/screens/SearchScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen";

const navigator = createStackNavigator(
  { Search: SearchScreen, Restaurant: RestaurantScreen },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: { title: "Business Search" },
  }
);

export default createAppContainer(navigator);
