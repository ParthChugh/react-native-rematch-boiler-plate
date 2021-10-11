import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

export const Layout = WrappedComponent => {
  return function (props) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          key={'view-key-1'}
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled">
          <WrappedComponent {...props} />
        </ScrollView>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
