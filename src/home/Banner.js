import React from 'react';
import {View, Image, ScrollView, Dimensions, FlatList} from 'react-native';
const {width} = Dimensions.get('window');
// const height = width * 0.3;

const images = [
  {
    source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
  },
  {
    source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
  },
  {
    source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
  },
];

const banner = (props) => {
  console.log("Props from Banner ", props)
  const {bn} = props;
  return (
    <View style={{marginTop: 40}}>
      <ScrollView horizontal>
        {images.map((item, index) => {
          console.log("item image source==", item,index)
          const {source} = item;
          console.log("image source==", source)
          return (
            <Image
              key={index}
              source={source}
              style={{
                width: 340,
                height: 167,
                marginLeft:20,
                // marginHorizontal: 30,
                resizeMode: 'contain',
              }}
            />
          );
        })}
      </ScrollView>
      {/* <FlatList
        data={bn}
        renderItem={(item, index)=>{
          {console.log(item)}
          <Image
              key={index}
              source={{uri : item.image_url}}
              style={{
                width: 340,
                height: 167,
                marginLeft:20,
                // marginHorizontal: 30,
                resizeMode: 'contain',
              }}
            />
        }}
      /> */}

    </View>
  );
};
export default banner;

// import React from 'react';
// import Carousel from 'react-native-banner-carousel';
// import {StyleSheet, Image, View, Dimensions} from 'react-native';

// const BannerWidth = Dimensions.get('window').width;
// const BannerHeight = 260;

// const images = [
//   {
//     source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
//   },
//   {
//     source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
//   },
//   {
//     source: require('../images/Reruiting-agent-slice/project-exporter/banner.png'),
//   },
// ];

// export default class App extends React.Component {
//   renderPage(image, index, source) {
//     return (
//       <View key={index}>
//         <Image
//           style={{width: BannerWidth, height: BannerHeight}}
//           source={source}
//         />
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Carousel
//           autoplay
//           autoplayTimeout={5000}
//           loop
//           index={0}
//           pageSize={BannerWidth}>
//           {images.map((image, index) => this.renderPage(image, index))}
//         </Carousel>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
// });
