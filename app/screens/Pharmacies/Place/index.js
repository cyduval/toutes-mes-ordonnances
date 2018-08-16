import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Constants, MapView } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';

class Place extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pharmacie: false,
        };
    }

    componentDidMount() {
        const pharmacieId = this.props.navigation.getParam('pharmacieId');    
        const pharmacie = this.props.prescription.pharmacies.find( p => p.id === pharmacieId);
        const mapRegion = {
            latitude: pharmacie.latlng.latitude, 
            longitude: pharmacie.latlng.longitude,
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421,
        };

        this.setState({
            pharmacie,
            mapRegion
         });

    }

    render() {
        const { prescription } = this.props;
        const { mapRegion, pharmacie } = this.state;
        console.log(111111);
        console.log(pharmacie);
        console.log(mapRegion);

        if (!pharmacie) {
            return (
                <View style={styles.content}>
                    <Loading />
                </View>
            );           
        }

        const { height } = Dimensions.get('window');
        const imageHeight = height - 120;

        return (
            <View style={styles.root}>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    text={pharmacie.title}
                />

                <View style={styles.container}>

                    <Text h5 style={{ padding: 7, fontWeight: '700' }}>{pharmacie.description}</Text>
                    <MapView
                        style={{ alignSelf: 'stretch', height: imageHeight }}
                        ref={MapView => (this.MapView = MapView)}
                        region={mapRegion}
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
                        <MapView.Marker
                            key="1"
                            id="1"
                            coordinate={pharmacie.latlng}
                            title={pharmacie.title}
                            description={pharmacie.description}
                        />
    
                    </MapView>
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
        // justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
    },
    item: {
        width: '100%', 
        height: 70,
        borderBottomWidth: 2,
        borderColor: '#F5F5F5',
        borderStyle: 'solid',
        marginBottom: 3,
    },
    content: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
});



const mapStateToProps = state => ({
    prescription: state.prescription,
});

function mapDispatchToProps(dispatch) {
    return {
        // onSelect: data => dispatch(setPharmacie(data)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(Place);