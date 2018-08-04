import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

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
      this.ref = firestore.collection(userUid);
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
      this.unsubscribe();
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const datas = [];
    querySnapshot.forEach((doc) => {
      const { uri, pharmacie } = doc.data();
      datas.push({
        key: doc.id, // Document ID
        doc, // DocumentSnapshot
        uri,
        pharmacie,
      });
    });
    this.setState({
      datas,
      loading: false,
   });
  }

    render() {
      const { auth } = this.props;
      const { datas } = this.state;
      if (auth.loginStatus !== 'logged') {
        return (
          <Text>
          Vous devez etre loggué pour voir vos ordonnances
        </Text>
        );
      }

      return (
        <View style={styles.container}>

            <View style={{ flex: 1, flexDirection: 'column', padding: 25 }}>

            {
              datas.map((data) => {
                return (
                  <View style={styles.item}>
                    <View>
                      <Text>
                        {data.pharmacie}
                      </Text>
                    </View>
                    <View>
                    <Image
                      source={{uri: data.uri}}
                      style={styles.picture}
                    />
                    </View>
                  </View>
                )
              })
            }



            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
  },
  picture: {
    width: 50,
    height: 50,
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