import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, Dimensions, View, StyleSheet } from 'react-native';
import { Text, Overlay, Button } from 'react-native-elements';
import { Constants, Location, Permissions, MapView } from 'expo';
import { colors } from 'toutesmesordonnances/constants';
import { setPharmacie } from 'app/screens/Prescriptions/actions';
import distance from 'toutesmesordonnances/utils/lib/distance';
import round2 from 'toutesmesordonnances/utils/lib/round2';
import Loading from 'app/components/Loading';


const position = {
    latitude: 48.895340, 
    longitude: 2.362561,
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421,
};

class Choose extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        granted: 'initial',
        locationEnabled: 'initial',
        selected: false,
        errorMessage: null,
        // mapRegion: null,
        mapRegion: position,
        location: null,
        isVisible: false,
        distance: 0,
        loading: true,
        };

        this.onPress = this.onPress.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount = async () => {
      // await this.askPermissionsAsync();
    }

    askPermissionsAsync = async () => {
        const r = await Permissions.askAsync(Permissions.LOCATION);
        if (r.status !== 'granted') {
            this.setState({ granted: 'no', loading: false });
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
            this.setState({ granted: 'yes' });
        }
    };

    _getLocationAsync = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            const mapRegion = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
            this.setState({ location: location, mapRegion: mapRegion, locationEnabled: 'yes', loading: false });
        } catch (error) {
            console.log(error);
            this.setState({ locationEnabled: 'no', loading: false });
        }
    };

    _handleMapRegionChange = mapRegion => {
        // console.log(mapRegion);
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

    onPress (event, pharmacieId) {
        // console.log(event);
        // const { location } = this.state;
        const pharmacie = this.props.prescription.pharmacies.find( p => p.id === pharmacieId);

        // const dist = `${pharmacie.title} (${round2(distance(location.coords.latitude, location.coords.longitude, pharmacie.latlng.latitude, pharmacie.latlng.longitude))} km)`;
        const mapRegion = { latitude: event.coordinate.latitude, longitude: event.coordinate.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
        // this.setState({selected: pharmacie, isVisible: true, distance: dist, mapRegion: mapRegion});
        this.setState({selected: pharmacie, isVisible: true, distance: pharmacie.title, mapRegion: mapRegion});
    };

    onSelect () {
        const { selected } = this.state;
        this.props.onSelect(selected);
    };

    onValidate () {
        if (!this.props.prescription.pharmacie) {
            Alert.alert(
            'Vous devez choisir une pharmacie',
            '',
            [
                {text: 'Ok', onPress: () => console.log(1)},
            ],
            { cancelable: false }
            )
            return false;
        }
        this.props.next();
    };

    onBack () {
        this.props.back();
    };
    
    
    render() {
        const { prescription } = this.props;
        const { granted, loading, locationEnabled, selected } = this.state;

        /*
        if (loading) {
            return (
                <View style={styles.content}>
                <Loading />
                </View>
            );           
        }

        if (granted === 'no') {
            return (
            <View style={styles.content}>
                <Text style={styles.warning}>
                Vous devez autoriser l'application à acceder à votre localisation
                </Text>
            </View>
            )
        }
        if (locationEnabled === 'no') {
            return (
            <View style={styles.content}>
                <Text style={styles.warning}>
                La fonction location doit etre activée pour que l'application fonctionne
                </Text>
            </View>
            )
        }
        */

        const { height } = Dimensions.get('window');
        const imageHeight = height - 260;

        return (
            <View style={styles.content}>
                <MapView
                    style={{ alignSelf: 'stretch', height: imageHeight }}
                    ref={MapView => (this.MapView = MapView)}
                    region={this.state.mapRegion}
                    loadingEnabled= {true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    moveOnMarkerPress={true}
                    showsUserLocation={false}
                    showsCompass={true}
                    showsPointsOfInterest = {false}
                    provider="google"
                    // onRegionChange={this._handleMapRegionChange}
                >
                {prescription.pharmacies.map((marker) => {
                    const color = selected.id === marker.id ? 'green' : 'red';
                    return (<MapView.Marker
                        key={marker.id}
                        id={marker.id}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        pinColor={color}
                        onPress={(e) => this.onPress(e.nativeEvent, marker.id)}
                    />);
                    }
                )}
                </MapView>

                <View style={styles.buttons}>
                <Button
                    fontFamily='Lato'
                    buttonStyle={styles.button}
                    title='Retour' 
                    onPress={this.onBack.bind(this)}
                    containerStyle={styles.containerButton1}
                />
                <Button
                    fontFamily='Lato'
                    buttonStyle={styles.button}
                    title='Validez' 
                    onPress={this.onValidate.bind(this)}
                    containerStyle={styles.containerButton1}
                    disabled={!selected}
                    
                />
                </View>

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
    content: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        margin: 12,
        backgroundColor: colors.main,
        padding: 7,
        width: '100%',
    },
    containerButton1: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: '45%',
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