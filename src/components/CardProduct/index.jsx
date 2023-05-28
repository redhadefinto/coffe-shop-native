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
import styles from '../../styles/CardProductAll';
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

export default CardProduct;
