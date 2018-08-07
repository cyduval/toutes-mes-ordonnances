import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';

class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: false,
        };

        if (this.props.auth && this.props.auth.user) {
            const firestore = firebase.firestore();
            const settings = {
                timestampsInSnapshots: true
            };
            firestore.settings(settings);
            const userUid = this.props.auth.user.uid;
            const prescriptionUid = this.props.navigation.getParam('prescriptionUid');
            this.ref = firestore.collection("prescriptions").doc(prescriptionUid);

        }
    }

    componentDidMount() {
        this.ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.setState({
                    data: doc.data(),
                    loading: false,
                 });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    getWidth(h) {
        return ((h * 9) / 16);
    }

    render() {
        const { auth } = this.props;
        const { loading, data } = this.state;

        if (auth.loginStatus !== 'logged') {
          return (
            <View style={styles.root}>
              <Header
                  onPress={() => this.props.navigation.goBack()}
                  text=""
              />
              <View style={styles.container}>
                <Text style={styles.warning}>
                Vous devez etre loggué pour voir le détail de l'ordonnance
                </Text>
              </View>
            </View>
          );
        }

        if (loading) {
            return (
                <View style={styles.root}>
                  <Header
                      onPress={() => this.props.navigation.goBack()}
                      text=""
                  />
                  <View style={styles.container}>
                    <Loading />
                  </View>
                </View>
              );           
        }

        const {height, width} = Dimensions.get('window');
        const imageHeight = height - 1&0;
        console.log(height);

      return (
        <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="Détail"
            />
            <View style={styles.container}>
            <Text h5>{data.pharmacie}</Text>
            <Text h5>{data.date}</Text>
            <Image
                style={{height: imageHeight, width: this.getWidth(imageHeight)}}
                source={{uri: data.uri}}
            />

            <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
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
      alignItems: 'center', 
      height: '100%',
      width: '100%',
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
  auth: state.auth,
  app: state.app,
});

function mapDispatchToProps(dispatch) {
  return {
    // onSend: data => dispatch(sendPrescription(data)),
    // onResetPrescription: () => dispatch(resetPrescription()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Detail);