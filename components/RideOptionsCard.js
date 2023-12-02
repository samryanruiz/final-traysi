import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector, } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Tricycle-Regular-001",
    title: "Regular",
    multiplier: 1,
    image: "https://www.iconbolt.com/preview/facebook/ionicons-regular/person.svg",
  },
  {
    id: "Tricycle-Student-002",
    title: "Discounted",
    multiplier: 0.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRllY2G-xeoq0qSoTn-fbF-w03fInQPk2vD5Wlt-Zvh-ubKmue631hbP38T6mgN-jOBgUw&usqp=CAU",
  },
  
];

// If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 20;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex-row items-center justify-between p-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl flex-grow`}>
          Select
        </Text>
        <View style={{ width: 10 }} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "PHP",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
