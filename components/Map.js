import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import MapViewDirections from "react-native-maps-directions";
import { selectOrigin, selectDestination, setTravelTimeInformation } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  // Function to adjust map to fit markers
  const fitMarkers = () => {
    if (mapRef.current && origin?.location && destination?.location) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin.description)}&destinations=${encodeURIComponent(destination.description)}&key=${GOOGLE_MAPS_APIKEY}`);
        const data = await response.json();
    
        if (data.status === 'OK' && data.rows.length > 0 && data.rows[0].elements.length > 0) {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        } else {
          console.error('Invalid response from the Google Maps API:', data);
        }
      } catch (error) {
        console.error('Failed to fetch travel time information:', error);
      }
    };

    getTravelTime();
  }, [origin, destination, dispatch, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
          latitude: 14.651335,
          longitude: 121.049107,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        } }
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
          onReady={fitMarkers}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
