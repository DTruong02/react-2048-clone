import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Grid from './src/components/Grid';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <Grid />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1faee',
  },
});

export default App;
