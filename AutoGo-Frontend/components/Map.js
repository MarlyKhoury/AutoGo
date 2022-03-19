import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(()=>{
        if (!origin || !destination) return;

        // Zoom & Fit markers
        mapRef.current.fitToSuppliedMarkers([origin, destination])

    },[origin, destination])

  return (
    <MapView
    ref={mapRef}
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >
      {origin && destination &&(
          <MapViewDirections
             origin =  {origin.description}
             destination = {destination.description}
             apikey = {GOOGLE_MAPS_APIKEY}
             strokeWidth={3}
             strokeColor="black"
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
            identifier="Destination"
          
          />
      )}
      </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})