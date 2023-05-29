import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import iconPensil from '../../assets/icon/pensil.png';
// import Sample from "../assets/images/product.png"

const CardProduct = ({image, name, price, id, discount, role_id}) => {
  const navigation = useNavigation();
  const random = Math.floor(100000 + Math.random() * 900000);
  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          prodId: id,
          discount: discount || null,
        })
      }>
      <View style={styles.containerImage} key={random}>
        <ImageBackground
          source={{uri: image}}
          style={styles.imageCard}
          resizeMode="cover"
        />
      </View>
      {discount && (
        <View style={styles.containerDiscount}>
          <Text style={styles.textDiscount}>{discount}%</Text>
        </View>
      )}
      {role_id === 1 && (
        <TouchableOpacity
          style={styles.containerIconPencil}
          onPress={() => {
            discount
              ? navigation.navigate('EditPromo', {
                  prodId: id,
                })
              : navigation.navigate('EditProduct', {
                  prodId: id,
                });
          }}>
          <ImageBackground
            source={iconPensil}
            style={{width: 15, height: 15}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardPrice2}>{costing(price)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    // position: 'relative',
    backgroundColor: '#FFF',
    width: 160,
    height: 240,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 30,
    marginHorizontal: 15,
    // justifyContent: 'center',
    alignContent: 'center',
  },
  imageCard: {
    width: 120,
    height: 130,
    // borderRadius: 20,
  },
  containerImage: {
    width: 120,
    height: 130,
    // borderWidth: 2,
    position: 'relative',
    left: '13%',
    top: -35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  containerPromo: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 10,
    top: 1,
    borderRadius: 20,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -10,
  },
  cardTitle: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 19,
    color: 'black',
    textAlign: 'center',
    width: '70%',
    lineHeight: 22.29,
  },
  cardPrice: {
    // fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 40,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  cardPrice2: {
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 70,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
  },
  textPromo: {
    fontFamily: 'Poppins-Reguler',
    color: 'black',
    fontWeight: '700',
    fontSize: 30,
  },
  containerIconPencil: {
    width: 30,
    height: 30,
    backgroundColor: '#6A4029',
    position: 'absolute',
    borderRadius: 10000,
    // right: 0,
    left: 0,
    // top: -30,
    bottom: 0,
    right: -20,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDiscount: {
    width: 70,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    right: -20,
    top: -8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textDiscount: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
  },
});

export default CardProduct;
