import React, {Component} from 'react';
import {StyleSheet, Text as ABPText} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';

export default class PopUpMenu extends Component {
  render() {
    const {options, onPress, darkTriggerText} = this.props;
    return (
      <Menu>
        <MenuTrigger
          text="..."
          customStyles={darkTriggerText ? darkTriggerStyles : triggerStyles}
        />
        <MenuOptions>
          {options.map((el, index) => (
            <MenuOption key={index} onSelect={() => onPress(el)}>
              <ABPText style={darkTriggerStyles.padding10}>{el}</ABPText>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    );
  }
}

const triggerStyles = StyleSheet.create({
  triggerText: {
    color: 'white',
    fontSize: 24,
    transform: [{rotate: '90deg'}],
    textAlign: 'center',
  },
});

const darkTriggerStyles = StyleSheet.create({
  triggerText: {
    color: 'black',
    fontSize: 30,
    transform: [{rotate: '90deg'}],
    textAlign: 'center',
    paddingLeft: 10,
  },
  padding10: {
    padding: 10,
  },
});

PopUpMenu.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onError: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.style,
};
