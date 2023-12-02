import React from "react";
import { StyleSheet, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { createStackNavigator } from "@react-navigation/stack";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";

import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideCalculatorCard from "../components/RideOptionsCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  // You can dispatch actions to set origin and destination as needed
  // Example:
  // dispatch(setOrigin({ location: { lat: 12.34, lng: 56.78 } }));
  // dispatch(setDestination({ location: { lat: 23.45, lng: 67.89 } }));

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
