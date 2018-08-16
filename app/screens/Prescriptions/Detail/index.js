import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
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

        console.log(11111);
        console.log(data);

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

        const { height } = Dimensions.get('window');
        const imageHeight = height - 170;
        console.log(height);

      return (
        <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="Détail"
            />
            <View style={styles.container}>

                {
                    data.pharmacie ?
                    (<ListItem
                        key="1"
                        title={data.pharmacie || ''}
                        containerStyle={styles.item}
                    />) : false
                }
                {
                    data.date ? 
                    (<ListItem
                        key="2"
                        title={data.date || ''}
                        containerStyle={styles.item}
                    />) : false
                }
                {
                    data.comment ? 
                    (<ListItem
                        key="3"
                        title={data.comment || ''}
                        containerStyle={styles.item}
                    />) : false
                }

                <Image
                    style={{height: imageHeight, width: this.getWidth(imageHeight)}}
                    source={{uri: data.image}}
                />

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
    item: {
        width: '100%', 
        height: 30,
        alignItems: 'center', 
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        borderStyle: 'solid',
        marginBottom: 3,
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