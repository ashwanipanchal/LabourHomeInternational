import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <View style={styles.topView}>
        <View style={styles.header}>
          <TouchableOpacity style={{ padding:5}} onPress={() => navigation?.openDrawer()}>
            <Image
              source={require('../images/menu.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Image
              source={require('../images/notification.png')}
              style={styles.notificationImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 10,
  },
  notificationImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginTop: 10,
  },
  topView: {
    backgroundColor: '#2574FF',
    padding: 10,
    // height: 130,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});
