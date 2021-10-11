import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Colors,
  Incubator,
  Image,
  Typography,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import store from '../../../../store';
import PopupMenu from '../../../components/PopupMenu';
import {Match, Search} from '../../../assets/svgs';
import {connect} from 'react-redux';

const {TextField} = Incubator;

const Home = ({
  navigation,
  dispatch,
  getChats,
  matches,
  getUserMessages,
  request,
}) => {
  const [selectedType, setSelectedType] = useState(null);
  const [searchMatch, updateSearchMatch] = useState(matches);
  const [searchMatchSearch, searchUpdateSearchMatch] = useState(matches);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (matches.length > 0) {
      updateSearchMatch(matches);
      searchUpdateSearchMatch(matches);
    }
  }, [matches]);

  useEffect(() => {
    getChats()
  },[])
  useEffect(() => {
    if (selectedType) {
      if (selectedType === 'Edit Profile') {
        navigation.navigate('EditProfile');
      } else if (selectedType === 'Logout') {
        dispatch({
          type: 'user/update_user_success',
          payload: {response: {user: null, error: null}},
        });
      }
      setSelectedType(null);
    }
  }, [selectedType]);

  navigation.setOptions({
    headerRight: () => (
      <PopupMenu
        options={['Edit Profile', 'Logout']}
        onPress={setSelectedType}
      />
    ),
  });
  const EmptyMatchView = () => {
    return (
      <View style={[styles.container, styles.match]}>
        <Match />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Making friends is so easy</Text>
          <Text
            style={{
              color: Colors.SecondaryColorLight,
              fontFamily: Typography.primaryFontFamily,
              fontSize: 13,
              fontWeight: '600',
            }}
            center>
            Add strangers by click on ‘Match’ button, and chat with them
            everyday.
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    updateSearchMatch(
      searchMatchSearch.filter(el =>
        `${el.firstName} ${el.lastMessage}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);
  const onChange = ({nativeEvent}) => {
    setSearchText(nativeEvent.text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextField
          style= {{fontSize:14,fontWeight:'600', color:'rgba(43,41,46,0.7)'}}
          placeholder="Search"
          text70
          onChange={onChange}
          leadingAccessory={
            <View style={{marginRight: 10, marginVertical: 1}}>
              <Search />
            </View>
          }
          fieldStyle={styles.withUnderline}
          marginB-s4
        />
      </View>
      <Text style={styles.subHeading}>Your Matches</Text>
      <View style={styles.matchContainer}>
        {searchMatch
          .filter(el => el.match)
          .map(el => (
            <TouchableOpacity
              style={styles.matchCard}
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
              }}>
              <Image
                source={{uri: el.profileUrl}}
                // resizeMode={'contain'}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  position: 'absolute',
                  marginTop: -50,
                }}
              />
              <View style={styles.matchTextContainer}>
                <Text style={styles.name}>
                  {el.firstName} {el.lastName}
                </Text>
                <Text style={styles.location}>{el.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {searchMatch.filter(el => el.match).length === 0 && <EmptyMatchView />}
      
      {request && (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
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
    height: '80%',
  },
  textContainer: {
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: Typography.primaryFontFamily,
  },
  subHeading: {
    marginVertical: 10,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: Typography.primaryFontFamily,
    fontSize: 13,
  },
  searchBar: {
    backgroundColor: Colors.PrimaryColorMedium,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    height:30,
    
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
  },
  matchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  matchCard: {
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    backgroundColor: Colors.searchBoxBg,
    margin: 10,
    height: 130,
    marginTop: 50,
    borderRadius: 5,
  },
  matchTextContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  name: {
    color: Colors.PrimaryColor,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Typography.primaryFontFamily,
    marginBottom: 10,
    textAlign: 'center',
  },
  location: {
    color: Colors.SecondaryColorLight,
    fontFamily: Typography.primaryFontFamily,
    fontSize: 13,
    opacity: 0.7,
  },
});

const selection = store.select.request.isActionLoading('chats/get_chats');

const mapState = state => ({
  matches: state.chats.userChats,
  request: selection(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  getChats: () => dispatch.chats.getChats(),
  getUserMessages: props => dispatch.chats.getUserMessages(props),
});
export default connect(mapState, mapDispatch)(Home);
