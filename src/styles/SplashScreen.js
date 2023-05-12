/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    // zIndex: 1,
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  containerIcon: {
    // borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  mainText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'auto',
    marginTop: '6%',
    justifyContent: 'center',
    fontFamily: 'RubikVinyl-Regular',
    fontSize: 40,
  },
  secondText: {
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    // fontFamily: 'Kenia-Regular',
    fontSize: 18,
  },
  loading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
});

export default styles;
