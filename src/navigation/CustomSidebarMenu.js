import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Colors, Image, Typography} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Separator from '../components/Separator';

const CustomSidebarMenu = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image assetName="profilePicture" style={styles.profileImage} />
        <View style={styles.center}>
          <Text style={styles.name}>Nishanth</Text>
          <Text style={styles.std}>12th, Science</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.separator}>
        <Separator />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.logOut}>
          <AntDesign name="logout" size={20} color={Colors.darkBlack} />
          <Text style={styles.logOutText}>Log Out</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.logOut}>
          <AntDesign name="help" size={20} color={Colors.darkBlack} />
          <Text style={styles.logOutText}>Help Desk</Text>
        </View>
      </View>
      <View style={styles.separator}>
        <Separator />
      </View>
      <Text style={styles.website}>www.renukaiedukar.com</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.blueGray,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.PrimaryColorLight,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    color: Colors.SecondaryColorDark,
    fontFamily: Typography.primaryFontFamilyBold,
  },
  std: {
    fontSize: 13,
    color: Colors.PrimaryColorLight,
    fontFamily: Typography.primaryFontFamily,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  verticalLine: {
    borderWidth: 0.2,
    borderColor: Colors.darkBlack,
    marginVertical: 8,
  },
  logOutText: {
    fontSize: 16,
    fontFamily: Typography.primaryFontFamily,
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.darkBlack,
  },
  separator: {
    marginHorizontal: 10,
  },
  website: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Typography.primaryFontFamily,
    marginVertical: 10,
    color: Colors.PrimaryColorLight,
  },
  center: {
    alignSelf: 'center',
  },
});

export default CustomSidebarMenu;
