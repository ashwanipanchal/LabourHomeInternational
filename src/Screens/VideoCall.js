// import { StyleSheet, Text, View, PermissionsAndroid, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState, useRef } from 'react'
// import AgoraUIKit from 'agora-rn-uikit';
// // import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora'
// import RtcEngine, {
//   RtcLocalView,
//   RtcRemoteView,
//   VideoRenderMode,
// } from 'react-native-agora';
// import requestCameraAndAudioPermission from '../Custom/Permission';


// const config = {
//   appId: "bfcb4dfcf2e94c60afa978b93a202b7c",
//   token: "006bfcb4dfcf2e94c60afa978b93a202b7cIACTtKwa0Ud8WV4uiMR4zvIhyDr82RaxKwb+NVj9pVahezQ8Hc8AAAAAEAB0/t058zPYYgEAAQDzM9hi",
//   channelName: 'interview',
// };
// const dimensions = {
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height,
// }

// const VideoCall = ({ navigation }) => {
//   const _engine = useRef(null);
//   const [vol, setVol] = useState('100')
//   const [engine, setEngine] = useState(undefined);
//   const [isJoined, setJoined] = useState(false);
//   const [peerIds, setPeerIds] = useState([]);
//   const [state, setState] = useState({
//     muted:false
//   })

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       // Request required permissions from Android
//       requestCameraAndAudioPermission().then(() => {
//         console.log('requested!');
//       });
//     }
//   }, []);

//   useEffect(() => {
//     /**
//      * @name init
//      * @description Function to initialize the Rtc Engine, attach event listeners and actions
//      */
//      let isSubscribed = true;
//     //  let rtcEngine;
//     const init = async () => {
//       const { appId } = config;
//       _engine.current = await RtcEngine.create(appId);
//       await _engine.current.enableVideo();
//       //  rtcEngine = await RtcEngine.create(appId);
//       // alert(JSON.stringify(_engine.current,null,2))
//       // await _engine.current.enableVideo();

//       _engine.current.addListener('Warning', (warn) => {
//         console.log('Warning', warn);
//       });

//       _engine.current.addListener('Error', (err) => {
//         console.log('Error', err);
//       });

//       _engine.current.addListener('UserJoined', (uid, elapsed) => {
//         console.log('UserJoined', uid, elapsed);
//         // If new user
//         if (peerIds.indexOf(uid) === -1) {
//           // Add peer ID to state array
//           setPeerIds((prev) => [...prev, uid]);
//         }
//       });

//       _engine.current.addListener('UserOffline', (uid, reason) => {
//         console.log('UserOffline', uid, reason);
//         // Remove peer ID from state array
//         setPeerIds((prev) => prev.filter((id) => id !== uid));
//       });

//       // If Local user joins RTC channel
//       _engine.current.addListener(
//         'JoinChannelSuccess',
//         (channel, uid, elapsed) => {
//           console.log('JoinChannelSuccess', channel, uid, elapsed);
//           // Set state variable to true
//           setJoined(true);
//         }
//       );
//     };
//     init();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [setEngine, config.appId]);

//   /**
//    * @name startCall
//    * @description Function to start the call
//    */
//   const startCall = async () => {
//     // Join Channel using null token and channel name
//     await _engine.current?.joinChannel(
//       config.token,
//       config.channelName,
//       null,
//       0
//     );
//     console.log(_engine.current)
//   };

//   /**
//    * @name endCall
//    * @description Function to end the call
//    */
//   const endCall = async () => {
//     await _engine.current?.leaveChannel();
//     setPeerIds([]);
//     setJoined(false);
//   };

//   const _renderVideos = () => {
//     return isJoined ? (
//       <View style={styles.fullView}>
//         <RtcLocalView.SurfaceView
//           style={styles.max}
//           channelId={config.channelName}
//           renderMode={VideoRenderMode.Hidden}
//         />
//         <TouchableOpacity  style={styles.roundButton1}>
//             <Text style={styles.buttonText}>M</Text>
//           </TouchableOpacity>
//         {_renderRemoteVideos()}
//       </View>
//     ) : null;
//   };

//   const mute = async() => {
//   //  await RtcEngine.adjustAudioMixingVolume(0);
//   await _engine.current.muteLocalAudioStream(state.muted)
//   }
//   const _renderRemoteVideos = () => {
//     return (
//       <ScrollView
//         style={styles.remoteContainer}
//         contentContainerStyle={styles.padding}
//         horizontal={true}
//       >
//         {peerIds.map((value) => {
//           return (
//             <RtcRemoteView.SurfaceView
//               style={styles.remote}
//               uid={value}
//               channelId={config.channelName}
//               renderMode={VideoRenderMode.Hidden}
//               zOrderMediaOverlay={true}
//             />
//           );
//         })}
//       </ScrollView>
//     );
//   };

//   return (
//     <View style={styles.max}>
//       <View style={styles.max}>
//         <View style={styles.buttonHolder}>
//           <TouchableOpacity onPress={startCall} style={styles.button}>
//             <Text style={styles.buttonText}> Start Call </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={endCall} style={styles.button}>
//             <Text style={styles.buttonText}> End Call </Text>
//           </TouchableOpacity>
//         </View>
//         {_renderVideos()}
//       </View>
//     </View>
//   );
// };

