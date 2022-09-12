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
  useWindowDimensions,
  ImageBackgroundBase,
  ImageBackground,
  FlatList,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark, MainView} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Terms = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark
        onPress={() => navigation.goBack()}
        title={'Terms & Condition'}
      />
      <ScrollView>
        <View>
          <Text style={styles.heading}>What is Lorem Ipsum?</Text>
          <Text style={styles.subHeading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            elementum, erat eu volutpat semper, magna nisl rutrum mi, eu
            convallis mauris mi vel tortor. Nulla vehicula orci a semper
            tincidunt. Nam consectetur interdum orci, ut venenatis diam lobortis
            ut. Aliquam mollis nunc enim, in fermentum tortor pulvinar vel. Cras
            at nisl risus. Mauris vehicula ultricies justo tempus lacinia. Donec
            laoreet magna ut sapien convallis fermentum. Curabitur lacinia augue
            a urna aliquet accumsan at a purus. Phasellus varius, arcu quis
            vestibulum dignissim, elit nisl ullamcorper lectus, at placerat
            risus enim id lectus. Proin vel malesuada tellus. Maecenas molestie,
            ipsum non dapibus viverra, mauris est convallis arcu, et eleifend
            quam eros nec nisl. Quisque pulvinar enim metus, nec dapibus tellus
            tempor non. Nulla sed placerat est, vitae volutpat turpis.
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Where can I get some?</Text>
          <Text style={styles.subHeading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            elementum, erat eu volutpat semper, magna nisl rutrum mi, eu
            convallis mauris mi vel tortor. Nulla vehicula orci a semper
            tincidunt. Nam consectetur interdum orci, ut venenatis diam lobortis
            ut. Aliquam mollis nunc enim, in fermentum tortor pulvinar vel. Cras
            at nisl risus. Mauris vehicula ultricies justo tempus lacinia. Donec
            laoreet magna ut sapien convallis fermentum. Curabitur lacinia augue
            a urna aliquet accumsan at a purus. Phasellus varius, arcu quis
            vestibulum dignissim, elit nisl ullamcorper lectus, at placerat
            risus enim id lectus. Proin vel malesuada tellus. Maecenas molestie,
            ipsum non dapibus viverra, mauris est convallis arcu, et eleifend
            quam eros nec nisl. Quisque pulvinar enim metus, nec dapibus tellus
            tempor non. Nulla sed placerat est, vitae volutpat turpis.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 30,
    marginTop: 20,
  },
  subHeading: {
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: '400',
    color: '#747A8D',
    marginHorizontal: 30,
    marginTop: 10,
    lineHeight: 20,
    textAlign: 'justify',
  },
});
