import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { Header, HeaderDark, MainView } from '../Custom/CustomView';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';

const Faq = ({ navigation }) => {
  const [answerData, setAnswerData] = useState('')
  const [checkAnswer, setCheckAnswer] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getFaqApi();
  }, [])

  const getFaqApi = async () => {
    const response = await Api.faq();
    const { status, msg, data } = response;
    if (status) {
      setData(data)
      Toast.show(msg)
    } else {
      Toast.show(msg)
    }
  }

  const onClickCheckAnswer = (index) => {
    if (checkAnswer === index) {
      setCheckAnswer(null)
    } else {
      setCheckAnswer(index);
    }
  }

  const questionList = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => { onClickCheckAnswer(index) }} style={styles.questionViewOffCss}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.questionTextOffCss}>{item.question}</Text>
          <Image style={index == checkAnswer ? styles.arrayImgOffCssRotate : styles.arrayImgOffCss} source={require('../images/right-icon.png')} />
        </View>
        {index == checkAnswer ?
          <View style={{ width: "92%", marginTop: 10, }}>
            <Text style={styles.answerTextOffCss}>{item.answer}</Text>
          </View>
          : null
        }
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Faq'} />
      <View>
        <FlatList
          data={data}
          renderItem={questionList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View >
  );
};

export default Faq;

const styles = StyleSheet.create({
  questionViewOffCss: {
    paddingVertical: 20, marginHorizontal: 20, borderBottomColor: '#7A7A7A', borderBottomWidth: 0.5,
  },
  questionTextOffCss: {
    color: '#1E1F20', fontSize: 12, fontFamily: 'Muli-SemiBold'
  },
  arrayImgOffCss: {
    width: 15, height: 15, resizeMode: 'contain'
  },
  arrayImgOffCssRotate: {
    width: 15, height: 15, resizeMode: 'contain', transform: [{ rotate: '90deg' }]
  },
  answerTextOffCss: {
    color: '#000', fontSize: 12, fontFamily: 'Muli-SemiBold'
  },
});
