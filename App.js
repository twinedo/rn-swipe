import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Swipe from './components/Swipe';

const App = () => {
  return (
    <View style={styles.container}>
      <Swipe
        width="90%"
        height={48}
        title="Geser"
        onEndReached={() => alert('test')}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
