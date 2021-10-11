import React from 'react';
import {
  View,
  Carousel,
  Image,
  Text,
  Typography,
  Colors,
} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../../common/CustomButton';
import {Map, ChatsFocused} from '../../../assets/svgs';

const PersonProfile = ({route, navigation, dispatch, unmatchUser, updateChats}) => {
  return (
    <View style={styles.container}>
      <Carousel
        containerStyle={{
          height: 400,
          width: '100%',
        }}
        showCounter>
        {route.params.images.map((el, index) => {
          return (
            <Image
              source={{uri: `data:image/png;base64,${el}`}}
              // resizeMode={'contain'}
              style={{
                width: '100%',
                height: 400,
              }}
            />
          );
        })}
      </Carousel>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {route.params.name},{' '}
          <Text style={styles.age}>{route.params.age}</Text>{' '}
        </Text>
        <View style={[styles.row, styles.locationContainer]}>
          <Map />
          <Text style={styles.location}>{route.params.location}</Text>
        </View>

        <Text style={styles.name}>About me</Text>
        <Text style={styles.aboutMe}>{route.params.aboutUs}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          handleSubmit={() => {
            navigation.goBack();
          }}
          leftIcon={
            <View style={{position: 'absolute', left: 35, top: 10}}>
              <ChatsFocused />
            </View>
          }
          buttonText={
            <>
              <Text style={styles.chat}>Chat now</Text>
            </>
          }
          buttonStyle={{width: '100%', marginLeft: 20}}
          style={styles.buttonStyle}
        />
        <CustomButton
          handleSubmit={() => {
            navigation.pop(2);
            updateChats({response: {
              ...route.params.chat,
              match: !route.params.chat.match,
            }})
            
            unmatchUser({
              id: route.params.chat.id,
              payload: {match: !route.params.chat.match},
            });
          }}
          buttonText={
            <Text style={{textAlignVertical: 'center'}}>
              <Text style={styles.unmatch}>
                {route.params.chat.match ? 'Unmatch' : 'Match'}
              </Text>
            </Text>
          }
          buttonStyle={{width: '100%'}}
          style={styles.unmatchButtonStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    paddingTop: 20,
    width: '50%',
    height: 60,
    borderRadius: 10,
  },
  unmatchButtonStyle: {
    alignItems: 'center',
    paddingTop: 20,
    width: '50%',
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,46,0.1)',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  name: {
    fontFamily: Typography.primaryFontFamily,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  age: {
    fontFamily: Typography.primaryFontFamily,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  location: {
    paddingLeft: 10,
    fontSize: 13,
    paddingVertical: 10,
    color: Colors.SecondaryColorLight,
    opacity: 0.7,
  },
  locationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  aboutMe: {
    color: Colors.SecondaryColorLight,
    opacity: 0.7,
    fontFamily: Typography.primaryFontFamily,
    fontSize: 13,
    paddingVertical: 10,
  },
  chat: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Typography.primaryFontFamily,
    textAlign: 'center',
  },
  unmatch: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.SecondaryColorLight,
    fontFamily: Typography.primaryFontFamily,
    textAlign: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
});

const mapState = () => ({});

const mapDispatch = dispatch => ({
  unmatchUser: props => dispatch.chats.unmatchUser(props),
  updateChats: props => dispatch.chats.updateChats(props),
});

export default connect(mapState, mapDispatch)(PersonProfile);
