import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, View, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Button, Icon, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { setPhoto } from 'app/screens/Prescriptions/actions';

class Snap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      granted: false,
    };
    
    this.takePicture = this.takePicture.bind(this);
  }

  componentWillMount = async () => {
    await this.askPermissionsAsync();
  }

  askPermissionsAsync = async () => {
    const r1 = await Permissions.askAsync(Permissions.CAMERA);
    // const r2 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (r1.status !== 'granted' || r2.status !== 'granted') {
    if (r1.status !== 'granted') {
      Alert.alert(
        'Vous devez autoriser l\' appareil photo pour cette application',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ granted: true });
    }
    
  };

  takePicture = async function() {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);

        this.props.onTakePicture(data);
        this.props.navigation.navigate('New');
      }
    };

    render() {
      const { granted } = this.state;

      if (!granted) {
        return (
          <View style={styles.container}>
            <Text>
            Vous devez autoriser l' appareil photo pour cette application
            </Text>
          </View>
        )
      }

      return (
        <View style={styles.container}>
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style = {styles.preview}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            /> 
            <View style={styles.element}>
                <Button
                icon={<Icon name='camera' color='#ffffff' />}
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Ajouter une photo' 
                onPress={this.takePicture.bind(this)}
                containerStyle={styles.containerButton}
                />
            </View> 
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
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      button: {
        margin: 15,
        backgroundColor: colors.main,
        padding: 10,
        width: '100%',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
  });

  
  function mapDispatchToProps(dispatch) {
    return {
      onTakePicture: data => dispatch(setPhoto(data)),
    };
  }
  
  const withConnect = connect(
    false,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
  )(Snap);