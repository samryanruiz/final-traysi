import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice"; // Assuming you have setOrigin action in your slice
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [originPlace, setOriginPlace] = useState(null); // New state for the source location

  
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* Source location input */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View >
          <GooglePlacesAutocomplete
            placeholder="Where from?" // Change placeholder
            styles={fromInputBoxStyles} // Define fromInputBoxStyles
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              setOriginPlace({
                location: details.geometry.location,
                description: data.description,
              });
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
            }}
            enablePoweredByContainer={false}
          
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
              components: "country:PH",
              radius: "100",
            }}

           
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            keyboardShouldPersistTaps="always"
            renderRow={(data) => {
              // Custom renderRow function to filter results
              if (data.description.toLowerCase().includes("quezon city")) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setOrigin({
                          location: data.geometry?.location,
                          description: data.description,
                        })
                      );
                    }}
                  >
                
                    <Text>{data.description}</Text>
                  </TouchableOpacity>
                );
              } else {
                return null; // Do not render if the result doesn't contain "Quezon City"
              }
            }}
          />
        </View>

        {/* Destination location input */}
        <View >
          <GooglePlacesAutocomplete
            placeholder="Where from?" // Change placeholder
            styles={fromInputBoxStyles} // Define fromInputBoxStyles
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            keyboardShouldPersistTaps="always" // Add this line
          />
        </View>

        <NavFavourites />
      </View>

      {/* Ride and Eats buttons */}
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        {}
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

// Define styles for source location input box
const fromInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

// Define styles for destination location input box (already defined in your code)
const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})