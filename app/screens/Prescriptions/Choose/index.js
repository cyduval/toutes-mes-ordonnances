import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Overlay, Button } from 'react-native-elements';
import { Constants, Location, Permissions, MapView } from 'expo';
import { colors } from 'toutesmesordonnances/constants';
import { setPharmacie } from 'app/screens/Prescriptions/actions';
import distance from 'toutesmesordonnances/utils/lib/distance';
import round2 from 'toutesmesordonnances/utils/lib/round2';
import Header from 'app/components/Header';

class Choose extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      granted: false,
      locationEnabled: true,
      selected: false,
      errorMessage: null,
      mapRegion: null,
      location: null,
      isVisible: false,
      distance: 0,
    };

    this.onPress = this.onPress.bind(this);
  }


    componentWillMount = async () => {
      await this.askPermissionsAsync();
    }

    askPermissionsAsync = async () => {
      const r = await Permissions.askAsync(Permissions.LOCATION);
      if (r.status !== 'granted') {
        Alert.alert(
          'La fonction location doit etre activée pour que l\'application fonctionne',
          '',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );
      } else {
        await this._getLocationAsync();
        this.setState({ granted: true });
      }
    };

    _handleMapRegionChange = mapRegion => {
        console.log(4444);
        console.log(mapRegion);
        this.setState({ mapRegion });
      };

    _checkLocationStatus = () => {
        if (!this.state.location) {
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
      try {
        let location = await Location.getCurrentPositionAsync({});
        const mapRegion = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
        this.setState({ location: location, mapRegion: mapRegion });
      } catch (error) {
        console.log(error);
        this.setState({ locationEnabled: false });
      }
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
      const { granted, locationEnabled } = this.state;

      if (!granted) {
        return (
          <View style={styles.root}>
            <Header
              onPress={() => this.props.navigation.goBack()}
              text="Trouver ma pharmacie"
            />
            <View style={styles.container}>
              <Text style={styles.warning}>
                Vous devez autoriser l'application à acceder à votre localisation
              </Text>
            </View>
          </View>
        )
      }
      if (!locationEnabled) {
        return (
          <View style={styles.root}>
            <Header
              onPress={() => this.props.navigation.goBack()}
              text="Trouver ma pharmacie"
            />
            <View style={styles.container}>
              <Text style={styles.warning}>
                La fonction location doit etre activée pour que l'application fonctionne
              </Text>
            </View>
          </View>
        )
      }

      return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="Trouver ma pharmacie"
          />
          <View style={styles.container}>
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
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: Constants.statusBarHeight,
    },
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      width: '100%',
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
    warning: {
      margin: 5,
      fontSize: 16,
      padding: 5,
      textAlign: 'center',
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