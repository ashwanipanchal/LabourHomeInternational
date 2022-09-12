import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { HeaderDark } from '../Custom/CustomView';
import { Api, LocalStorage } from '../services/Api';

const AppointmentLetters = ({navigation}) => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        getLetters() 
    },[])
    const getLetters = async() => {
        const type = (await LocalStorage.getUserDetail()) || '';
        const type1 = JSON.parse(type)
        const body ={
            user_id: type1.id,
        }
        const response = await Api.appointmentLetterList(body)

        // alert(JSON.stringify(response,null,2))
        setData(response.data)
    }
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Appointment Letter'} />
      {(data.length>0 &&
      <ScrollView>
      <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => {
                  navigation.navigate('InvoicePdf', item);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image}
                    source={require('../images/invoice.png')}
                  />
                  <View>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.subtext}>{item.appointment_letter_date}</Text>
                  </View>
                  <Text style={styles.viewText}>View</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>)}
      {(data.length == 0 && <Image style={{resizeMode:'contain',width:'100%', justifyContent:'center', alignItems:'center', flex:1}} source={require('../images/no-data.png')}/>)}
    </View>
  )
}

export default AppointmentLetters

const styles = StyleSheet.create({
    subBox: {
        padding: 10,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 5,
      },
      image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft: 10,
      },
      text: {
        fontFamily: 'Muli-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginLeft: 20,
      },
      subtext: {
        fontFamily: 'Muli-SemiBold',
        fontSize: 14,
        fontWeight: '600',
        color: '#8F92A1',
        marginLeft: 20,
        marginTop: 5,
      },
      viewText: {
        fontFamily: 'Muli-SemiBold',
        fontSize: 13,
        fontWeight: '700',
        color: '#2574FF',
        marginLeft: 'auto',
        padding: 5,
        marginTop: 5,
      },
})