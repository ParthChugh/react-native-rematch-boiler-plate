import React, {useEffect} from 'react';
import {
  Colors,
  Text,
  View,
  TouchableOpacity,
  Typography,
  Card,
} from 'react-native-ui-lib';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import store from '../../../store';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';
import RazorpayCheckout from 'react-native-razorpay';

const PurchaseCoins = props => {
  const {
    coins: {coins},
    userData: {user},
    dispatch,
    getCoins,
    request,
  } = props;

  useEffect(() => {
    getCoins();
  }, []);

  const onPress = (amount, selectedCoins) => {
    const options = {
      description: 'Add coins',
      image: 'https://excelegal.in/static/media/logo-dark.34e30e9f.png',
      currency: 'INR',
      key: 'rzp_test_tE7UkHyvH9Yr25', // Your api key
      amount: amount * 100,
      name: user.name,
      prefill: {
        name: user.name,
        contact: user.mobile,
        email: 'random@StoreFront.com',
      },
      theme: {color: Colors.PrimaryColor},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        showMessage({
          message: `${selectedCoins} Coins Added`,
          type: 'success',
        });
        const response = {
          error: false,
          user: {...user, coins: user.coins + amount},
        };
        dispatch({type: 'user/update_user_success', payload: {response}});
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
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
      <ScrollView>
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
                color="#3AAFA9"
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  fontFamily: Typography.primaryFontFamily,
                  width: 80,
                  marginLeft: 40,
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
                  }}
                  color="#3AAFA9">
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.purchase}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
            );
          }}>
          <Text style={styles.skip} color="#3AAFA9">
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
      {request && (
        <ActivityIndicator
          style={{position: 'absolute', bottom: 0, top: 0, left: 0, right: 0}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadIcon: {
    alignItems: 'center',
    marginVertical: 40,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  singleCoinContainer: {
    borderRadius: 10,
    marginVertical: 10,
    // backgroundColor: Colors.PrimaryColorLight || '#F7F3FC',
    backgroundColor: '#ffffff',
  },
  buy: {
    backgroundColor: '#f6fcfc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
  },
  buyHeading: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontFamily: Typography.primaryFontFamily,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#f6fcfc',
  },
  button: {
    borderRadius: 5,
    height: 50,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonStyle: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
  },
  skip: {
    textAlign: 'center',
    marginVertical: 3,
    fontFamily: Typography.primaryFontFamily,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  bannerText: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 40,
    position: 'absolute',
    width: '20%',
  },
  purchase: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginHorizontal: 10,
    marginVertical: -18,
  },
});

const selection = store.select.request.isActionLoading('coins/get_coins');

const mapState = state => ({
  coins: state.coins,
  userData: state.user,
  request: selection(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  getCoins: () => dispatch.coins.getCoins(),
});

export default connect(mapState, mapDispatch)(PurchaseCoins);
