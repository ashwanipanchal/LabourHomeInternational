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

const Invoice = ({navigation}) => {
  const [data, setData] = useState([
    {
      title: 'Invoice #6842',
      subTitle: '08 Dec 2021',
    },
    {
      title: 'Invoice #6842',
      subTitle: '08 Dec 2021',
    },
    {
      title: 'Invoice #6842',
      subTitle: '08 Dec 2021',
    },
  ]);
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'My Invoice'} />
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
                  // navigation.navigate('InvoicePdf');
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image}
                    source={require('../images/invoice.png')}
                  />
                  <View>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.subtext}>{item.subTitle}</Text>
                  </View>
                  <Text style={styles.viewText}>View</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Invoice;

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
});
