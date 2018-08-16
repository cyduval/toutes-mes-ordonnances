import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Header from 'app/components/Header';

import { colors } from 'toutesmesordonnances/constants';

class Barcode extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        hasCameraPermission: null,
        cip7: '',
      };
    }

    componentDidMount() {
        this._requestCameraPermission();
    }
    
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermission: status === 'granted',
        });
    };
    
    _handleBarCodeRead = data => {
        /*
        Alert.alert(
          'Scan successful!',
          JSON.stringify(data)
        );*/
        this.setState({
            cip: JSON.stringify(data),
            cip: data.data,
          });
    };

    render() {

        return (
            <View style={styles.root}>
                <Header
                    icon="menu"
                    onPress={() => this.props.navigation.openDrawer()}
                    text="Barcode"
                />

                <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                    <Text>Camera permission is not granted</Text> :
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{ height: '80%', width: '100%' }}
                    />
                }
                <Text>{this.state.cip}</Text>
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
    button: {
      margin: 15,
      backgroundColor: colors.main,
      padding: 10,
      width: '100%',
    },
  });
  

export default Barcode;