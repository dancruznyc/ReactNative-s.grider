import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import ColorCounter from "../components/ColorCounter";

const reducer = (state, action) => {
  // state === {red: num, green: num, blue: num}
  // action === {colorToChange: r||g||b}, amount: +15 || - 15
  switch (action.colorToChange) {
    case "red":
      return state.red + action.amount > 255 || state.red + action.amount < 0
        ? state
        : { ...state, red: state.red + action.amount };

    case "green":
      return state.green + action.amount > 255 ||
        state.green + action.amount < 0
        ? state
        : { ...state, green: state.green + action.amount };
    case "blue":
      return state.blue + action.amount > 255 || state.blue + action.amount < 0
        ? state
        : { ...state, blue: state.blue + action.amount };
    default:
      return state;
  }
};

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const COLOR_INCREMENT = 10;
  const { red, green, blue } = state;

  return (
    <View>
      <ColorCounter
        onIncrease={() =>
          dispatch({ colorToChange: "red", amount: COLOR_INCREMENT })
        }
        onDecrease={() => dispatch({ colorToChange: "red", amount: -10 })}
        color="Red"
      />
      <ColorCounter
        onIncrease={() => dispatch({ colorToChange: "green", amount: 10 })}
        onDecrease={() => dispatch({ colorToChange: "green", amount: -10 })}
        color="Green"
      />
      <ColorCounter
        onIncrease={() => dispatch({ colorToChange: "blue", amount: 10 })}
        onDecrease={() => dispatch({ colorToChange: "blue", amount: -10 })}
        color="Blue"
      />
      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: `rgb(${red},${green},${blue})`,
        }}
      />
    </View>
  );
};

export default SquareScreen;

const styles = StyleSheet.create({});
