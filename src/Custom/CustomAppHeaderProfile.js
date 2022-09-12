import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function AppHeader(navigation) {
  const {
    leftIcon,
    search,
    searchOnClick,
    leftOnClick,
    title,
    smailTitle,
    onClickSmailTitle,
    backIcon,
    backOnClick,
    titlePaddingHorizontal,
    alrm,
    alrmOnClick,
    elevation,
    searchIcontintColor,
    filter,
    filterOnClick,
    share,
    shareOnClick,
  } = navigation;
  return (
    <SafeAreaView
      style={[styles.headerViewOffCss,  {elevation: elevation ? elevation : 5}]}>
      {leftIcon ? (
        <View style={{flex: 0.2}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              leftOnClick();
            }}>
            <Image style={{width: wp(11), height: hp(7)}} source={leftIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 0.2}}>
          <TouchableOpacity
            onPress={() => {
              backOnClick();
            }}>
            <Image style={styles.backIcon} source={backIcon} />
          </TouchableOpacity>
        </View>
      )}
      {title && (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center',  marginRight:30}}>
          <Text
            numberOfLines={1}
            style={[
              styles.titleTextOffCss,
              {
                paddingHorizontal: titlePaddingHorizontal
                  ? titlePaddingHorizontal
                  : 0,
              },
            ]}>
            {title}
          </Text>
          {smailTitle && (
            <Text
              onPress={() => {
                onClickSmailTitle();
              }}
              numberOfLines={1}
              style={styles.smailTitleTextOffCss}>
              {smailTitle}
            </Text>
          )}
        </View>
      )}
      {search && (
        <View
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              searchOnClick();
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
                // tintColor: searchIcontintColor ? searchIcontintColor : '#000',
                marginTop: 30,
                marginLeft: -20,
              }}
              source={require('../images/notification1.png')}
            />
          </TouchableOpacity>
        </View>
      )}



      {filter && (
        <View
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              filterOnClick();
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
                // tintColor: searchIcontintColor ? searchIcontintColor : '#000',
                marginTop: 30,
              }}
              source={require('../images/notification1.png')}
            />
          </TouchableOpacity>
        </View>
      )}

      {share && (
        <View>
          <TouchableOpacity
            onPress={() => {
              shareOnClick();
            }}>
            <Image
              // style={{
              //   width: 20,
              //   height: 20,
              //   resizeMode:'contain',
              //   // tintColor: searchIcontintColor ? searchIcontintColor : '#000',
              //   marginTop: 30,
              //   // position:'absolute',
              //   // right:0
              // }}
              style= {{
                width: 20,
                height: 24,
                marginLeft: 'auto',
                marginHorizontal: 15,
                marginTop: 30,
              }}
              source={share}
            />
          </TouchableOpacity>
        </View>
      )}

      {alrm && (
        <View style={{flex: 0.2, alignItems: 'flex-end', paddingHorizontal: 5}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.alrmViewOffCss}
            onPress={() => {
              alrmOnClick();
            }}>
            <Image
              style={{width: 16, height: 20, resizeMode: 'contain'}}
              source={alrm}
            />
            {/* {countsNotifi ?
                            <View style={styles.notificationViewOffCss}>
                                <Text style={styles.notificationTextOffCss}>{countsNotifi}</Text>
                            </View>
                            : null} */}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerViewOffCss: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#2574FF',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  titleTextOffCss: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    marginTop: 30,
  },
  smailTitleTextOffCss: {
    color: '#606E87',
    fontSize: hp(2),
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  backIcon: {
    width: '30%',
    height: 22,
    resizeMode: 'contain',
    marginTop: 30,
  },
  notificationViewOffCss: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    right: 0,
  },
  notificationTextOffCss: {
    color: '#fff',
    fontSize: 8,
    fontFamily: 'Avenir-Heavy',
  },
  alrmViewOffCss: {
    width: 30,
    height: 30,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    //   shadowRadius: 60,
    shadowColor: Platform.OS == 'ios' ? '#00000060' : '#000000',
  },
});

export default AppHeader;
