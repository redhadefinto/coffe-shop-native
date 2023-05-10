import {ScrollView} from 'react-native-gesture-handler';
// import React, {useState} from 'react';
import coffe1 from '../../assets/Products/coffe-1.png';
import styles from '../../styles/ProductDetail';
// const ProductDetail = () => {
//   const [sizes, setSize] = useState('1');
//   const {height, width} = useWindowDimensions();
//   const CartHandler = () => {
//     if (!sizes) {
//       return;
//     }
//     return (

//     );
//   };
// };

// export default ProductDetail;
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getProductsDetail} from '../../utils/https/products';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {cartActions} from '../../redux/slices/cart';
const ProductDetail = () => {
  const [sizes, setSize] = useState('1');
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [datas, setDatas] = useState();
  const [isLoading, setLoading] = useState();
  const router = useRoute();
  const qty = 1;
  const id = router.params.prodId;
  // console.log(router.params.prodId);
  const CartHandler = () => {
    if (!sizes) {
      return;
    }
    const cart = {
      id: datas[0].id,
      image: datas[0].image,
      name: datas[0].product_name,
      sizes,
      qty,
      price: datas[0].price,
    };
    dispatch(cartActions.addtoCart(cart));
    return ToastAndroid.showWithGravityAndOffset(
      `Add to Cart Succes`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50,
    );
  };
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    getProductsDetail(controller, id)
      .then(({data}) => {
        setDatas(data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  const costing = price => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  // console.log(datas);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name="chevron-left"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.textNavbar}>Detail Product</Text>
      </View>
      <View style={styles.main}>
        {isLoading || !datas ? (
          <View
            style={{
              width: '100%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              // borderWidth: 2,
            }}>
            <ActivityIndicator size="large" color="#6A4029" />
          </View>
        ) : (
          datas.map((data, idx) => {
            return (
              <View key={idx}>
                <View style={styles.price}>
                  <Text style={styles.priceText}>RP{costing(data.price)}</Text>
                </View>
                <View style={styles.top}>
                  <Image source={{uri: data.image}} style={styles.product} />
                  <Text style={styles.Title}>{data.product_name}</Text>
                </View>
                <View style={styles.bottom}>
                  <Text style={styles.firstText}>
                    Delivery only on{' '}
                    <Text
                      style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
                      Monday to friday{' '}
                    </Text>{' '}
                    at{' '}
                    <Text
                      style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
                      1 - 7 pm
                    </Text>
                  </Text>
                  <Text style={styles.description}>
                    Cold brewing is a method of brewing that combines ground
                    coffee and cool water and uses time instead of heat to
                    extract the flavor. It is brewed in small batches and
                    steeped for as long as 48 hours.
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
                          sizes === '1'
                            ? styles.selectedText
                            : styles.buttonText
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
                          sizes === '2'
                            ? styles.selectedText
                            : styles.buttonText
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
                          sizes === '3'
                            ? styles.selectedText
                            : styles.buttonText
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
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

// const styles = StyleSheet.create({});
