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
import {RadioButton} from 'react-native-paper';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Payment = ({navigation}) => {
  const [checked, setChecked] = useState('first');
  return (
    <View style={{backgroundColor: '#F4F4F4', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Payment'} />
      <ScrollView>
        <View style={styles.subBox}>
          <View style={styles.topv4_Style}>
            <View>
              <Text style={styles.text2_Style}>UPI</Text>
            </View>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              uncheckedColor={'#69707F'}
              color={'#2574FF'}
            />
          </View>
          <View style={styles.Line} />
          <View style={styles.topv4_Style}>
            <View>
              <Text style={styles.text2_Style}>Debit Card</Text>
            </View>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
              uncheckedColor={'#69707F'}
              color={'#2574FF'}
            />
          </View>
          <View style={styles.Line} />
          <View style={styles.topv4_Style}>
            <View>
              <Text style={styles.text2_Style}>Credit Card</Text>
            </View>
            <RadioButton
              value="third"
              status={checked === 'third' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('third')}
              uncheckedColor={'#69707F'}
              color={'#2574FF'}
            />
          </View>
        </View>
        <View style={styles.subBox}>
          <Text style={styles.details}>PAYMENT DETAILS</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.amount}>Total Amount</Text>
            <Text style={styles.amount}>₹5000.00</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#2574FF4d'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.amount2}>Total PAY</Text>
            <Text style={styles.amount2}>₹5000.00</Text>
          </View>
        </View>
        <View style={{width: '100%', marginTop: '80%'}}>
          <ButtonStyle
            title={'PROCEED TO CHECKOUT'}
            onPress={() => {
              navigation.navigate('PaymentSuccess');
            }}
          />
        </View>
        <BottomView />
      </ScrollView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  subBox: {
    padding: 10,
    // marginHorizontal: 15,
    backgroundColor: '#fff',
    // elevation: 5,
    // borderRadius: 10,
    marginTop: 20,
    // marginLeft: 20,
    // marginBottom: 5,
  },
  topv4_Style: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  text2_Style: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 15,
    color: '#000521',
    fontWeight: '700',
    marginHorizontal: 10,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  details: {
    fontFamily: 'Muli-Bold',
    fontSize: 12,
    color: '#8D92A3',
    fontWeight: '700',
    marginLeft: 30,
  },
  amount: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    color: '#1E1F20',
    fontWeight: '700',
    marginTop: 10,
    marginHorizontal: 30,
  },
  amount2: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    color: '#2574FF',
    fontWeight: '700',
    marginTop: 10,
    marginHorizontal: 40,
    marginBottom: 10,
  },
});
