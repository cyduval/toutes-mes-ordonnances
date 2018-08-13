import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, Dimensions, Image, View, StyleSheet } from 'react-native';
import { Constants, Camera, Permissions } from 'expo';
import { Button, Icon, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { setPhoto, resetPhoto } from 'app/screens/Prescriptions/actions';

class Snap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      granted: false,
      isLoading: false,
      change: false,
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
          const options = { quality: 1, base64: true };
          const data = await this.camera.takePictureAsync(options);
  
          this.props.onTakePicture(data);
          this.setState({ isLoading: false });
        }
      }, 1000);
    };
 
    validatePicture(){
      this.props.next();
    };

    changePicture(){
      this.props.onResetPicture();
    };
    
    getWidth(h) {
      return ((h * 9) / 16);
    }

    render() {
      const { granted, isLoading } = this.state;
      const { prescription } = this.props; 

      if (!granted) {
        return (
          <View style={styles.content}>
            <Text style={styles.warning}>
            Vous devez autoriser l' appareil photo pour cette application
            </Text>
          </View>
        )
      }

      if (prescription.photo) {
        const { height } = Dimensions.get('window');
        const imageHeight = height - 230;
        return (
          <View style={styles.content}>
            <Image
                style={{height: imageHeight, width: this.getWidth(imageHeight)}}
                source={{uri: prescription.photo.uri}}
            />
            <View style={styles.buttons}>
              <Button
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Changer la photo' 
                onPress={this.changePicture.bind(this)}
                containerStyle={styles.containerButton1}
              />
              <Button
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Validez' 
                onPress={this.validatePicture.bind(this)}
                containerStyle={styles.containerButton1}
              />
            </View>
          </View>

        )
      }

      return (
        <View style={styles.content}>
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
          <Button
            icon={<Icon name='camera' color='#ffffff' />}
            fontFamily='Lato'
            buttonStyle={styles.button}
            title='Prendre photo' 
            onPress={this.takePicture.bind(this)}
            containerStyle={styles.containerButton}
            loading={isLoading}
            disabled={isLoading}
          />

        </View>       
      )

    }
  }

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    picture: {
      width: 50,
      height: 50,
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
    },
    containerButton1: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      width: '45%',
    },
    containerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      margin: 12,
      backgroundColor: colors.main,
      padding: 7,
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


  const mapStateToProps = state => ({
    prescription: state.prescription,
  });

  function mapDispatchToProps(dispatch) {
    return {
      onTakePicture: data => dispatch(setPhoto(data)),
      onResetPicture: data => dispatch(resetPhoto()),
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
  )(Snap);