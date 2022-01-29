import React, {useEffect} from 'react';
import {View, Colors, Image} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

const InitialScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('intro');
    }, 2000);
  }, []);
  return (
    <View style={styles.background}>
      <Image assetName="logo" style={styles.maps} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maps: {
    height: 100
  }
});

export default React.memo(InitialScreen);