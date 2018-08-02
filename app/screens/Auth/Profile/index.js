import React from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, Button } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { colors } from 'toutesmesordonnances/constants';
import { logoutSuccess } from 'app/screens/Auth/actions';

class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.onLogoutSuccess();
        firebase.auth().signOut()
        .then(() => {
          // this.props.onLogoutSuccess();
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);

        });
    }

    render() {
      return (
        <View style={styles.container}>
            <View>
                <Text>
                Profile
                </Text>
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
      );
    }
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
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
)(Profile);