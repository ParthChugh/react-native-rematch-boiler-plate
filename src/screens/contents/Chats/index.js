import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import EmptyChatsView from './EmptyChats';
import {FlameFocus, Filter} from '../../../assets/svgs';
import dayjs from 'dayjs';

const Chats = ({
  navigation,
  chats,
  unmatchUser,
  getNewUser,
  newUser,
  getUserSuccess,
  getUserMessagesSuccess,
  updateChats
}) => {  
  const searchRef = useRef();
  const [searchChat, updateSearchChat] = useState(chats);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (chats.length > 0) {
      updateSearchChat(chats);
    }
  }, [chats]);

  useEffect(() => {
    updateSearchChat(
      chats.filter(el =>
        `${el.firstName} ${el.lastMessage}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);
  const onChange = ({nativeEvent}) => {
    setSearchText(nativeEvent.text);
  };

  useEffect(() => {
    if (newUser && newUser?.chat) {
      // getUserMessages(newUser?.chat.id);
      navigation.navigate('SingleChat', {
        id: newUser?.chat.id,
        name: `${newUser?.chat?.firstName} ${newUser?.chat?.lastName}`,
        profile: newUser?.chat?.profileUrl,
        images: newUser?.chat?.images,
        aboutUs: newUser?.chat?.aboutUs,
        location: newUser?.chat?.location,
        age: newUser?.chat?.age,
        chat: newUser?.chat,
      });
      getUserSuccess()
    }
  }, [newUser]);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.marginRight10}
        onPress={() => searchRef.current.focus()}>
        <Filter />
      </TouchableOpacity>
    ),
  });
  return (
    <View style={styles.container}>
      <EmptyChatsView
        onChange={onChange}
        textInputRef={searchRef}
        visible={chats.filter(el => el.match || el.match !== null).length === 0}
      />
      {searchChat && (
        <ScrollView>
          {searchChat.map((el, index) => (
            <View>
              <TouchableOpacity
                style={[styles.row, {marginVertical: 10}]}
                onPress={() => {
                  // getUserMessages(el.id);
                  navigation.navigate('SingleChat', {
                    id: el.id,
                    name: `${el.firstName} ${el.lastName}`,
                    profile: el.profileUrl,
                    images: el.images,
                    aboutUs: el.aboutUs,
                    location: el.location,
                    age: el.age,
                    chat: el,
                  });
                  getUserMessagesSuccess()
                  updateChats({response: {...chats[index], newMessage: false}})
                  unmatchUser({
                    id: chats[index].id,
                    payload: {newMessage: false},
                  });
                  // getUserMessages(el.id);
                }}>
                <Image
                  source={{uri: el.profileUrl}}
                  // resizeMode={'contain'}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 40,
                  }}
                />
                <View style={styles.flex}>
                  <View style={[styles.row, styles.spaceBetween]}>
                    <View style={styles.row}>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        {el.firstName}{' '}
                      </Text>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {el.lastName}{' '}
                      </Text>
                    </View>
                    {/* <View style={styles.circleContainer}>
                      <Text style={{fontSize: 10}}>
                        {dayjs(el.createdAt).format('MM:ss a')}
                      </Text>
                      {el.newMessage && <View style={styles.circleShape} />}
                    </View> */}
                    {el.newMessage ? ( 
                    <View style={styles.circleContainer}>
                      <Text 
                          style={{fontSize: 10, fontWeight:'bold'}}>
                        {dayjs(el.createdAt).format('MM:ss a')}
                      </Text>
                      {el.newMessage &&<View style={styles.circleShape} />}
                    </View>
                    ): (
                    <View style={styles.circleContainer}>
                      <Text style={{fontSize: 10}}>
                        {dayjs(el.createdAt).format('MM:ss a')}
                      </Text>
                      {el.newMessage && <View style={styles.circleShape} />}
                    </View>)}
                  </View>
                  {el.newMessage ? (
                    <Text style={{marginLeft: 10, fontSize: 13}}>
                      a new message
                    </Text>
                  ) : (
                    <Text style={{marginLeft: 10, fontSize: 13}}>
                      {el.lastMessage}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.chat}
        onPress={() => {
          getNewUser();
        }}>
        <FlameFocus />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  chat: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  circleShape: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: Colors.PrimaryColor || '#008CFF',
    position: 'absolute',
    top: 20,
  },
  circleContainer: {
    alignItems: 'flex-end',
  },
  searchBar: {
    backgroundColor: Colors.PrimaryColorMedium,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    height: 36,
  },
  marginRight10: {
    marginRight: 10,
  },
});

const mapState = state => ({
  chats: state.chats.userChats,
  newUser: state.chats.newUser,
});

const mapDispatch = dispatch => ({
  dispatch,
  unmatchUser: props => dispatch.chats.unmatchUser(props),
  getNewUser: () => dispatch.chats.getNewUser(),
  getUserSuccess: props => dispatch.chats.getUserSuccess(props),
  getUserMessagesSuccess: props => dispatch.chats.getUserMessagesSuccess(props),
  updateChats: props => dispatch.chats.updateChats(props),
});

export default connect(mapState, mapDispatch)(Chats);
