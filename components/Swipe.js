import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  PanResponder,
} from 'react-native';

const Swipe = ({onEndReached, title, width, height}) => {
  const animatedWidth = useRef(new Animated.Value(3)).current;

  const [btnWidth, setBtnWidth] = useState(0);
  const [widthWrapper, setWidthWrapper] = useState(0);
  const [canReachEnd, setCanReachEnd] = useState(true);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => setCanReachEnd(!canReachEnd),
    onPanResponderMove: (_, gestureState) => {
      const margin = widthWrapper - btnWidth;
      if (gestureState.moveX > 0 && gestureState.moveX <= margin) {
        Animated.timing(animatedWidth, {
          toValue: gestureState.moveX,
          duration: 0,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.moveX > margin) {
        canReachEnd && onEndReached();
        resetSwipe();
        setCanReachEnd(false);
      }
    },
    onPanResponderRelease: () => {
      setCanReachEnd(true);
      resetSwipe();
    },
  });

  const resetSwipe = () => {
    Animated.spring(animatedWidth, {
      toValue: 3,
      useNativeDriver: false,
      speed: 5,
    }).start();
  };

  return (
    <View
      style={styles.wrapperSwipe(width, height)}
      onLayout={event => {
        setWidthWrapper(event.nativeEvent.layout.width);
      }}>
      <Animated.View
        onLayout={event => {
          setBtnWidth(event.nativeEvent.layout.width);
        }}
        {...panResponder.panHandlers}
        style={styles.btnSwipeWrapper(animatedWidth, height)}>
        <View style={styles.iconWrapper}>
          <Image source={require('../Swipes.png')} style={styles.icon} />
        </View>
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
      <Animated.View style={styles.backgroundOnSwipe(animatedWidth, height)} />
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  wrapperSwipe: (width, height) => ({
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: '#2893E1',
    elevation: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: height / 2,
    width: width,
    height: height,
    overflow: 'hidden',
  }),
  backgroundOnSwipe: (animatedWidth, height) => ({
    height: height,
    width: animatedWidth,
    position: 'absolute',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
  }),
  btnSwipeWrapper: (animatedWidth, height) => ({
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: height / 2,
    borderBottomRightRadius: height / 2,
    transform: [{translateX: animatedWidth}],
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
  }),
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 20,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
