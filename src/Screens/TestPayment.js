import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar'
import { HeaderDark } from '../Custom/CustomView'
import { CFPaymentGatewayService, } from 'react-native-cashfree-pg-sdk';
  import {
    CFDropCheckoutPayment,
    CFEnvironment,
    CFPaymentComponentBuilder,
    CFPaymentModes,
    CFSession,
    CFThemeBuilder,
  } from 'cashfree-pg-api-contract';
// import { Button } from 'react-native-paper';

const TestPayment = ({navigation}) => {

   const startCheckout = async () => {
        try {
            const session = new CFSession('iLaXCvdq2EP0TWGNviFI', '1212', CFEnvironment.SANDBOX);
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
    }
  return (
    <View style={{flex:1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Payment'} />
      <View style={styles.container}>
        <View style={styles.button}>
            <Button title='Payment' onPress={()=>startCheckout()}/>
        </View>
      </View>
    </View>
  )
}

export default TestPayment

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 56 : 24,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    button: {
        color: '#61aafb',
        margin: 8,
        width: 200,
    },
    response_text: {
        margin: 16,
        fontSize: 14,
    },
})