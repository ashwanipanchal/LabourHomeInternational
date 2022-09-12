import React, { useEffect, useState } from 'react';
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
  FlatList,
  Modal,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {
  BottomView,
  EndButton,
  ButtonStyle,
  StartButton,
} from '../Custom/CustomView';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Api, LocalStorage } from '../services/Api'
import Toast from 'react-native-simple-toast';
import {
  CFCallback,
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import CashFreeButton from '../Custom/CashFreeButton';

const { height } = Dimensions.get('window');

const Subscription = ({ navigation, route, props }) => {

  // alert(JSON.stringify(route.params.item.id))
  const [plans, setPlans] = useState([])
  const [token, setToken] = useState()
  const [state, setState] = useState({
    selectedIndex: '',
    planAmount: '',
    isLoading: false
  })

  useEffect(() => {
    // alert(JSON.stringify(route.params,null,2))
    // getOrderToken()
    checkPlan()
  }, [])

  // useEffect(() => {
  //   CFPaymentGatewayService.setCallback()
  //   return () => {
  //     CFPaymentGatewayService.removeCallback()
  //   }
  // }, [])

 

  const checkPlan = async () => {
    const body = {
      user_id: route.params.agency_id,
    }
      // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.getAllSubscriptionPlan(body)
    const { status, subscription_plan } = response;
    if (status) {
      setPlans(subscription_plan)
    }
  }

  const getColor = (item) => {
    if (item.id === 1) {
      return ['#6BACFF', '#151BC4']
    }
    if (item.id === 2) {
      return ['#B44AC8', '#840E91']
    }
    if (item.id === 3) {
      return ['#FF6B9D', '#C41572']
    }
  }
  // alert(JSON.stringify(state))

  // const getOrderToken = async () => {
  //   const type = (await LocalStorage.getUserDetail()) || '';
  //   const type1 = JSON.parse(type)
  //   // console.log("type1", type1)
  //   // alert(JSON.stringify(type1))
  //   const body = {
  //     // "order_amount": "5",
  //     "order_amount": state.planAmount,
  //     "order_currency": "INR",
  //     "order_note": "Additional order info",
  //     "order_id": new Date().getTime().toString(),
  //     "customer_details": {
  //       "customer_id": new Date().getTime().toString(),
  //       // "customer_name": "nick",
  //       // "customer_email": "nick@gmail.com",
  //       // "customer_phone": "9090909090"
  //       "customer_name": type1.name,
  //       "customer_email": type1.email,
  //       "customer_phone": type1.mobile
  //     }
  //   }
  //   // alert(JSON.stringify(body,null,2))
  //   // return
  //   setState({ ...state, isLoading: true });
  //   const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
  //     method: 'POST',
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "x-api-version": "2022-01-01",
  //       "x-client-id": "191510d50ad580d9a9bc059590015191",
  //       "x-client-secret": "63c32fda397e2eebb760be9fd470592be0f72abb"
  //     },
  //     body: JSON.stringify(body)
  //   })
  //   const data = await response.json()
  //   // alert(JSON.stringify(data,null,2))
  //   if (data.order_status) {
  //     setState({ ...state, isLoading: false });
  //     setToken(data)
  //   }
  // }

//NEW VERSION CODE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const makePayment = async () => {

    // await getOrderToken()
    if (state.selectedIndex) {
      try {
        const type = (await LocalStorage.getUserDetail()) || '';
        const type1 = JSON.parse(type)
        // console.log("type1", type1)
        // alert(JSON.stringify(type1))
        const body = {
          // "order_amount": "5",
          "order_amount": state.planAmount,
          "order_currency": "INR",
          "order_note": "Additional order info",
          "order_id": new Date().getTime().toString(),
          "customer_details": {
            "customer_id": new Date().getTime().toString(),
            // "customer_name": "nick",
            // "customer_email": "nick@gmail.com",
            // "customer_phone": "9090909090"
            "customer_name": type1.name,
            "customer_email": type1.email,
            "customer_phone": type1.mobile
          }
        }
        // alert(JSON.stringify(body,null,2))
        // return
        setState({ ...state, isLoading: true });
        const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-api-version": "2022-01-01",
            "x-client-id": "191510d50ad580d9a9bc059590015191",
            "x-client-secret": "63c32fda397e2eebb760be9fd470592be0f72abb"
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        setState({ ...state, isLoading: false });
        // alert(JSON.stringify(data,null,2))
        // if(data.order_status){
        //   setState({ ...state, isLoading: false });
        //   setToken(data)
        // }
        const session = new CFSession(data.order_token, data.order_id, CFEnvironment.SANDBOX);
        const paymentModes = new CFPaymentComponentBuilder()
          .add(CFPaymentModes.CARD)
          .add(CFPaymentModes.UPI)
          .add(CFPaymentModes.NB)
          .add(CFPaymentModes.WALLET)
          .add(CFPaymentModes.PAY_LATER)
          .build();
        const theme = new CFThemeBuilder()
          .setNavigationBarBackgroundColor('#2574FF')
          .setNavigationBarTextColor('#FFFFFF')
          .setButtonBackgroundColor('#FFC107')
          .setButtonTextColor('#FFFFFF')
          .setPrimaryTextColor('#212121')
          .setSecondaryTextColor('#757575')
          .build();
        const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
         CFPaymentGatewayService.doPayment(dropPayment);
        // return
        // navigation.navigate('ProjectorHome')
        

        
        // CFCallback.onError = async(CFErrorResponse, orderID) => {
        //   console.log(
        //     'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
        //   );
        // }
      }
      catch (e) {
        console.log(e.message);
      }
    } else {
      Toast.show("Please Select a Plan")
    }

  }

  // const makePayment1 = async() => {
  //   if (state.selectedIndex) {
  //     try {
  //       const type = (await LocalStorage.getUserDetail()) || '';
  //       const type1 = JSON.parse(type)
  //       // console.log("type1", type1)
  //       // alert(JSON.stringify(type1))
  //       const body = {
  //         "order_amount": state.planAmount,
  //         "order_currency": "INR",
  //         "order_id": new Date().getTime().toString(),
  //       }
  //       setState({ ...state, isLoading: true });
  //       const response = await fetch('https://test.cashfree.com/api/v2/cftoken/order', {
  //         method: 'POST',
  //         headers: {
  //           // "Accept": "application/json",
  //           "Content-Type": "application/json",
  //           // "x-api-version": "2022-01-01",
  //           "x-client-id": "165787760be232473124cd277f787561",
  //           "x-client-secret": "d5c129412fad3a6c87ed97e106d09a52b50c6f83"
  //         },
  //         body: body
  //       })
  //       alert(JSON.stringify(response,null,2))
  //     }catch(e){
  //       console.log("e.message", e.message)
  //     }
    
  //   }
  //   else {
  //     Toast.show("Please Select a Plan")
  //   }
  // }

  return (
    <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Subscription'}
        shareOnClick={() => { }}
        share={require('../images/Reruiting-agent-slice/support.png')}
      />
      {/* <ScrollView> */}
      <Text style={styles.topText}>Choose Subscription</Text>
      <Text style={styles.topSubtext}>
        The ability to simplify means to eliminate the{`\n`}unnecessary so
        that the necessary may speak.
      </Text>

      <FlatList
        data={plans}
        renderItem={({ item, index }) => {
          const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked'
          return (
            <LinearGradient
              colors={getColor(item)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 10,
                marginHorizontal: 30,
                borderRadius: 10,
                marginTop: 30,
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.rate}>Rs {item.amount}/-</Text>
                  <Text style={styles.subText}>
                    {item.total_interview} Interview{`\n`}{item.name}
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <RadioButton
                    // value="first"
                    // status={checked === 'first' ? 'checked' : 'unchecked'}
                    // isSelected={state.selectedIndex === index? 'checked' : 'uncheked'}
                    status={isSelected}
                    onPress={() => {
                      setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                    }}
                    uncheckedColor={'#ffffff4d'}
                    color={'#ffffff4d'}
                  />
                </View>
              </View>
            </LinearGradient>
          )
        }}
      />

      {/* <LinearGradient
          colors={['#6BACFF', '#151BC4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 40,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 1500/-</Text>
              <Text style={styles.subText}>
                50 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#B44AC8', '#840E91']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 2500/-</Text>
              <Text style={styles.subText}>
                200 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#FF6B9D', '#C41572']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 2500/-</Text>
              <Text style={styles.subText}>
                200 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="third"
                status={checked === 'third' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('third')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient> */}
      <View style={{ width: '90%', alignSelf: 'center', marginTop: '30%' }}>
        <CashFreeButton
          data={state}
          onVerify={async(cf_payment_id) => {
            // alert(cf_payment_id)
            const body = {
              "user_id": route.params.agency_id ,
              "plan_id": state.selectedIndex
          }
          const response = await Api.buySubscriptionPlan(body);
          const {status} = response
          if(status){
            navigation.navigate('PaymentSuccessfully',cf_payment_id)
          }
          // alert(JSON.stringify(body))
          }}
          onError={(error, orderID) => {
            alert("Payment Failed Try Again", error)
            navigation.navigate('CandidateApplied')
          }}
          orderID={new Date().getTime().toString()}
          title={'Proceed to payment'}
          loader={state.isLoading}
          onPress={() => {
            state
            // makePayment()
            // navigation.navigate('Payment2', state);
          }}
        />
      </View>
      <BottomView />
      {/* </ScrollView> */}
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  topText: {
    fontSize: 18,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 20,
  },
  topSubtext: {
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#747A8D',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 5,
  },
  rate: {
    fontSize: 20,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    color: '#FEFFFF',
    marginTop: 5,
    marginLeft: 15,
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#FEFFFF',
    marginLeft: 15,
    marginTop: 5,
    lineHeight: 22,
  },
});
