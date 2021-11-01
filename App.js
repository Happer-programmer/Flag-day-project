// imports for the flag project
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { Component, useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { Linking, Button, Image, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

// notification sender

Notifications.setNotificationHandler({handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false, })});
async function registerForPushNotificationsAsync() { let token; if (Constants.isDevice) { const { status: existingStatus } = await Notifications.getPermissionsAsync(); let finalStatus = existingStatus; if (existingStatus !== 'granted') { const { status } = await Notifications.requestPermissionsAsync(); finalStatus = status; } token = (await Notifications.getExpoPushTokenAsync()).data; console.log(token); } else { alert('Must use physical device for Push Notifications'); } if (Platform.OS === 'android') { Notifications.setNotificationChannelAsync('default', { name: 'default', importance: Notifications.AndroidImportance.MAX, vibrationPattern: [0, 250, 250, 250], lightColor: '#FF231F7C', }); } return token; }

export default function App() {
    const notificationListener = useRef();
    const responseListener = useRef();

  useEffect(() => {
    if(Constants.isDevice && Platform.OS !== 'web') {
      registerForPushNotificationsAsync().then(token => {
         axios.post(`https://nativenotify.com/api/expo/key`, { appId: 381, appToken: '8yHrJeWylPGYxJKHE6kVJR', expoToken: token })
       });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));
      return () => { Notifications.removeNotificationSubscription(notificationListener); Notifications.removeNotificationSubscription(responseListener); };
    }
});
// images and source's
    return (
      <View style={styles.container}>
        <Image source={{ uri: "data:image/jpeg;base64,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" }} style={{ width:370, height: 380 }} />
        <Button
          title="”Education is like a lantern which lights your way in the dark”"
          onPress={this._handleOpenWithLinking}
          style={styles.button}
        />
        <Button
          title="”He who does not know his past cannot make the best of his present and future, for it is from the past that we learn.”"
          onPress={this._handleOpenWithLinking}
          style={styles.button}
        />
        <Button
          title="”History is a continuous chain of events. The present is only an extension of the past.”"
          onPress={this._handleOpenWithWebBrowser}
          style={styles.container}
        />
      </View>
    );
  }
//button hyperlink
  _handleOpenWithWebBrowser = () => {
    Linking.openURL('https://youtu.be/3DprhWp3lN4');
  };

  _handleOpenWithLinking = () => {
    Linking.openURL('https://youtu.be/o7KpDBYYB4Q');
  };

// styles 
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#02b1e8',
  },
  button: {
    marginVertical: 10,
  },
});