// export default VideoCall

// const styles = StyleSheet.create({
//   max: {
//     flex: 1,
//   },
//   buttonHolder: {
//     height: 100,
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#0093E9',
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: '#fff',
//   },
//   fullView: {
//     width: dimensions.width,
//     height: dimensions.height - 100,
//   },
//   remoteContainer: {
//     width: '100%',
//     height: 150,
//     position: 'absolute',
//     top: 5
//   },
//   remote: {
//     width: 150,
//     height: 150,
//     marginHorizontal: 2.5
//   },
//   noUserText: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     color: '#0093E9',
//   },
//   roundButton1: {
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 50,
//     backgroundColor: 'orange',
//   }
// })

import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AgoraUIKit, { VideoRenderMode } from 'agora-rn-uikit';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import GridVideo from 'agora-rn-uikit/src/Views/GridVideo';
import { Api,LocalStorage } from '../services/Api';

const VideoCall = ({navigation,route}) => {
  console.log('route.params in videocall screen', route.params)
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    // appId: 'a39d2e3cd97d4895840dd9ea23cb3b6a',
    // channel: 'cool',
    // token:'006bfcb4dfcf2e94c60afa978b93a202b7cIABQ9REHWlY3cRube8Y2apsXpUYRwSt4BE3Jzi23XAsbgvdRPe0AAAAAEABE3sOcxpHZYgEAAQDHkdli'
    appId: '27175970298b42c1af98b752b90bd718',
    channel: route.params.bridge_id,
  };
  const rtcCallbacks = {
    EndCall: async () => {
      const type = (await LocalStorage.getUserDetail()) || '';
      const type1 = JSON.parse(type)
      console.log("type1", type1.user_type)
      if(type1.user_type === 1){
        navigation.goBack()
        setVideoCall(false)
      } else {
        
        setVideoCall(false)
        // navigation.goBack()
        const body = {
          "job_id": route.params.job_id,
          "user_id": route.params.user_id,
          "agency_id": route.params.agency_id
        }
        console.log(body)
        const response = await Api.completeInterview(body)
        const {status} = response
        if(status){
          navigation.goBack()
        }
      }
    },
  };

  // videoCall ? (
  //   <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  // ) : (
  //   <Text onPress={()=>setVideoCall(true)}>Start Call</Text>
  // );
  const textStyle = {
    color: '#fff',
    backgroundColor: '#2edb85',
    fontWeight: '700',
    fontSize: 24,
    width: '100%',
    borderColor: '#2edb85',
    borderWidth: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  };
  
  const btnStyle = {
    borderRadius: 2,
    width: 40,
    height: 40,
    backgroundColor: '#2edb85',
    borderWidth: 0,
  };
  
  const startButton = {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '90%',
  };
  
  const remoteBtnStyle = {backgroundColor: '#2edb8555'};
  const styleProps  ={
    // iconSize: 30,
    // theme: '#ffffffee',
    // videoMode: {
    //   max: VideoRenderMode.Hidden,
    //   min: VideoRenderMode.Hidden,
    // },
    // overlayContainer: {
    //   backgroundColor: '#2edb8533',
    //   opacity: 1,
    // },
    // localBtnStyles: {
    //   muteLocalVideo: btnStyle,
    //   muteLocalAudio: btnStyle,
    //   switchCamera: btnStyle,
    //   endCall: {
    //     borderRadius: 0,
    //     width: 50,
    //     height: 50,
    //     backgroundColor: '#f66',
    //     borderWidth: 0,
    //   },
    // },
    // localBtnContainer: {
    //   backgroundColor: '#fff',
    //   bottom: 0,
    //   paddingVertical: 10,
    //   borderWidth: 4,
    //   borderColor: '#2edb85',
    //   height: 80,
    // },
    // maxViewRemoteBtnContainer: {
    //   top: 0,
    //   alignSelf: 'flex-end',
    // },
    // remoteBtnStyles: {
    //   muteRemoteAudio: remoteBtnStyle,
    //   muteRemoteVideo: remoteBtnStyle,
    //   remoteSwap: remoteBtnStyle,
    //   minCloseBtnStyles: remoteBtnStyle,
    // },
    minViewContainer: {
      bottom: 80,
      top: 80,
      left:20,
      // backgroundColor: '#fff',
      // borderColor: '#2edb85',
      // borderWidth: 4,
      height: '26%',
    },
    minViewStyles: {
      height: '100%',
      width:150
    },
    // maxViewStyles: {
    //   height: '64%',
    // },
    // UIKitContainer: {height: '94%'},
     UIKitContainer: {height: '50%', width: '100%'}
  }
  return (
    <View style={{flex:1}}>
      <StatusBarLight/>
      <AgoraUIKit layout={0} styleProps={styleProps} connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    </View>

  )
}

export default VideoCall

const styles = StyleSheet.create({})