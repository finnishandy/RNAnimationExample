/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';

var {
  width,
  height
} = Dimensions.get('window');

var SQUARE_DIMENSIONS = 30;
var SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring

var AnimatedSquare = React.createClass({
  getInitialState: function() {
    return {
        pan: new Animated.ValueXY(),
        op: new Animated.Value(0)
    };
  },
  componentDidMount: function() {
    this.startAndRepeat();
    this.colorFade();
  },
  startAndRepeat: function() {
    this.triggerAnimation(this.startAndRepeat);
  },
  colorFade: function() {
    Animated.timing(       // Uses easing functions
      this.state.op, // The value to drive
      {
        toValue: 255,        // Target
        duration: 2000,    // Configuration
      },
    ).start();
  },
  triggerAnimation: function(cb) {
    Animated.sequence([
      Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
      }),
      Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: 0, y: 0} // return to start
      })
    ]).start(cb);
  },
  getStyle: function() {
    var interpolatedColorAnimation = this.state.op.interpolate({
        inputRange: [0, 255],
        outputRange: ['rgba(20,200,130,1)', 'rgba(255,120,140, 1)']
    });
    //const c = `rgba(0, 0, ${ this.state.op }, 0)`;
    console.log(this.state.op);
    return [
              styles.square,
              {
                backgroundColor: interpolatedColorAnimation
              },
              {
                transform: this.state.pan.getTranslateTransform()
              }
            ];
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'blue'
  }
});

AppRegistry.registerComponent('RAAnimationExample', () => AnimatedSquare);
