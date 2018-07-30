import React from 'react';
import firebase from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, SafeAreaView, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Header, Icon, Card, Avatar } from 'react-native-elements';
import { colors } from '../../constants';
import { logoutSuccess } from '../Auth/Login/actions';

  
class PreferencesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    static navigationOptions = {
      drawerLabel: 'Preferences',
      drawerIcon: ({ tintColor }) => (
        <Icon
            name='settings'
            type='material-community'
            size={24}
        />
      ),
    };
  
    logout() {
        this.props.onLogoutSuccess();
        firebase.auth().signOut()
        .then(() => {
          // this.props.onLogoutSuccess();
          // this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          console.log(error);

        });
    }

    render() {
      const { auth } = this.props;
      console.log(765);
      console.log(auth.user);
      console.log(auth.user.email);
      return (
        <SafeAreaView style={{ flex: 1, marginTop: 24, backgroundColor: 'rgba(241,240,241,1)' }}>
            <Header
                leftComponent={{ size: 30, icon: 'md-arrow-round-back', type: 'ionicon', color: '#fff', onPress: () => this.props.navigation.navigate('Home')  }}
                centerComponent={{ text: 'Preferences', style: { color: '#fff' } }}
                rightComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{ }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <ScrollView style={{flex: 1, marginTop: 15, marginBottom: 20}}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10}}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar
                                size="medium"
                                source={{
                                    uri: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/256/man-icon.png',
                                }}
                                activeOpacity={0.7}
                                rounded
                                overlayContainerStyle={{backgroundColor: 'transparent'}}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                                <Text style={{ fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                                    {auth.user.email}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} />
                
                    <View style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 15, marginLeft: 10, color: 'gray'}}>
                                email
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
                            <Text style={{fontSize: 15, marginLeft: 10, color: 'gray'}}>
                                {auth.user.email}
                            </Text>
                        </View>
                    </View>


                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                        <Button
                            raised
                            title='Logout'
                            buttonStyle={{
                                backgroundColor: colors.main,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                                padding: 5,
                            }}
                            titleProps={{ fontSize: 30 }}
                            containerStyle={{ width: '80%' }}
                            onPress={this.logout}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
      );
    }
  }


const styles = StyleSheet.create({
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
});

const mapStateToProps = state => ({
    auth: state.auth,
});

function mapDispatchToProps(dispatch) {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

export default compose(
    withConnect,
)(PreferencesScreen);
