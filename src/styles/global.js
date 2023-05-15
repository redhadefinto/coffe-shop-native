/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  titleScreen: {
    fontSize: 34,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  textBold: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontWeight: '900',
  },
  textReg: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  lineStyle: {
    width: '100%',
    borderBottomWidth: 1,
    height: 1,
    borderColor: '#ADADAF',
  },
  contentBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'black',
    fontWeight: '900',
  },
  email: {
    backgroundColor: '#BABABA4A',
  },
});

export default globalStyle;
