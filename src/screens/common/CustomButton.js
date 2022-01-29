import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Colors, TouchableOpacity, Text, Typography} from 'react-native-ui-lib';

const CustomButton = ({
  loading,
  handleSubmit,
  buttonText,
  style,
  buttonStyle,
  leftIcon,
  rightIcon,
}) => {
  return (
    <TouchableOpacity
      backgroundColor={Colors.PrimaryColor}
      style={style ? style : styles.button}
      margin-15
      onPress={handleSubmit}>
      {loading ? (
        <ActivityIndicator
          style={styles.container}
          size="small"
          color={'#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon}
          <Text
            center
            color={Colors.white}
            style={buttonStyle ? buttonStyle : styles.buttonStyle}>
            {buttonText}
            
          </Text>
          {rightIcon}
          
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: 15,
    fontFamily: Typography.primaryFontFamily,
    fontWeight: '600',
    fontSize: 16,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 5,
    height: 50,
  },
});

export default CustomButton;
