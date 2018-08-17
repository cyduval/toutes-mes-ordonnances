import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isNetwork from 'toutesmesordonnances/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';
import * as api from 'toutesmesordonnances/utils/api';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
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
    }

    componentDidMount = async() => {
        if (this.props.auth && this.props.auth.user) {
            const result = await api.getPrescriptions(this.props.auth.user.uid);
            this.setState({
                datas: result,
                loading: false,
            });
        }
    }



    render() {
        const { app, auth } = this.props;
        const { datas, loading } = this.state;

        if (auth.loginStatus !== 'logged') {
            return (<OverlayLogin />);
        }


        if (!isNetwork(app.isNetwork)) {
            return <NoNetwork />;
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
                    data={datas}
                    renderItem={({item}) => (
                        <ListItem
                        key={item.uid}
                        av-timer
                        leftIcon={{ name: "file-o", type: "font-awesome" }}
                        // leftAvatar={{ source: { uri: item.image } }}
                        title={item.date}
                        subtitle={item.pharmacie}
                        containerStyle={styles.item}
                        onPress={() => this.props.navigation.navigate('Detail',{ prescriptionUid: item.uid })}
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
    app: state.app,
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