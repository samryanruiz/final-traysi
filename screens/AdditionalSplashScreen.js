import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";

import MapScreen from "./MapScreen";

const AdditionalSplashScreen = ({ navigation }) => {
  const images = [
    require("../assets/AccPrice.png"), // Replace with your image paths
    require("../assets/AccLoc.png"),
    require("../assets/SafetyAlerts.png"),
  ];

  const [screenNumber, setScreenNumber] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (screenNumber < images.length - 1) {
        setScreenNumber(screenNumber + 1);
      } else {
        clearInterval(timer);
        navigation.replace("MapScreen"); // Replace with your home screen name
      }
    }, 2000); // 2 seconds delay

    return () => clearInterval(timer);
  }, [screenNumber, navigation]);

  return (
    <ImageBackground
      source={images[screenNumber]}
      style={styles.background}
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire container
  },
});

export default AdditionalSplashScreen;
