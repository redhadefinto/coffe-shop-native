import React, {useEffect, useState} from 'react';

import styles from '../../styles/Favorite';
// import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';
import coffe1 from '../../assets/Products/coffe-1.png';
import coffe2 from '../../assets/Products/coffe-2.png';
import coffe3 from '../../assets/Products/coffe-3.png';
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CardProduct from '../../components/CardProduct';

const Favorite = () => {
  const navigation = useNavigation();
  const datas = [
    {
      image: coffe1,
      title: 'Hazelnut Latte',
      price: 25000,
      id: 1,
    },
    {
      image: coffe2,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 2,
    },
    {
      image: coffe3,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 3,
    },
    {
      image: coffe3,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 3,
    },
    {
      image: coffe3,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 3,
    },
  ];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <ScrollView style={styles.scrolles}>
        <View style={{flex: 1, paddingBottom: '15%'}}>
          <Text style={styles.category}>Everyone's Favorite</Text>
          <Text style={styles.category2}>Food</Text>
          <View style={styles.containerCard}>
            {datas.map((data, idx) => {
              return (
                <View key={idx}>
                  <CardProduct
                    image={data.image}
                    name={data.title}
                    price={data.price}
                    id={data.id}
                    key={data.id}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Favorite;
