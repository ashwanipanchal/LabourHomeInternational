import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { EndButton } from '../Custom/CustomView';
const { height, width } = Dimensions.get('window');

const NoInternet = () => {
  return (
      <View style={{flex:1}}>
        <StatusBarLight/>
          <ImageBackground style={{height, width, position:'absolute', marginTop:StatusBar.currentHeight, flex:1}} source={require('../images/nointernet.png')}>
            
        
          </ImageBackground>
          <View>
          <Text style={{color: 'black',marginTop:height/1.4, marginLeft:20, fontFamily:'Muli', fontSize:22}}>No Connection</Text>
          <Text style={{color: 'lightgray',marginLeft:20, fontFamily:'Muli', fontSize:20}}>Your internet connection was{`\n`}interrupted, Please retry</Text>
          <View style={{width: '30%' , marginTop: 20, marginLeft:10}}>
            <EndButton
              title={'RETRY'}
              height={45}
              fontSize={16}
              bgColor={'#2574FF'}
              txtcolor={'#fff'}
              onPress={() => {
                // navigation.navigate('CandidateApplied',route.params.item);
              }}
            />
          </View>
          </View>
      </View>
    
  )
}

export default NoInternet

const styles = StyleSheet.create({})