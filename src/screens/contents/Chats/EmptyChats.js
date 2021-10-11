import React from 'react';
import {View, Text, Colors, Incubator, Typography} from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from 'react-native';
import {Search, EmptyChats, Arrow} from '../../../assets/svgs';
const {TextField} = Incubator;

const EmptyChatsView = ({visible, onChange, textInputRef}) => {
  return (
    <View style={[styles.container, {flex: visible ? 1 : 0}]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.searchBar}>
          <TextField
            style= {{fontSize:14,fontWeight:'600', color:'rgba(43,41,46,0.7)'}}
            placeholder="Search"
            text70
            onChange={onChange}
            ref={textInputRef}
            leadingAccessory={
              <View style={{marginRight: 10, marginVertical:1}}>
                <Search />
              </View>
            }
            fieldStyle={styles.withUnderline}
            marginB-s4
          />
        </View>
        <Text style={styles.subHeading}>Chats</Text>
        {visible && (
          <View
            style={[styles.container, styles.match, {flex: visible ? 1 : 0}]}>
            <EmptyChats />
            <View style={styles.textContainer}>
              <Text style={styles.heading}>It’s nice to chat with someone</Text>
              <Text color={Colors.SecondaryColorLight} center>
                Start conversation with strangers from below icon and add them.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {visible && (
        <View
          style={{alignItems: 'flex-end', marginRight: 80, marginBottom: 80}}>
          <Arrow />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  match: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeading: {
    marginVertical: 20,
    fontWeight: 'bold',
    paddingLeft: 2,
    fontFamily: Typography.primaryFontFamily,
  },
  searchBar: {
    backgroundColor: Colors.PrimaryColorMedium,
    // margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    height:30,
    
  },
});

export default EmptyChatsView;
