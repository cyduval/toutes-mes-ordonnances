import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';
import Loading from 'app/components/Loading';
import OverlayLogin from 'app/components/OverlayLogin';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      loading: true,
    };

    if (this.props.auth && this.props.auth.user) {
      const firestore = firebase.firestore();
      const settings = {
        timestampsInSnapshots: true
      };
      firestore.settings(settings);

      const userUid = this.props.auth.user.uid;
      // this.ref = firestore.collection(userUid);
      this.ref = firestore.collection('prescriptions').where("userUid", "==", userUid).orderBy("date", "desc");
      this.unsubscribe = null;
    }

  }

  componentDidMount() {
    if (this.props.auth && this.props.auth.user) {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }
  }

  componentWillUnmount() {
    if (this.props.auth && this.props.auth.user) {
      this.unsubscribe = null;
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const datas = [];
    querySnapshot.forEach((doc) => {
      const { image, date, pharmacie, uuid } = doc.data();
      datas.push({
        key: doc.id, // Document ID
        doc, // DocumentSnapshot
        pharmacie,
        date,
        image,
        uuid,
      });
    });
    this.setState({
      datas,
      loading: false,
   });
  }

    render() {
      const { auth } = this.props;
      const { datas, loading } = this.state;

      if (auth.loginStatus !== 'logged') {
        return (<OverlayLogin />);
      }

      if (loading) {
        return (
            <View style={styles.root}>
              <Header
                  onPress={() => this.props.navigation.goBack()}
                  text="Mes ordonnances"
              />
              <View style={styles.container}>
                <Loading />
              </View>
            </View>
          );           
      }

      return (
        <View style={styles.root}>
          <Header
              onPress={() => this.props.navigation.navigate('Prescriptions')}
              text="Mes ordonnances"
          />
            <View style={styles.container}>
              <ScrollView style={styles.scrollView}>
              <FlatList
                data={this.state.datas}
                renderItem={({item}) => (
                    <ListItem
                    key={item.key}
                    av-timer
                    leftIcon={{ name: "file-o", type: "font-awesome" }}
                    // leftAvatar={{ source: { uri: item.image } }}
                    title={item.date}
                    subtitle={item.pharmacie}
                    containerStyle={styles.item}
                    onPress={() => this.props.navigation.navigate('Detail',{ prescriptionUid: item.key })}
                  />
                )}
              />

              </ScrollView>
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
  scrollView: {
    flex: 1,
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
  warning: {
    margin: 5,
    fontSize: 16,
    padding: 5,
    textAlign: 'center',
  }, 
});


const mapStateToProps = state => ({
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(List);