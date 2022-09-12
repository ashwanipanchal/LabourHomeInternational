import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export const MainView = props => (
  <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }} {...props} />
);

export const BottomView = props => (
  <View style={{ marginBottom: 30 }} {...props} />
);

export const ButtonStyle = props => {
  const {
    title,
    bgColor,
    txtcolor,
    marginHorizontal,
    onPress,
    height,
    fontSize,
    loader,
    disabled,
    borderColor
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled ? disabled : false}
      onPress={onPress}
      style={[
        styles.facebookButton,
        {
          height: height ? height : 50,
          borderColor: borderColor ? borderColor : '#6CBDFF',
          backgroundColor: bgColor ? bgColor : '#2574FF',
          marginHorizontal: marginHorizontal ? marginHorizontal : 15,
        },
      ]}>
      {loader ?
        <View disabled style={{ height: 24, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator color={'#fff'} size={'small'} />
        </View>
        :
        <Text
          style={[
            styles.facebooktext,
            {
              fontSize: fontSize ? fontSize : 16,
              color: txtcolor ? txtcolor : 'white',
            },
          ]}>
          {title}
        </Text>
      }
    </TouchableOpacity>
  );
};

export const StartButton = props => {
  const {
    title,
    bgColor,
    txtcolor,
    marginHorizontal,
    onPress,
    height,
    fontSize,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.facebookButton,
        {
          height: height ? height : 40,
          backgroundColor: bgColor ? bgColor : '#2574FF',
          marginHorizontal: marginHorizontal ? marginHorizontal : 10,
        },
      ]}>
      <Text
        style={[
          styles.facebooktext,
          {
            fontSize: fontSize ? fontSize : 16,
            color: txtcolor ? txtcolor : 'white',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6CBDFF',
    borderWidth: 1,
  },
  facebooktext: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    alignSelf: 'center',
  },
  containerStyle: {
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#1B172C',
    marginTop: 40,
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    backgroundColor: '#1B172C',
  },
});

export const EndButton = props => {
  const {
    title,
    bgColor,
    txtcolor,
    marginHorizontal,
    onPress,
    loader,
    height,
    fontSize,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        btnstyles.facebookButton,
        {
          height: height ? height : 25,
          backgroundColor: bgColor ? bgColor : '#00C327',
          marginHorizontal: marginHorizontal ? marginHorizontal : 10,
        },
      ]}>
      {loader ?
        <View style={{ height: 24, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator color={'#fff'} size={'small'} />
        </View>
        :
        <Text
          style={[
            btnstyles.facebooktext,
            {
              fontSize: fontSize ? fontSize : 10,
              color: txtcolor ? txtcolor : 'white',
            },
          ]}>
          {title}
        </Text>
      }
    </TouchableOpacity>
  );
};

const btnstyles = StyleSheet.create({
  facebookButton: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebooktext: {
    fontFamily: 'Muli',
    fontWeight: '700',
    alignSelf: 'center',
  },
  containerStyle: {
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#1B172C',
    marginTop: 40,
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    backgroundColor: '#1B172C',
  },
});




