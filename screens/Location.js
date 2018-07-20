import React from 'react';
import { Platform, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Constants, Location, Permissions, IntentLauncherAndroid, MapView } from 'expo';


export default class LocationScreen extends React.Component  {
    state = {
        errorMessage: null,
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        // askEnableGps: false,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
        // alert(11);
      }

      componentWillReceiveProps() {
        alert(22);
      }

      _handleMapRegionChange = mapRegion => {
        console.log(mapRegion);
        this.setState({ mapRegion });
      };

      _checkLocationStatus = () => {
        if (!this.state.locationResult) {
            /*
            IntentLauncherAndroid.startActivityAsync(
                IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            );
            */
           this.setState({
            errorMessage: 'La fonction location doit etre activée pour que l\'application fonctionne',
          });
        }
      };

      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // alert(status);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        setTimeout(() => {
            this._checkLocationStatus();
           }, 2000);
        let location = await Location.getCurrentPositionAsync({});

        this.setState({ locationResult: JSON.stringify(location) });
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      };
    
  
      render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
          text = this.state.errorMessage;
        } else if (this.state.location) {
          text = JSON.stringify(this.state.location);
        }
    
        return (
          <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
            {
            this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.hasLocationPermissions === false ?
                <Text>Location permissions are not granted.</Text> :
                this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                style={{ alignSelf: 'stretch', height: 400 }}
                region={this.state.mapRegion}
                onRegionChange={this._handleMapRegionChange}
                />
            }
            
            <Text>
            Location: {this.state.locationResult}
            </Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
  });
