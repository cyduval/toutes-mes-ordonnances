import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { Constants } from 'expo';

class Pill extends React.Component {
  
    render() {
      return (
        <View style={styles.root}>
            <Header
                leftComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                centerComponent={{ text: 'Mon pilulier', style: { color: '#fff' } }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{ width: '100%' }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={styles.container}>
                <Text>
                    Mon pilulier
                </Text>
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
  });

export default Pill;