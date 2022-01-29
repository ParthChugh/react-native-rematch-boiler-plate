import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  View,
  Image,
  Text,
  Colors,
  TouchableOpacity,
  Button,
  Typography,
} from 'react-native-ui-lib';
import store from '../../../../store';
import {Chats} from 'react-native-chat-screen';
import {Camera, Audio, Send} from '../../../assets/svgs';
import {connect} from 'react-redux';
import PopupMenu from '../../../components/PopupMenu';
import { openDatabase } from 'react-native-sqlite-storage';
import dayjs from 'dayjs';
const db = openDatabase({ name: 'StoreFront.db' });
  
const SingleChat = props => {
  const {route, navigation, dispatch, unmatchUser, request, user, updateUserSuccess} = props;

  const [selectedType, setSelectedType] = useState(null);
  const [messages, setMessages] = useState({});
  const [headerShow, setHeaderShow] = useState(true);
  useEffect(() => {
    if (selectedType) {
      if (selectedType === 'Check profile') {
        // PersonProfile
        navigation.navigate('PersonProfile', {
          images: route?.params?.images,
          aboutUs: route?.params?.aboutUs,
          location: route?.params?.location,
          age: route?.params?.age,
          name: route?.params?.name,
          chat: route?.params?.chat,
        });
      } else if (selectedType === 'Logout') {
        updateUserSuccess({response: {user: null, error: null}})
      }
      setSelectedType(null);
    }
  }, [selectedType]);
  
  const getData = (createdAt) => {    
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM messages WHERE toUserId IN (?)`,
        [route.params.id, createdAt || 0],
        (tx, results) => {
          let data = {}
          console.log("results.rows.length1313", results.rows)
          for(let i= 0; i<results.rows.length; i++) {
            data = {...data, [Object.values(messages || {}).length + i]: results.rows.item(i)}
          }
          console.log("{...messages, ...data}", {...messages, ...data})
          setMessages(data)
        }
      );
    });
  }
  useEffect(() => {
    getData()
  },[]);

  const Header = () => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: 'rgba(0,0,0, 0.7)',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.white,
            paddingLeft: 10,
            width: '50%',
            fontFamily: Typography.primaryFontFamilyBold,
          }}>{`Do you want ${route.params.name} in your matches?`}</Text>
        <Button
          backgroundColor={Colors.white}
          label="Yes"
          size="medium"
          color={Colors.PrimaryColor}
          onPress={() => {
            setHeaderShow(false);
            unmatchUser({id: route.params.chat.id, payload: {match: true}});
            dispatch({
              type: 'chats/update_chats',
              payload: {response: {...route.params.chat, match: true}},
            });
          }}
          margin-10header
        />
        <Button
          backgroundColor={'transparent'}
          label="No"
          style={{borderWidth: 1, borderColor: Colors.white}}
          onPress={() => {
            setHeaderShow(false);
            unmatchUser({id: route.params.chat.id, payload: {match: false}});
            dispatch({
              type: 'chats/update_chats',
              payload: {response: {...route.params.chat, match: false}},
            });
          }}
          size="medium"
          color={Colors.white}
          margin-10
        />
      </View>
    );
  };
  navigation.setOptions({
    headerTitle: () => {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            navigation.navigate('PersonProfile', {
              images: route?.params?.images,
              aboutUs: route?.params?.aboutUs,
              location: route?.params?.location,
              age: route?.params?.age,
              name: route?.params?.name,
              chat: route?.params?.chat,
            });
          }}>
          <Image
            source={{uri: route?.params?.profile}}
            // resizeMode={'contain'}
            style={{
              width: 37,
              height: 37,
              borderRadius: 40,
              marginRight: 10,
              marginBottom: -1,

            }}
          />
          <Text style={styles.nameStyle}>{route?.params?.name}</Text>
        </TouchableOpacity>
      );
    },
    headerRight: () => (
      <PopupMenu
        options={['Check profile', 'Logout']}
        onPress={setSelectedType}
      />
    ),
  });

  const onSubmitChat = (data) => {
    console.log("data133131", data)
    const timeData = dayjs().unix()
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO messages (
          text, 
          toUserId,
          createdAt,
          isSent
        ) VALUES (?,?,?,?)`,
        [
          data[0].text, 
          route.params.id,
          timeData,
          true
        ],
        (a,b) => {
          getData(timeData)
        }              
      );
      
      tx.executeSql(
        `INSERT INTO messages (
          text, 
          toUserId,
          createdAt,
          isSent
        ) VALUES (?,?,?,?)`,
        [
          data[0].text, 
          route.params.id,
          dayjs().unix() + 2,
          false
        ],
        (a,b) => {
          console.log('inserteddddddd', {a,b})
          setTimeout(() => {
            getData(timeData)
          },2000)
          
        }              
      );
      
      

    });
  }

  // {
  //   _id: 2,
  //   text: 'Hello developer',
  //   createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
  //   user: {
  //     _id: 2,
  //     name: 'React Native',
  //     avatar: null,
  //   },
  // },
  return (
    <View style={styles.container}>
      <Chats
        CameraIcon={Camera}
        AudioIcon={Audio}
        SendIcon={Send}
        cameraIconStyle={styles.cameraIconStyle}
        messagesContainerStyle={{backgroundColor: '#E5E5E5'}}
        textInputStyle={styles.textInputStyle}
        data={
        //   userMessages?.messages?.map(el => {
        //   return {...el, _id: el.id, user: {...el.user, _id: el.id}};
        // })
        Object.values(messages).map(el => {
          console.log("e123121", el.isSent?user.id : el.toUserId )
          return {
            _id: el.id, 
            text: el.text, 
            createdAt: el.createdAt, 
            user: {
              _id: el.isSent ? user.id : el.toUserId,
              name: user.name,
              avatar: null,    
            }
          }
        }).reverse()
        }
        avatarImageStyle={styles.avatarImageStyle}
        user={{
          _id: user.id,
          name: user.name,
          avatar: null,
        }}
        bubbleContainerStyle={styles.bubbleContainerStyle}
        bubbleTimeTextStyle={styles.bubbleTimeTextStyle}
        wrapperStyle={{
          right: {},
          left: {},
        }}
        bubbleBottomContainerStyle={styles.bubbleBottomContainerStyle}
        bubbleTickStyle={{}}
        bubbleContainerToNextStyle={styles.bubbleContainerToNextStyle}
        bubbleContainerToPreviousStyle={styles.bubbleContainerToPreviousStyle}
        renderMessageContainerStyle={styles.renderMessageContainerStyle}
        renderMessageTextStyle={styles.renderMessageTextStyle}
        renderMessageLinkStyle={styles.renderMessageLinkStyle}
        renderMessageCustomTextStyle={styles.renderMessageCustomTextStyle}
        sendContainerStyle={styles.sendContainerStyle}
        onSubmitChat={onSubmitChat}
      />
      {route.params.chat.match === null && headerShow && <Header />}
      {request && (
        <ActivityIndicator size={'large'} style={styles.activityIndicator} />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIconStyle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  textInputStyle: {
    color: Colors.secondaryTest,
    backgroundColor: Colors.secondaryBackground,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.borderColor,
    paddingTop: 8.5,
    paddingHorizontal: 12,
    marginLeft: 0,
  },
  avatarContainerStyle: {
    left: {
      borderWidth: 3,
      borderColor: 'red',
    },
    right: {},
  },
  avatarImageStyle: {
    left: {borderWidth: 3, borderColor: Colors.white},
    right: {
      borderWidth: 3,
      borderColor: Colors.secondaryBorderColor,
      backgroundColor: Colors.secondaryBorderColor,
    },
  },
  bubbleContainerStyle: {
    left: {borderColor: '#E5E5E5', borderWidth: 8},
    right: {},
  },
  bubbleTimeTextStyle: {
    right: {color: 'gray'},
    left: {color: 'gray'},
  },
  bubbleBottomContainerStyle: {
    left: {
      backgroundColor: Colors.white,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    right: {
      backgroundColor: Colors.secondaryBorderColor,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  },
  bubbleContainerToNextStyle: {
    left: {borderColor: Colors.secondaryBorderColor, borderWidth: 4},
    right: {},
  },
  bubbleContainerToPreviousStyle: {
    left: {borderColor: Colors.white, borderWidth: 4},
    right: {},
  },
  renderMessageContainerStyle: {
    left: {backgroundColor: Colors.white},
    right: {backgroundColor: Colors.secondaryBorderColor},
  },
  renderMessageTextStyle: {
    left: {color: Colors.darkblack || 'black'},
    right: {color: Colors.darkblack || 'black'},
  },
  renderMessageLinkStyle: {
    left: {color: 'darkblue'},
    right: {color: 'darkblue'},
  },
  renderMessageCustomTextStyle: {
    fontSize: 14,
    lineHeight: 20,
  },
  sendContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nameStyle: {
    fontFamily: Typography.PrimaryFontFamily,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
};

const selection = store.select.request.isActionLoading('chats/get_chats');

const mapState = state => ({
  userMessages: state.chats.userMessages,
  request: selection(state),
  user: state.user.user,
});

const mapDispatch = dispatch => ({
  unmatchUser: props => dispatch.chats.unmatchUser(props),
  updateUserSuccess: props => dispatch.user.updateUserSuccess(props),
});

export default connect(mapState, mapDispatch)(SingleChat);
