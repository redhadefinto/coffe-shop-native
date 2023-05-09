import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import coffe1 from '../../assets/Products/coffe-1.png';
import styles from '../../styles/ProductDetail';
const ProductDetail = () => {
  const [sizes, setSize] = useState('1');
  const {height, width} = useWindowDimensions();
  const CartHandler = () => {
    if (!sizes) {
      return;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.navbar}></View>
        <View style={styles.main}>
          <View style={styles.price}>
            <Text style={styles.strip}>Rp20.000</Text>
          </View>
          <View style={styles.top}>
            <Image source={coffe1} style={styles.product} />
            <Text style={styles.Title}>Coffe</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.firstText}>
              Delivery only on{' '}
              <Text style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
                Monday to friday{' '}
              </Text>{' '}
              at{' '}
              <Text style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
                1 - 7 pm
              </Text>
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio, maiores eum deleniti voluptate autem odit amet
              adipisci praesentium, consequuntur, esse quibusdam soluta commodi
              deserunt? Deserunt earum maxime cumque nesciunt. Officiis.
            </Text>
            <Text style={styles.sizeText}> Choose a size</Text>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Pressable
                style={sizes === '1' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('1');
                }}>
                <Text
                  style={
                    sizes === '1' ? styles.selectedText : styles.buttonText
                  }>
                  R
                </Text>
              </Pressable>
              <Pressable
                style={sizes === '2' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('2');
                }}>
                <Text
                  style={
                    sizes === '2' ? styles.selectedText : styles.buttonText
                  }>
                  L
                </Text>
              </Pressable>
              <Pressable
                style={sizes === '3' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('3');
                }}>
                <Text
                  style={
                    sizes === '3' ? styles.selectedText : styles.buttonText
                  }>
                  XL
                </Text>
              </Pressable>
            </View>
            <View style={{width: width, paddingBottom: 30}}>
              {/* <ButtonCustom text={"Add to cart"} textColor={"white"} color={"#6A4029"}/> */}
              <TouchableOpacity onPress={CartHandler} activeOpacity={0.8}>
                <View
                  style={{
                    backgroundColor: '#6A4029',
                    height: 70,
                    width: width / 1.2,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 17,
                    }}>
                    Add to cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
};

export default ProductDetail;
