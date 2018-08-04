import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Platform, View, StyleSheet } from 'react-native';
import { Text, Overlay, Button } from 'react-native-elements';
import { Constants, Location, Permissions, MapView } from 'expo';
import { colors } from 'toutesmesordonnances/constants';
import { setPharmacie } from 'app/screens/Prescriptions/actions';
import distance from 'toutesmesordonnances/utils/lib/distance';
import round2 from 'toutesmesordonnances/utils/lib/round2';

class Choose extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      errorMessage: null,
      mapRegion: null,
      hasLocationPermissions: false,
      location: null,
      locationResult: null,
      isVisible: false,
      distance: 0,
    };

    this.onPress = this.onPress.bind(this);
  }


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

    _handleMapRegionChange = mapRegion => {
        console.log(4444);
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

        this.setState({ locationResult: location });
        this.setState({ location: location });
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      };

    onPress = function(event, pharmacieId) {
      console.log(2345);
      console.log(event);
      const { location } = this.state;
      const pharmacie = this.props.prescription.pharmacies.find( p => p.id === pharmacieId);

      const dist = `${pharmacie.title} (${round2(distance(location.coords.latitude, location.coords.longitude, pharmacie.latlng.latitude, pharmacie.latlng.longitude))} km)`;
      const mapRegion = { latitude: event.coordinate.latitude, longitude: event.coordinate.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
      this.setState({selected: pharmacie, isVisible: true, distance: dist, mapRegion: mapRegion});
    };

    onSelect = function() {
      const { selected } = this.state;
      this.props.onSelect(selected);
      this.props.navigation.navigate('New');
    };
    
    render() {
      const { prescription } = this.props;
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }

      console.log(this.state);
      return (
        <View style={styles.container}>
            <Text style={[styles.paragraph, { display: 'none' }]}>{text}</Text>
            {
            this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.hasLocationPermissions === false ?
                <Text>Location permissions are not granted.</Text> :
                this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                    style={{ alignSelf: 'stretch', height: '100%' }}
                    ref={MapView => (this.MapView = MapView)}
                    region={this.state.mapRegion}
                    loadingEnabled = {true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    moveOnMarkerPress = {false}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsPointsOfInterest = {false}
                    provider="google"
                    // onRegionChange={this._handleMapRegionChange}
                >
                {prescription.pharmacies.map((marker) => {
                    
                    return (<MapView.Marker
                        key={marker.id}
                        id={marker.id}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        onPress={(e) => this.onPress(e.nativeEvent, marker.id)}
                    />);
                    }
                )}
                </MapView>
            }   

            <Overlay
              isVisible={this.state.isVisible}
              onBackdropPress={() => this.setState({isVisible: false})}
              height={200}
            >
              <Text h5 style={{ fontWeight: '700' }}>{this.state.distance}</Text>
              <Text h5>{this.state.selected.description}</Text>
            
              <View style={styles.chooseActions}>
                <Button
                  buttonStyle={styles.chooseButton1}
                  title='Annuler' 
                  onPress={() => this.setState({isVisible: false})}
                  containerStyle={styles.containerButton}
                />
                <Button
                  buttonStyle={styles.chooseButton2}
                  title='Choisir' 
                  onPress={() => { this.setState({isVisible: false}); this.onSelect(); } }
                  containerStyle={styles.containerButton}
                />
              </View>
            </Overlay>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15,
    },
    chooseActions: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButton: {
      margin: 10,
    },
    chooseButton1: {
      margin: 5,
      backgroundColor: '#f10031',
      padding: 5,
    },
    chooseButton2: {
      margin: 5,
      backgroundColor: colors.main,
      padding: 5,
    },  
  });


const mapStateToProps = state => ({
  prescription: state.prescription,
});

function mapDispatchToProps(dispatch) {
  return {
    onSelect: data => dispatch(setPharmacie(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Choose);