export const DisableButton = props => {
  const {
    title,
    bgColor,
    txtcolor,
    marginHorizontal,
    onPress,
    loader,
    height,
    fontSize,
  } = props;
  return (
    <Pressable
      activeOpacity={0.8}
      onPress={onPress}
      disabled={true}
      style={[
        btnstyles.facebookButton,
        {
          height: height ? height : 25,
          backgroundColor: bgColor ? bgColor : '#00C327',
          marginHorizontal: marginHorizontal ? marginHorizontal : 10,
        },
      ]}>
        {loader ?
        <View disabled style={{ height: 24, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator color={'#fff'} size={'small'} />
        </View>
        :
      <Text
        style={[
          btnstyles.facebooktext,
          {
            fontSize: fontSize ? fontSize : 10,
            color: txtcolor ? txtcolor : 'white',
          },
        ]}>
        {title}
      </Text>}
    </Pressable>
  );
};


export const SubHeader = props => (
  <View style={SubheaderStyle.flexView}>
    <ImageBackground
      style={{ width: '100%', height: 260, resizeMode: 'contain' }}
      source={require('../images/background.png')}>
      <TouchableOpacity
        style={SubheaderStyle.touchBack}
        onPress={props.onPress}>
        <Image
          source={require('../images/back.png')}
          style={SubheaderStyle.imageBack}
        />
      </TouchableOpacity>
      <Text style={SubheaderStyle.textTitle}>{props.title}</Text>
    </ImageBackground>
  </View>
);

const SubheaderStyle = StyleSheet.create({
  viewHeader: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageBack: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 20,
  },
  touchBack: {
    position: 'absolute',
    left: 0,
  },
  textTitle: {
    fontFamily: 'Muli',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    marginTop: 45,
    textAlign: 'center',
  },
  flexView: {
    flexDirection: 'row',
    // marginTop: 40,
    // marginLeft: 10,
    alignItems: 'center',
  },
  sharePic: {
    width: 20,
    height: 24,
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: -25,
  },
});

export const Header = props => (
  <View style={headerStyle.flexView}>
    <ImageBackground
      style={{ width: '100%', height: 260, resizeMode: 'contain' }}
      source={require('../images/background.png')}>
      <TouchableOpacity style={headerStyle.touchBack} onPress={props.onPress}>
        <Image
          source={require('../images/back.png')}
          style={headerStyle.imageBack}
        />
      </TouchableOpacity>
      <Text style={headerStyle.textTitle}>{props.title}</Text>
      <Image
        source={require('../images/notification1.png')}
        style={headerStyle.sharePic}
      />
    </ImageBackground>
  </View>
);

const headerStyle = StyleSheet.create({
  viewHeader: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageBack: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  touchBack: {
    position: 'absolute',
    // left: 0,
    width: 35, height: 30,
    marginTop: 48,
    marginLeft: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  textTitle: {
    fontFamily: 'Muli',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    marginTop: 45,
    textAlign: 'center',
  },
  flexView: {
    flexDirection: 'row',
    // marginTop: 40,
    // marginLeft: 10,
    alignItems: 'center',
  },
  sharePic: {
    width: 20,
    height: 24,
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: -25,
  },
});

export const Header2 = props => {
  const navigation = useNavigation();
  return(
  <View style={header3Style.viewHeader}>
    <View style={header3Style.flexView}>
      <Image
        source={require('../images/Reruiting-agent-slice/logo.png')}
        style={header3Style.imageBack}
      />
      {/* <Text style={header3Style.textTitle}>{props.title}</Text> */}
      {/* <Image
        source={require('../images/Reruiting-agent-slice/support.png')}
        style={header3Style.sharePic}
      /> */}
      <TouchableOpacity onPress={()=>{navigation.navigate('Notification')}}>
        <Image
          source={require('../images/notification.png')}
          style={header3Style.Pic}
        />
      </TouchableOpacity>
    </View>
  </View>)
};

const header3Style = StyleSheet.create({
  viewHeader: {
    width: '100%',
    backgroundColor: '#2574FF',
    padding: 20,
  },
  imageBack: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 50,
    // marginLeft: 10,
  },
  touchBack: {
    position: 'absolute',
    left: 0,
  },
  textTitle: {
    fontFamily: 'Muli',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    marginTop: 45,
    textAlign: 'center',
  },
  flexView: {
    flexDirection: 'row',
    // marginTop: 40,
    justifyContent:'space-between',
    // marginLeft: 10,
    alignItems: 'center',
  },
  sharePic: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: 50,
  },
  Pic: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    // marginLeft: 'auto',
    marginHorizontal: 10,
    marginTop: 50,
  },
});

export const Header3 = props => {
  const navigation = useNavigation();
  return (
  <View style={header4Style.viewHeader}>
    <View style={header4Style.flexView}>
      <Image
        source={require('../images/Reruiting-agent-slice/logo.png')}
        style={header4Style.imageBack}
      />
      {/* <Text style={header4Style.textTitle}>{props.title}</Text> */}
      <TouchableOpacity onPress={()=>navigation.navigate('Notification')}>
      <Image
        source={require('../images/notification.png')}
        style={header4Style.Pic}
      />
      </TouchableOpacity>
    </View>
  </View>
)};

