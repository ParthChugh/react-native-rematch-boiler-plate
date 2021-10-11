import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar} from '../../assets/svgs';
import dayjs from 'dayjs';

const DatePicker = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {placeholder, value, onDateSelected, style, disabled, subType} = props;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const getTime = time => {
    return dayjs(time).format(
      subType?.toLowerCase() === 'datetime'
        ? 'DD / MM / YYYY, hh:mm:ss A'
        : 'DD / MM / YYYY',
    );
  };

  const mergedStyle = [styles.inputContainer, style];
  const backgroundColor = disabled ? Colors.colorGreyLight : Colors.colorWhite;

  return (
    <>
      <TouchableOpacity
        style={[mergedStyle, {backgroundColor}]}
        onPress={showDatePicker}
        disabled={disabled}>
        <View pointerEvents={'none'} style={styles.pickerContainer}>
          <TextInput
            {...props}
            editable={false}
            placeholder={placeholder}
            placeholderTextColor={Colors.INPUT_FIELD_BORDER_COLOR || ''}
            value={value !== '' ? getTime(value) : ''}
            style={[styles.inputWithIcon, {color: Colors.darkBlack}]}
          />
        </View>
        <Calendar />
      </TouchableOpacity>
      <DateTimePickerModal
        {...props}
        isVisible={isDatePickerVisible}
        onConfirm={date => {
          hideDatePicker();
          onDateSelected(date);
        }}
        onCancel={hideDatePicker}
        headerTextIOS={'Select date'}
      />
    </>
  );
};

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onIconPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  placeholder: '',
  value: '',
  style: {},
  disabled: false,
  onIconPress: () => {},
};

const styles = StyleSheet.create({
  inputContainer: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bac4bc',
    backgroundColor: '#f7f7f7',
  },
  pickerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputWithIcon: {
    maxWidth: '90%',
    fontSize: 14,
    width: '90%',
    height: 100,
  },
  inputAccessory: {
    height: 16,
    width: 16,
  },
  input: {
    color: Colors.darkBlack,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 48,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bac4bc',
    backgroundColor: '#f7f7f7',
  },
});

export default DatePicker;
