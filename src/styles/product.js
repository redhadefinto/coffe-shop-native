/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  title: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
  },
  container: {
    paddingLeft: 20,
  },
  category: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    color: '#6A4029',
    fontSize: 17,
    paddingTop: 5,
  },
  card: {
    marginTop: 50,
    position: 'relative',
    backgroundColor: 'white',
    width: 220,
    height: 270,
    shadowColor: '#3939391A',
    elevation: 1,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  imageCard: {
    width: 168,
    height: 189,
    borderRadius: 20,
  },
  containerImage: {
    position: 'relative',
    left: 25,
    top: -35,
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPromo: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 25,
    top: 20,
    borderRadius: 20,
    width: '40%',
    display: 'flex',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    width: '50%',
    lineHeight: 22.29,
  },
  cardPrice: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
  },
  see: {
    textAlign: 'right',
    paddingRight: 25,
    fontFamily: 'Poppins-Reguler',
    fontSize: 15,
    color: '#6A4029',
  },
  textPromo: {
    fontFamily: 'Poppins-Reguler',
    color: 'black',
    fontWeight: '700',
    fontSize: 30,
  },
  addCircle: {
    position: 'relative',
    bottom: 10,
    left: 33,
    fontSize: 80,
    marginBottom: 30,
    marginHorizontal: 3,
    color: '#6A4029',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  removeCircle: {
    fontSize: 80,
    marginHorizontal: 3,
    marginVertical: 35,
    color: 'red',
    // backgroundColor: 'white',
    borderRadius: 100,
  },
  button: {
    borderRadius: 10,
    width: 200,
    // marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    paddingVertical: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
