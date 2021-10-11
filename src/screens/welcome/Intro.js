import React, {useState} from 'react';
import {
  View,
  Text,
  Colors,
  Button,
  Typography,
  Carousel,
} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {Communication, GetStarted} from '../../assets/svgs';
import {Pagination} from 'react-native-snap-carousel';
const Intro = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    {
      component: <GetStarted />,
      title: 'Real Money for Real Reach',
      subTitle:
        'Help your network by referring great Businesses, products and earn real money',
    },
    {
      component: <Communication />,
      title: 'Your recommendation is powerful',
      subTitle: 'Use social networks and other medias where ',
    },
  ];

  const {
    navigation: {navigate},
  } = props;

  const navigateToNext = () => {
    navigate('authType');
  };

  let pagination = () => {
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 20,
          height: 10,
          borderRadius: 5,
        }}
        dotColor={Colors.PrimaryColor}
        inactiveDotColor={Colors.PrimaryColor}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotOpacity={0.1}
        inactiveDotScale={0.9}
      />
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, height: '70%', padding: 30}}>
        <View style={{flex: 1}}>{item.component}</View>
        <View>
          <Text
            center
            style={[
              {fontFamily: Typography.primaryFontFamily, paddingHorizontal: 10},
              styles.header,
            ]}>
            {item.title}
          </Text>
          <Text
            center
            style={[
              {fontFamily: Typography.primaryFontFamily, paddingHorizontal: 45},
              styles.subheader,
            ]}>
            {item.subTitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        // margin: 30,
        // padding: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          marginTop: 20,
          fontFamily: Typography.primaryFontFamily,
          fontWeight: 'bold',
        }}>
        What is AdCast about
      </Text>
      <Carousel
        containerStyle={{
          height: '60%',
          width: '100%',
        }}
        onChangePage={setActiveIndex}>
        {carouselItems.map((item, index) => _renderItem({item, index}))}
      </Carousel>
      <View style={styles.button}>
        {pagination()}
        <Button
          backgroundColor={Colors.primary}
          style={styles.btnContinue}
          label="Continue"
          size="medium"
          color={Colors.white}
          margin-10
          onPress={navigateToNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {},
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
  },
  subheader: {
    fontSize: 14,
  },
  centerAlign: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: '100%',
    padding: 20,
    width: '100%',
  },
  positionAbsolute: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
  btnContinue: {
    alignItems: 'center',
    width: 200,
    height: 40,
    marginBottom: 20,
  },
});

export default Intro;
