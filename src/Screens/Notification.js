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
  ActivityIndicator,
  FlatList,
  RefreshControl
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark, MainView} from '../Custom/CustomView';
import { Api, LocalStorage } from '../services/Api';
const {height} = Dimensions.get('window');

const Notification = ({navigation,route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isLoading:false
  })

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  useEffect(()=>{
    getUserNotification()
  },[])
  const getUserNotification = async() => {
    toggleLoader(true)
    const type = (await LocalStorage.getUserDetail()) || '';
    const type1 = JSON.parse(type)
    // alert(JSON.stringify(type1))
    const body = {
      "id": type1.id,
      "offset":"0",
      "limit":"10"
  }
  // alert(JSON.stringify(body,null,2))
    const response = await Api.getNotification(body)
    const {status} = response;
    console.log(response)
    if(status){
      setData(response.data)
      toggleLoader(false)
    }
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>{
      // alert("HI")
      getUserNotification()
       setRefreshing(false)});
  }, []);
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Notification'} />
      <ScrollView>
      {state.isLoading ?
        <View>
          <ActivityIndicator size="small" color="#2574FF" />
        </View>
        :
        <View>
          <FlatList
            numColumns={1}
            data={data}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={refreshing}
                onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:-20, borderBottomWidth:0.5, borderColor:'lightgray', }}>
                <Image style={styles.image} source={require('../images/Reruiting-agent-slice/project-exporter/logo.png')} />
                <View>
                  <Text style={styles.text}>
                    {item.title}{`\n`}
                    <Text style={{}}>{item.body}</Text>
                  </Text>
                  <Text style={{ marginLeft: 30, color: '#9393AA', marginTop: 5 }}>
                    {item.created_at}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      }
      </ScrollView>
    </View>
  );
};

export default Notification;

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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: 30,
  },
  text: {
    fontFamily: 'Muli-Regular',
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 30,
    marginTop: 30,
    lineHeight: 24,
  },
});
