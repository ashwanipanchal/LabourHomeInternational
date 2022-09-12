import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { Component } from 'react'
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
import Subscription from '../Screens/Subscription';

  export class CashFreeButton extends Component {
  onVerify(cf_payment_id,orderID) {
    console.log('cf_payment_id is :' + cf_payment_id);
    // ()=><Subscription revertData/>
    this.props.onVerify(cf_payment_id, orderID)
    // alert("Payment Done")
  }
  onError(error, orderID) {
    console.log(
      'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
    );
    this.props.onError(error, orderID)
    // alert("Payment Failed")
  }
  
  componentDidMount() {
    console.log('MOUNTED');
    CFPaymentGatewayService.setCallback(this);
  }

  componentWillUnmount() {
    console.log('UNMOUNTED');
    CFPaymentGatewayService.removeCallback();
  }
  render() {
    const {
        data,
        userData,
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
      } = this.props;


      const makePayment= async() => {
        // alert(JSON.stringify(data,null,2))
        // return
        let amount;
        const type = (await LocalStorage.getUserDetail()) || '';
        const type1 = JSON.parse(type)
        console.log("type1", type1)
        if (data) {
        // if (data.selectedIndex) {
          console.log(data)
          console.log(data.planAmount)
          if(type1.user_type === 1){
            amount = data.payment_amount
          }else{

            amount = data.planAmount
          }
          // return
          try {
            // alert(JSON.stringify(type1))
            const body = {
              // "order_amount": "5",
              "order_amount": amount,
              "order_currency": "INR",
              "order_note": "Additional order info",
              "order_id": this.props.orderID,
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
            // setState({ ...state, isLoading: true });
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
            // setState({ ...state, isLoading: false });
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
          }
          catch (e) {
            console.log(e.message);
          }
        } else {
          Toast.show("Please Select a Plan")
        }
      }
      

    return (
        <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled ? disabled : false}
        onPress={makePayment}
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
          <View style={{ height: 24, justifyContent: 'center', alignItems: 'center', }}>
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
    )
  }
}

export default CashFreeButton
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
})