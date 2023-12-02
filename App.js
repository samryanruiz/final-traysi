import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, View, Text, Image } from 'react-native';
import ICON from './assets/icon.png';
import SplashScreen from './screens/SplashScreen';
import MapScreen from './screens/MapScreen';
import AdditionalSplashScreen from './screens/AdditionalSplashScreen';

const SplashStack = createStackNavigator();
function SplashStackScreen() {
  return (
    <SplashStack.Navigator>
      <SplashStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <SplashStack.Screen
        name="AdditionalSplashScreen"
        component={AdditionalSplashScreen}
        options={{ headerShown: false }}
      />
    </SplashStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#5FC0DE",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "#5FC0DE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      {/* Add other screens that should have the drawer here */}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 200,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "white",
          borderBottomWidth: 2,
        }}
      >
        <Image
          source={ICON}
          style={{
            height: 90,
            width: 112,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            marginVertical: 20,
            fontWeight: "bold",
            color: "white",
          }}
        >
          E-TRAYSI
        </Text>
      </View>
      {/* Add other drawer items here */}
    </SafeAreaView>
  );
}

export default function App() {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  useEffect(() => {
    // Example: set isSplashComplete to true after a delay
    const timer = setTimeout(() => {
      setIsSplashComplete(true);
    }, 7000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isSplashComplete ? (
          <MainDrawerNavigator />
        ) : (
          <SplashStackScreen />
        )}
      </NavigationContainer>
    </Provider>
  );
}
