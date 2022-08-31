import React, { Fragment } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function MapTab() {
  const state = useSelector(st => st);
  const user = state.auth.user;
  const users = state.data.list?.zodiac_users?.filter(
    u => u?.uid !== user?.uid
  );

  return (
    <View style={styles.container}>
      {!!(users && users.length > 0) && (
        <MapView showsUserLocation style={styles.map}>
          {users?.map(({ location, name }, index) => {
            return (
              <Fragment key={index}>
                {!!location && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(location?.latitude) || 0,
                      longitude: parseFloat(location?.longitude) || 0,
                    }}
                    title={name}
                    description={name}
                  />
                )}
              </Fragment>
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight + 32,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
