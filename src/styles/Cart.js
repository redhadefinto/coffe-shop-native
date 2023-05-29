/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F8',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icons: {
    marginRight: 80,
    color: 'black',
    fontSize: 30,
  },
  titleNavbar: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 20,
  },
  card: {
    // marginVertical: 5,
    position: 'relative',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -35,
    left: 20,
  },
  cardPrice: {
    paddingTop: 80,
    color: '#895537',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
  sizes: {
    marginTop: 10,
    color: '#895537',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black',
    paddingTop: 15,
    minWidth: 160,
    maxWidth: 160,
    textAlign: 'center',
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    // alignItems: 'center'
  },
  quantityBtn: {
    backgroundColor: '#E7AA3685',
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontFamily: 'Poppins-Black',
    color: 'black',
    fontSize: 18,
  },
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textTotal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#ADADAF',
    fontWeight: '900',
  },
  textPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'black',
  },
  notOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 130,
    gap: 10,
  },
  textNot: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
    color: 'black',
  },
  icon: {
    color: 'black',
  },
});
export default styles;
