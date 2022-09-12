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
  FlatList,
  Modal,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {
  BottomView,
  EndButton,
  ButtonStyle,
  StartButton,
} from '../Custom/CustomView';
import RNFS from 'react-native-fs';
import {Api, LocalStorage} from '../services/Api'
import Timeline from 'react-native-timeline-flatlist';
import Toast from 'react-native-simple-toast'
import DocumentPicker, { types } from 'react-native-document-picker';
import Loader from '../services/Loader';
const {height} = Dimensions.get('window');

const UserDetail = ({navigation,route}) => {
  const [userJobStatus, setUserJobStatus] = useState()
  const [state, setState] = useState({
    isLoading: false
  })
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(()=>{
    // alert(JSON.stringify(route.params,null,2))
    getData()
  },[])
  const getData = async () => {
    setState({...state, isLoading:true})
    // toggleLoader(true)
    const body = {
      "job_id": JSON.stringify(route.params.job_id),
      "user_id": JSON.stringify(route.params.user_id)
    }
    // alert(body)
    // const response = await Api.getUserDocumentsForStatus(body)
    const response2 = await Api.jobStatusUser(body)
    // alert(JSON.stringify(response2,null,2))
    // const { status, user_details } = response;
    // console.log(" status check for user 1" , response)
    console.log(" status check for user 2" , response2)
    // setUserData(user_details)
    setUserJobStatus(response2)
    setState({...state, isLoading:false})
    
  }
  
  // alert(JSON.stringify(userJobStatus,null,2))
  const appliedFunc = () => {
    if(userJobStatus){
      if(userJobStatus.job_applied === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Job Applied Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Job Applied <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.job_applied_date}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginTop:5 }} source={require('../images/tick1.png')}/>,
        }
      }
  }
}
const documentSubmit = () => {
  if(userJobStatus){
    return <Text>Document Submit <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.document_submit_date} </Text></Text>
  }
}

  const interviewCall = () => {
    if(userJobStatus){
      if(userJobStatus.schedule_interview.length === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Interview Call Schedule Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        if(userJobStatus.interview_done === 1){
        return {
          title: <Text>Interview Call Schedule <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.interview_call}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83'
        }
      }
    }
    }
  }

  const interviewDone = () => {
    if(userJobStatus){
      if(userJobStatus.interview_done === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Interview Done Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        if(userJobStatus.approved === 2 || userJobStatus.approved === 1){
        return {
          title: <Text>Interview Done <Text style={{ color: '#8F9BB3' }}>{userJobStatus.interview_done_date}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83'
        }
      }
    }
    }
  }

  const skillCertificate = () => {
    if(userJobStatus){
      if(userJobStatus.skill_certificate === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Skill Certificate Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        if(userJobStatus.skill_certificate_verified === 'Reject' || userJobStatus.skill_certificate_verified === 'Approve'){
        return {
          title: <Text>Skill Certificate Uploaded <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.skill_certificate_data}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83',
          description:(<Text onPress={()=>navigation.navigate('SkillDocument', route.params)} style={{color: '#2574FF', textDecorationLine:'underline'}}>View all Documents</Text>)
        }
      }
      return {
        title: <Text>Skill Certificate Uploaded <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.skill_certificate_data}</Text></Text>,
        icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        description:(<Text onPress={()=>navigation.navigate('SkillDocument', route.params)} style={{color: '#2574FF', textDecorationLine:'underline'}}>View all Documents</Text>)
      }
    }
    }
  }

  // const statusApprove = () => {
  //   if(userJobStatus){
  //     if(userJobStatus.approved === 0){
  //       return {
  //         title: <Text style={{ color: '#8F9BB3' }}>Status Approved Pending</Text>,
  //         icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
  //       }
  //     }else{
  //       return {
  //         title: <Text>Status Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.approve_date} </Text></Text>,
  //         icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
  //       }
  //     }
      
  //   }
  // }
  const statusApprove = () => {
    if(userJobStatus){
      if(userJobStatus.approved === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Status Approved Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else if(userJobStatus.approved === 2){
        return {
          title: <Text >Status Rejected</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      else{
        if(userJobStatus.skill_certificate === 1){
        return {
          title: <Text>Status Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.approve_date} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83'
        }
      }
      return {
        title: <Text>Status Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.approve_date} </Text></Text>,
        icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
      }
      }
    }
  }

  // const certificateVerified = () => {
  //   if(userJobStatus){
  //     if(userJobStatus.skill_certificate_verified === 'Pending'){
  //       return {
  //         title: <Text style={{ color: '#8F9BB3' }}>Certificate Verified Pending </Text>,
  //         icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
  //       }
  //     }else{
  //       return {
  //         title: <Text>Certificate Verified <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.skill_certificate_data} </Text></Text>,
  //         icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
  //       }
  //     }
      
  //   }
  // }
  const certificateVerified = () => {
    if(userJobStatus){
      if(userJobStatus.skill_certificate_verified === 'Pending'){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Certificate Verified Pending </Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else if(userJobStatus.skill_certificate_verified === "Reject"){
        return {
          title: <Text >Certificate Rejected</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      else{
        // setState(...prevState{...state, payment_button:true})
        if(userJobStatus.payment_received === 1){
        return {
          title: <Text>Certificate Verified <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.skill_certificate_data} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83'
        }
      }
      return {
        title: <Text>Certificate Verified <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.skill_certificate_data} </Text></Text>,
        icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
      }
    }
    }
  }
  const makePayment = () => {
    if(userJobStatus){
      if(userJobStatus.payment_received === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Payment Not Received</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Payment Received <Text style={{ color: '#8F9BB3' }}></Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }

  const data = [
    {
      ...appliedFunc(),
      lineColor:'#00AA83'
    },
    {
      title: documentSubmit(),
      // icon: require('../images/tick1.png'),
      icon: (
        <Image
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
          source={require('../images/tick1.png')}
        />
      ),
      lineColor:'#00AA83',
      description: (<Text onPress={()=>navigation.navigate('Documents', route.params)} style={{color: '#2574FF', textDecorationLine:'underline'}}>View all Documents</Text>)
    },
    {
      ...interviewCall()
      // description: '(Location: C-9/21 Rohini Sector-7 2nd Floor)',
    },
    {
      ...interviewDone()
    },
    {
      ...statusApprove()
    },
    {
      ...skillCertificate(),
      imageUrl: require('../images/Reruiting-agent-slice/skill.png'),
    },
    {
      ...certificateVerified()
    },
    {
      ...makePayment()
    },
  ];

  const getPDF = async() => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })
      if(response){
        console.log(response)
        const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)

         var formData = new FormData();
         formData.append('user_id', route.params.user_id);
         formData.append('job_id', route.params.job_id);
         formData.append('agency_id', route.params.agency_id+' ');
         formData.append('appointment_letter', {
          uri: response[0].uri,
          type: 'application/pdf',
          name: 'image.pdf',
        });
        console.log(JSON.stringify(formData))
        //  const resposeAfterLetter = await Api.uploadAppointmentLetter(formData)
        //  alert(JSON.stringify(resposeAfterLetter,null,2))
        const token = (await LocalStorage.getToken()) || '';
        const btoken = `Bearer ${token}`;
        // console.log(btoken)
        const responseNew = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/appointment_letter_upload',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "multipart/form-data",
          'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
          "Authorization": btoken,
        },
        body: formData

      })
      const userApprovedData = await responseNew.json()
      alert("Appointment letter sent successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'User Detail'}
        // shareOnClick={() => {}}
        // share={require('../images/Reruiting-agent-slice/support.png')}
      />
      <Loader status={state.isLoading}/>
      <ScrollView>
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require('../images/Reruiting-agent-slice/user1.png')}
            />
            <Text style={styles.name}>{route.params.user_name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.userImage}
              source={require('../images/Reruiting-agent-slice/portfolio.png')}
            />
            <Text style={styles.userText}>{route.params.work_exp} Years</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/language.png')}
            />
            <Text style={styles.user2Text}>{route.params.user_language}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/email.png')}
            />
            <Text style={styles.user3Text}>{route.params.user_email}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/iphone.png')}
            />
            <Text style={styles.user3Text}>{route.params.user_mobile}</Text>
          </View>
        </View>

        <View style={styles.subBox}>
          <Text style={styles.text}>Qualification</Text>
          <Text style={styles.subText}>10th & 12th passed</Text>
          <Text style={styles.text}>Job Category</Text>
          <Text style={styles.subText}>{route.params.category_name}</Text>
          <Text style={styles.text}>Work Experience</Text>
          <Text style={styles.subText}>{route.params.work_exp} Years</Text>
        </View>
        <View style={styles.subBox}>
          <Text style={styles.viewJob}>Job Status</Text>
          <View style={styles.Line} />
          <Timeline
            data={data}
            circleColor={'#00AA83'}
            lineColor={'lightgray'}
            listViewStyle={{marginLeft: -25}}
            innerCircle={'icon'}
            iconStyle={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
            titleStyle={{
              color: '#00AA83',
              fontSize: 14,
              marginBottom: 30,
              marginTop: -13,
            }}
            descriptionStyle={{
              color: '#8F9BB3',
              fontSize: 12,
              marginTop: -10,
              marginBottom: 10,
            }}
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          {/* {(userJobStatus.appointment_letter === '' ?  */}
          <ButtonStyle
            title={'SEND APPOINTMENT LETTER'}

            onPress={() => {
              if(userJobStatus.payment_received===1){
                getPDF()
                // setModalOpen(true);
              }else{
                Toast.show("Cannot send appoitment letter untill payment made by user")
              }
            }}
          />
            {/* :
          <ButtonStyle
              title={'LETTER SENT'}

              onPress={() => {
                if(userJobStatus.payment_received===1){
                  getPDF()
                  // setModalOpen(true);
                }else{
                  Toast.show("Cannot send appoitment letter untill payment made by user")
                }
              }}
            />)} */}
        </View>
        <BottomView />
        <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => setModalOpen(false)}>
          <View style={styles.modal_View}>
            <View activeOpacity={0.8} style={styles.mdtop}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                source={require('../images/tick.png')}
              />
              <Text style={styles.ModalText}>
                Appointment Letter{`\n`}
                Send Successfully
              </Text>
              <View style={{width: '45%', alignSelf: 'center', marginTop: 20}}>
                <StartButton
                  title={'GO TO HOME'}
                  onPress={() => {
                    navigation.navigate('ProjectorHome');
                  }}
                />
              </View>
              <BottomView />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  box: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 14,
    elevation: 5,
    marginTop: 40,
    marginBottom: 10,
  },
  subBox: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 14,
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: -30,
    marginTop: -30,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
  },
  userImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 65,
    marginTop: -15,
  },
  userText: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: -19,
    marginLeft: 10,
  },
  user2Image: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 65,
    marginTop: 10,
  },
  user2Text: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 7,
    marginLeft: 10,
  },
  user3Text: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 7,
    marginLeft: 10,
    textShadowColor: 'grey',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 10,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 5,
    marginTop: 5,
  },
  subText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 5,
  },
  viewJob: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 30,
    marginTop: 20,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  mdtop: {
    backgroundColor: '#FFFFFF',
    marginTop: height / 3,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  ModalText: {
    fontFamily: 'Muli-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
});
