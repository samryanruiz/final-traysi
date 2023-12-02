import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import iconImage from "../assets/icon.png";
import titleImage from "../assets/ETRAYSI.png";

import AdditionalSplashScreen from "./AdditionalSplashScreen";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      clearTimeout(splashTimeout);
      navigation.replace("AdditionalSplashScreen");
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
        }}
        source={iconImage}
      />
      <Image
        style={{
          width: 200,
          height: 50,
          resizeMode: "contain",
        }}
        source={titleImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5FC0DE",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