const header4Style = StyleSheet.create({
  viewHeader: {
    width: '100%',
    backgroundColor: '#2574FF',
    padding: 20,
  },
  imageBack: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 10,
  },
  touchBack: {
    position: 'absolute',
    left: 0,
  },
  textTitle: {
    fontFamily: 'Muli',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    marginTop: 45,
    textAlign: 'center',
  },
  flexView: {
    flexDirection: 'row',
    // marginTop: 40,
    // marginLeft: 10,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  sharePic: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: 50,
  },
  Pic: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: 50,
  },
});

export const HeaderDark = props => (
  <View style={header2Style.viewHeader}>
    <View style={header2Style.flexView}>
      <TouchableOpacity style={header2Style.touchBack} onPress={props.onPress}>
        <Image
          source={require('../images/back.png')}
          style={header2Style.imageBack}
        />
      </TouchableOpacity>
      <Text style={header2Style.textTitle}>{props.title}</Text>
    </View>
  </View>
);
export const HeaderDarkForDownload = props => (
  <View style={header2Style.viewHeader}>
    <View style={header2Style.flexView}>
      <TouchableOpacity style={header2Style.touchBack} onPress={props.onPress}>
        <Image
          source={require('../images/back.png')}
          style={header2Style.imageBack}
        />
      </TouchableOpacity>
      <Text style={header2Style.textTitle}>{props.title}</Text>
      <TouchableOpacity style={{alignSelf:'flex-end',padding:8, }} onPress={props.onPress}>
        <Image source={require('../images/downloadicon.png')} style={{width:24, height:24, alignSelf:'flex-end'}}/>
      </TouchableOpacity>
    </View>
  </View>
);
const header2Style = StyleSheet.create({
  viewHeader: {
    width: '100%',
    backgroundColor: '#2574FF',
    flexDirection:'row',
    padding: 20,
    justifyContent:'space-between'
  },
  imageBack: {
    width: 12,
    height: 22,
    // backgroundColor:'red',
    paddingHorizontal:15,
    resizeMode: 'contain',
    marginTop: 5,
  },
  touchBack: {
    position: 'absolute',
    // backgroundColor:'red',
    padding:10,
    left: -10,
  },
  textTitle: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 40,
  },
  flexView: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 10,
    alignItems: 'center',
  },
});

export const HeaderLight = props => (
  <View style={subheader.viewHeader}>
    <View style={subheader.flexView}>
      {/* <TouchableOpacity style={subheader.touchBack} onPress={props.onPress}>
        <Image
          source={require('../images/back.png')}
          style={subheader.imageBack}
        />
      </TouchableOpacity> */}
      <Text style={subheader.textTitle}>{props.title}</Text>
    </View>
  </View>
);

const subheader = StyleSheet.create({
  viewHeader: {
    width: '100%',
    // height: 219,
    height: hp(30),
    backgroundColor: '#2574FF',
    // padding: 15,
    paddingHorizontal: 10,
  },
  imageBack: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  touchBack: {
    position: 'absolute',
    left: 0,
  },
  textTitle: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 40,
  },
  flexView: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    alignItems: 'center',
  },
});

export const BottomButton = props => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={bottomStyle.bottomView}
    onPress={props.onPress}>
    <Text style={bottomStyle.textTitle}>{props.bottomtitle}</Text>
  </TouchableOpacity>
);

export const bottomStyle = StyleSheet.create({
  bottomView: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#ED6E1E',
    borderRadius: 20,
    padding: 10,
    marginTop: 60,
    marginBottom: 10,
  },
  textTitle: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export const CustomTextField = props => (
  <TextField
    fontSize={18}
    textColor={'#1E2432'}
    tintColor={'grey'}
    containerStyle={{
      backgroundColor: '#FFFFFF',
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      marginBottom: 10,
      elevation: 4,
    }}
    inputContainerStyle={{ marginHorizontal: 20, height: 48 }}
    {...props}
  />
);
