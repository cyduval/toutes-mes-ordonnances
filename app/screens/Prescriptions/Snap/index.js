import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, View, StyleSheet } from 'react-native';
import { Constants, Camera, Permissions } from 'expo';
import { Button, Icon, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { setPhoto } from 'app/screens/Prescriptions/actions';
import Header from 'app/components/Header';

class Snap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      granted: false,
      isLoading: false,
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

      this.setState({ isLoading: true });

      setTimeout(async() => {
        if (this.camera) {
          const options = { quality: 0.7, base64: true };
          const data = await this.camera.takePictureAsync(options);
  
          this.props.onTakePicture(data);
          //this.setState({ isLoading: false });
          this.props.navigation.navigate('New');
        }
      }, 1000);




    };

    render() {
      const { granted, isLoading } = this.state;

      if (!granted) {
        return (
          <View style={styles.root}>
            <Header
              onPress={() => this.props.navigation.goBack()}
              text="Trouver ma pharmacie"
            />
            <View style={styles.container}>
              <Text style={styles.warning}>
              Vous devez autoriser l' appareil photo pour cette application
              </Text>
            </View>
          </View>
        )
      }

      return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="Prendre une photo"
          />
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
                  loading={isLoading}
                  disabled={isLoading}
                />
            </View>
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
      warning: {
        margin: 5,
        fontSize: 16,
        padding: 5,
        textAlign: 'center',
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