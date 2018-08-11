import React from 'react';
import { Alert, Platform, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Calendar, Constants, Permissions } from 'expo';
import Header from 'app/components/Header';
import moment from 'moment';
import { colors } from 'toutesmesordonnances/constants';

class Pill extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        calendarId: false,
        granted: false,
        isLoading: false,
        results: [],
      };

      this.name = 'toutes-mes-ordonnances';
      
    }

    componentWillMount = async () => {
      await this._handleCalendar();
    }


    _askForCalendarPermissions = async () => {
      const response = await Permissions.askAsync(Permissions.CALENDAR)
      return response.status === 'granted'
    }
  
    _askForReminderPermissions = async () => {
      if (Platform.OS === 'android') {
        return true
      }
  
      const response = await Permissions.askAsync(Permissions.REMINDERS)
      return response.status === 'granted'
    }
  
    _findCalendars = async () => {
      return await Calendar.getCalendarsAsync();
    }

    _handlePermissions = async () => {
      const calendarGranted = await this._askForCalendarPermissions();
      const reminderGranted = await this._askForReminderPermissions();
      if (calendarGranted && reminderGranted) {
        this.setState({ granted: true });
        return true;
      } else {
        return false;
      }

    }

    _handleCalendar = async () => {

      const isPermissions = await this._handlePermissions();
      if (!isPermissions) {
        return false;
      }
      let calendars = await this._findCalendars();

      const isCalendarExist = calendars.find( p => p.name === this.name);

      if (!isCalendarExist) {
        console.log('NOT EXIST');
        await this._createNewCalendar(calendars);
      } else {
        console.log('EXIST');
        const calendar = calendars.find( p => p.name === this.name);
        console.log(calendar);
        this.setState({ calendarId: calendar.id });
      }

      /*
      try {
        await this._addEventsToCalendar()
        Alert.alert('Le calendrier a été synchronisé')
      } catch (e) {
        Alert.alert('Une erreur est survenue lors de l\'ajout des évènements au calendrier', e.message)
      }
      */
    }

    _createNewCalendar = async (calendars) => {
      const newCalendar = {
        title: this.name,
        entityType: Calendar.EntityTypes.EVENT,
        color: colors.main,
        sourceId:
          Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default').source.id
          : undefined,
        source:
          Platform.OS === 'android'
          ? {
            name: calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name,
            isLocalAccount: true
          }
          : undefined,
        name: this.name,
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
        ownerAccount:
          Platform.OS === 'android'
          ? calendars.find(cal => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER).ownerAccount
          : undefined
      }
  
      let calendarId = null
  
      try {
        calendarId = await Calendar.createCalendarAsync(newCalendar)
      } catch (e) {
        Alert.alert('Le calendrier n\'a pas été sauvegardé', e.message)
      }
      this.setState({ calendarId: calendarId });
      return calendarId
    }

    _addEventsToCalendar = async () => {
      const event = {
        title: 'my cool event',
        location: '124 rue de turenne paris',
        startDate: moment().toDate(),
        endDate: moment().add(1, 'hours').toDate(),
        timeZone: 'Europe/Paris'
      }
  
      try {
        await Calendar.createEventAsync(this.state.calendarId, event)
      } catch (e) {
        Alert.alert('Une erreur est survenue lors de l\'ajout de vos indisponiblité à votre calendrier')
      }
    }

    _deleteCalendar = async () => {
      await Calendar.deleteCalendarAsync("11");
      // await Calendar.deleteCalendarAsync(this.state.calendarId);

    }
    

    render() {

      const { granted } = this.state;

      if (!granted) {
        return (
          <View style={styles.root}>
            <Header
                onPress={() => this.props.navigation.goBack()}
                text="Mon pilulier"
            />
            <View style={styles.container}>
              <Text style={styles.warning}>
              Vous devez autoriser l'application à acceder à votre calendrier pour afficher cette page
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={styles.root}>
          <Header
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
            text="Mon pilulier"
          />

            <View style={styles.container}>


                <View style={{ margin: 30 }}>
                  <Button
                    title='mes alertes' 
                    buttonStyle={styles.button}
                    onPress={() => this.props.navigation.navigate('ListAlert')}
                  />
                </View>

                <View style={{ margin: 30 }}>
                  <Button
                    title='nouvelle alerte' 
                    buttonStyle={styles.button}
                    onPress={() => this.props.navigation.navigate('NewAlert')}
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
      // justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    button: {
      margin: 15,
      backgroundColor: colors.main,
      padding: 10,
      width: '100%',
    },
  });
  

export default Pill;