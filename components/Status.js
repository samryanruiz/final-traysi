import Constants  from "expo-constants";
import { StatusBar, StyleSheet, Text, View, Platform, Animated} from "react-native";
import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo"

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);


export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      fadeAnim: new Animated.Value(0),
      statusBarColor: 'red', // Initial status bar color
    };
  }


  componentDidMount(){
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount(){
    NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected
    });

    const newStatusBarColor = state.isConnected ? 'blue' : 'red';
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    this.setState({
      statusBarColor: newStatusBarColor,
    });
  }
  render() {
    const { isConnected, fadeAnim, statusBarColor } = this.state;
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.status, { backgroundColor: statusBarColor }]}></View>
      );
    }

    const statusBar = (
        <StatusBar
            backgroundColor={statusBarColor}
            barStyle={isConnected ? 'dark-content' : 'light-content'}
        />
    );
    const messageContainer = (
        <Animated.View style={[styles.messageContainer, {opacity:fadeAnim}]}>
        
            {statusBar}
            {!isConnected && (
                <View style={styles.bubble}>
                    <Text style={styles.text}>No network connection</Text>
                </View>
            )}
        </Animated.View>
    );

    if (Platform.OS === "ios") {
        return (
            <View style={[styles.status, { backgroundColor }]}>
                {messageContainer}
            </View>
        );
    }
    return messageContainer;
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    paddingBottom: 10,
    backgroundColor: 'red',
  }, 
  text: {
    color: 'white',
  },
});

