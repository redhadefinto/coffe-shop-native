/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    minHeight: '100%',
    // paddingBottom: 200,
  },
  navbar: {
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around'
  },
  icons: {
    marginRight: 75,
    color: '#6A4029',
    fontSize: 30,
  },
  titleNavbar: {
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
    fontSize: 20,
  },
  userinfo: {
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 250,
  },
  username: {
    paddingTop: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#6A4029',
    fontWeight: '900',
    marginBottom: 15,
  },
  descritption: {
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6A4029',
  },
  conPencl: {
    backgroundColor: '#6A4029',
    width: 35,
    height: 35,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 125,
    top: 90,
  },
  pencil: {
    color: 'white',
  },
  history: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6A4029',
  },
  seemore: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#6A4029',
    fontWeight: '900',
  },
  slider: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageHistory: {
    width: 59,
    height: 64,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageHistory2: {
    marginRight: 10,
  },
  containerNavigation: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    // alignItems: 'center'
  },
  buttonSave: {
    width: '100%',
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  textButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6A4029',
    fontWeight: '900',
  },
  textButtonSave: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
  },
  arrowButton: {
    fontSize: 30,
    color: '#6A4029',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    width: 100,
    marginHorizontal: 15,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleBlack: {
    color: '#6A4029',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-SemiBold',
    // width: 200,
    color: 'black',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default styles;
