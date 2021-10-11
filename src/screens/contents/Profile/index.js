import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Info} from '../../../assets/svgs';
import PopupMenu from '../../../components/PopupMenu';
import {showMessage} from 'react-native-flash-message';
import {
  View,
  Text,
  Colors,
  AnimatedImage,
  Card,
  TouchableOpacity,
  Typography,
} from 'react-native-ui-lib';
import RazorpayCheckout from 'react-native-razorpay';
import {connect} from 'react-redux';

function Profile(props) {
  const [selectedType, setSelectedType] = useState(null);
  const {userData, coins, dispatch} = props;
  const user = {
    name: userData.name,
    coins: userData.coins,
    image: userData.images[0],
    mobile: userData.mobile,
  };

  useEffect(() => {
    if (selectedType) {
      if (selectedType === 'Edit Profile') {
        props.navigation.navigate('EditProfile');
      } else if (selectedType === 'Logout') {
        dispatch({
          type: 'user/update_user_success',
          payload: {response: {user: null, error: null}},
        });
      }
      setSelectedType(null);
    }
  }, [selectedType]);
  props.navigation.setOptions({
    headerRight: () => (
      <PopupMenu
        options={['Edit Profile', 'Logout']}
        onPress={setSelectedType}
        darkTriggerText
      />
    ),
  });

  const onPress = (amount, selectedCoins) => {
    const options = {
      description: 'Add coins',
      image: 'https://excelegal.in/static/media/logo-dark.34e30e9f.png',
      currency: 'INR',
      key: 'rzp_test_tE7UkHyvH9Yr25',
      amount: amount * 100,
      name: user.name,
      prefill: {
        name: user.name,
        contact: user.mobile,
        email: 'random@adcast.com',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        dispatch({
          type: 'user/update_user_success',
          payload: {
            response: {
              error: false,
              user: {...userData, coins: userData.coins + selectedCoins},
            },
          },
        });
      })
      .catch(error => {
        showMessage({
          message: 'User canncel the payment',
          type: 'danger',
        });
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.personalContainer}>
        <View>
          <Text style={styles.heading}>Hi,</Text>
          <Text style={styles.subHeading}>{user.name}</Text>
        </View>
        {user.image && (
          <AnimatedImage
            containerStyle={styles.image}
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 50,
            }}
            source={{uri: `data:image/png;base64,${user.image}`}}
            loader={<ActivityIndicator />}
            animationDuration={300}
          />
        )}
      </View>
      <Text style={styles.subHeadingBalance}>
        Current Balance :{' '}
        <Text style={{fontWeight: 'bold', color: Colors.PrimaryColor}}>
          {user.coins}
        </Text>{' '}
        coins{' '}
      </Text>
      <View style={styles.buyCoins}>
        <View style={styles.icon}>
          <Text color={Colors.PrimaryColor} style={styles.buyHeading}>
            Buy Coins
          </Text>
          <Info />
        </View>
        {coins.map((el, index) => (
          <Card style={styles.singleCoinContainer} key={index}>
            {el.topBannerText !== '' && (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FBB034', '#FFDD00']}
                style={styles.bannerText}>
                <Text
                  color={Colors.white}
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  {el.topBannerText}
                </Text>
              </LinearGradient>
            )}
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                padding: 30,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: Typography.primaryFontFamily,
                }}>
                {el.coins}
                {'\n'}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    fontFamily: Typography.primaryFontFamily,
                  }}
                  color="rgba(43,41,46,0.7)">
                  {'Coins'}
                </Text>
              </Text>
              <Text
                color={Colors.PrimaryColor}
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  fontFamily: Typography.primaryFontFamily,
                  width: 80,
                  marginLeft:40
                }}>
                {el.currency} {el.price}
              </Text>
              <TouchableOpacity
                style={styles.buy}
                onPress={() => onPress(el.price, el.coins)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    fontFamily: Typography.primaryFontFamily,
                    textAlign: 'center',
                    width: '100%',
                  }}
                  color={Colors.PrimaryColor}>
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeadingBalance: {
    fontSize: 16,
    marginHorizontal: 10,
    color: Colors.PrimaryColor,
  },
  image: {
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  personalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 10,
  },
  buyCoins: {
    backgroundColor: Colors.searchBoxBg,
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10,
  },
  singleCoin: {
    backgroundColor: Colors.white,
  },
  bannerText: {
    backgroundColor: 'yellow',
    width: '20%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 40,
    position: 'absolute',
  },
  singleCoinContainer: {
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  buy: {
    backgroundColor: Colors.searchBoxBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 80,
    borderRadius: 10,
  },
  buyHeading: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Typography.primaryFontFamily,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapState = state => ({
  userData: state.user.user,
  coins: state.coins.coins,
});
const mapDispatch = dispatch => ({
  dispatch,
});
export default connect(mapState, mapDispatch)(Profile);
