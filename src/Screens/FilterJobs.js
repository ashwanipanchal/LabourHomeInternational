import { StyleSheet, Text, View,FlatList, Image, TouchableOpacity,Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar'
import { HeaderDark } from '../Custom/CustomView'
const {height} = Dimensions.get('window');

const FilterJobs = ({navigation, route}) => {
    // alert(JSON.stringify(route,null,2))
    const [data, setData] = useState()
    useEffect(()=>{
        setData(route.params)
    },[])
  return (
    <View style={{backgroundColor: '#F0F1F3', flex: 1}}>
        <StatusBarLight />
        <HeaderDark onPress={() => navigation.goBack()} title={'Filter Jobs'} />
        <ScrollView>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => navigation.navigate('JobDetails1',{item:item})}
                >
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source={require('../images/Reruiting-agent-slice/images.png')}
                  />
                  <View>
                    <Text style={styles.inText}>{item.name}</Text>
                    <Text style={styles.insubText}>{item.job_location}</Text>
                  </View>
                  {/* <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => doTask(item)}>
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 'auto',
                        marginTop: 15,
                        marginHorizontal: 15,
                      }}
                      source={item.shortlist == 0 ? require('../images/star.png'): require('../images/fill-star.png')}
                    />
                  </TouchableOpacity> */}
                </View>
                <Text style={styles.middleText}>
                {item.job_description.slice(0,50)}…{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.redText}>{item.work_exp} Years</Text>
                  <Text style={styles.redText}>Posted on {item.post_job_date.split(' ')[0]} {item.post_job_date.split(' ')[1]}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
    </View>
  )
}

export default FilterJobs

const styles = StyleSheet.create({
    image: {
        marginTop: height / 3,
        width: 219,
        height: 232,
        resizeMode: 'contain',
        alignSelf: 'center',
      },
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
      inText: {
        fontFamily: 'Muli',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E1F20',
        marginLeft: 15,
        marginTop: 15,
      },
      insubText: {
        fontFamily: 'Muli',
        fontSize: 12,
        fontWeight: '600',
        color: '#8F9BB3',
        marginLeft: 15,
        marginTop: 5,
      },
      redText: {
        fontFamily: 'Muli',
        fontSize: 12,
        fontWeight: '700',
        color: '#1E1F20',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10,
      },
      middleText: {
        fontFamily: 'Muli',
        fontSize: 14,
        fontWeight: '700',
        color: '#8F9BB3',
        marginLeft: 15,
        marginTop: 15,
      },
})