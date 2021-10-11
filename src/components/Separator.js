import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    color: Colors.LineSeperator,
    marginVertical: 10,
    borderWidth: 0.2,
  },
});

export default Separator;
