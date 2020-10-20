import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

import mapMarker from '../images/map-marker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

interface Orphanage {
  id: number;
  name: string;
  latitude: number,
  longitude: number
}

export default function OrphanagesMap() {
  const navitagion = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToOrphanageDetails(id: number) {
    navitagion.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navitagion.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -15.8050504,
          longitude: -47.9584833,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather
            name='plus'
            size={20}
            color='#FFF'
          />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 70
  },
  calloutContainer: {
    width: 168,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5',
    fontSize: 14
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,


    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center"
  },
});
