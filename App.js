/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AlertIOS,
  TouchableHighlight,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from './src/component/button';
var SafariView = require('react-native-safari-view');

export default class App extends Component<{}> {

  state = {
    user: undefined, // user has not logged in yet
  };

 // Open URL in a browser
  openURL = (url) => {
    
      Linking.openURL(url);
    
  };

componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
  
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:3000/auth/facebook');

  // Requesting the rest services

 _onPressButtonGetHours() {
    fetch("http://localhost:3000/hoursinfo",{method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
          "Clinic opening hours",
          " " + JSON.stringify(responseData.clinic_hours)
          
        )
    })
    .done();
  }

 _onPressButtonGetDoctor() {
    fetch("http://localhost:3000/doctorsinfo",{method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
          "Available Doctors",
          " " + JSON.stringify(responseData.clinic_doctor)
          
        )
    })
    .done();
  }

  _onPressButtonGetQueue() {
    fetch("http://localhost:3000/queueinfo",{method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
          "Queue Info",
          " " + JSON.stringify(responseData.clinic_queues)
          
        )
    })
    .done();
  }


  render() {
    const { user } = this.state;
    return (
      
      <View style={styles.container}>
        { user
          ? // Show user info if already logged in
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
              <View style={styles.avatar}>
                <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
              </View>
              <Text style={styles.body}>
                Please view the Clinic La Salud info below
              </Text>
              <View style={styles.infopanel}>

              <TouchableHighlight style={styles.infobutton} onPress={this._onPressButtonGetHours}>
               <Text> Opening Hours </Text>
               </TouchableHighlight>

               <TouchableHighlight style={styles.infobutton} onPress={this._onPressButtonGetDoctor}>
               <Text> Available Doctors </Text>
               </TouchableHighlight>

               <TouchableHighlight onPress={this._onPressButtonGetQueue} style={styles.infobutton}>
                  <Text> Queue Info </Text>
                </TouchableHighlight>

              </View>
            </View>
          : // Show Please log in message if not
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome to Clinic La salud !
              </Text>
              <View style={styles.avatar}>
              </View>
              <Text style={styles.text}>
                Please log in 
              </Text>
              <View style={styles.buttons}>
              <TouchableHighlight style={styles.hbutton} onPress={this.loginWithFacebook}>
              <Text style={styles.text}>Login with Facebook</Text>
              </TouchableHighlight>
              </View>
            </View>
        }
  
      </View>

    );
  }
}

const styles = StyleSheet.create({
  infopanel: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  infobutton: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  hbutton: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 100,
    marginLeft: 120,
    marginBottom: 250,

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  body: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
