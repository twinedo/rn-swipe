import React, {useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ShowHide = () => {
  const [showContent, setShowContent] = useState(false);

  const animatedHeight = useRef(new Animated.Value(155)).current;
  const [heightCard, setHeightCard] = useState(0);

  const [heightContent, setHeightContent] = useState(0);

  const onBtnPress = () => {
    if (showContent) {
      Animated.timing(animatedHeight, {
        toValue: Math.round(heightCard) - Math.round(heightContent) - 35,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }).start();
      setShowContent(!showContent);
    } else {
      Animated.timing(animatedHeight, {
        toValue: Math.round(heightCard) + Math.round(heightContent) + 35,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }).start();

      setShowContent(!showContent);
    }
  };

  const translateY = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={event => {
          setHeightCard(event.nativeEvent.layout.height);
        }}
        style={[
          styles.card,
          {
            height: translateY,
          },
        ]}>
        <View style={styles.header}>
          <View style={styles.pic}></View>
          <Text style={styles.txtName}>NAMA USER</Text>
        </View>

        <Animated.View
          onLayout={event => {
            setHeightContent(event.nativeEvent.layout.height);
          }}
          style={[styles.content]}>
          <View style={styles.pic} />
          <View style={styles.pic} />
        </Animated.View>

        <Pressable style={styles.btnExpCol} onPress={() => onBtnPress()}>
          <Text style={styles.btnText}>
            {showContent ? 'Collapse' : 'Expand'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default ShowHide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightblue',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'grey',
    marginRight: 10,
  },
  txtName: {
    fontSize: 20,
  },
  btnExpCol: {
    width: '100%',
    height: 30,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  content: {
    // flex: 1,
    marginTop: 30,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
