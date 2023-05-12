import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useMemo, useState} from 'react';
// import ButtonSecondary from '../../components/ButtonSecondary';
import globalStyle from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import PaymentProdList from '../../components/PaymentProdList';
import {createTransactions} from '../../utils/https/transaction';
// import BtnLoadingSec from '../../components/BtnLoadingSec';
// import ToastFetching from '../../components/ToastFetching';
import {useNavigation} from '@react-navigation/native';
// import {cartAction} from '../../redux/slices/cart';
// import ButtonPrimary from '../../components/ButtonPrimary';
import {cartActions} from '../../redux/slices/cart';

const Payment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.params);
  const reduxStore = useSelector(state => state);
  const cartRedux = reduxStore.cart;
  // console.log('CART REDUX', cartRedux);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [isToast, setToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const {token} = useSelector(state => state.auth.data);
  const [payment, setPayment] = useState(1);
  const handleSubmit = async () => {
    const dataShopping = cartRedux.shoppingCart.map(item => {
      const {id, image, name, price, sizes, qty, ...newItem} = item;
      return {
        ...newItem,
        product_id: id,
        size_id: sizes,
        subtotal: price * qty,
        quantity: qty,
      };
    });
    // return console.log(dataShopping);
    const datas = {
      promo_id: 1,
      payment_id: payment,
      delivery_id: cartRedux.delivery,
      notes: '',
      status_id: 1,
      products: dataShopping,
    };
    // console.log('BODY FETCHING', body);
    setLoading(true);
    try {
      const result = await createTransactions({datas, token, controller});
      console.log('ADD TRANSACTION', result);
      if (result.status === 200) {
        setLoading(false);
        // setToastInfo({msg: 'Transaction Success', display: 'success'});
        // setToast(true);
        dispatch(cartActions.resetCart());
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // console.log(cartRedux.shoppingCart);
  console.log(reduxStore.user);
  const taxFee = cartRedux.delivery == 1 ? 10000 : 0;
  const grandTotal = route.params.subtotal + taxFee;
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text
          style={[
            globalStyle.titleScreen,
            {fontSize: 28, alignSelf: 'flex-start'},
          ]}>
          Payment Methods
        </Text>
        <View style={globalStyle.lineStyle}></View>
        <ScrollView horizontal={true}>
          <View style={{paddingVertical: 12}}>
            <Image
              source={require('../../assets/images/pay-card.png')}
              style={styles.cardPay}
            />
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', gap: 16, justifyContent: 'center'}}>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable></Pressable>
        </View>
        <View style={globalStyle.lineStyle}></View>
        <View style={{width: '100%', paddingVertical: 20, gap: 16}}>
          {cartRedux.shoppingCart.map(item => (
            <PaymentProdList key={item.id} data={item} />
          ))}
        </View>
        <View style={[globalStyle.lineStyle, styles.mb4]}></View>
        <View style={globalStyle.contentBetween}>
          <Text style={globalStyle.textReg}>Subtotal</Text>
          <Text style={globalStyle.textReg}>
            IDR {route.params.subtotal.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={[globalStyle.contentBetween, styles.mb4]}>
          <Text style={globalStyle.textReg}>Tax</Text>
          <Text style={globalStyle.textReg}>
            IDR {taxFee.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={globalStyle.contentBetween}>
          <Text style={[globalStyle.textBold, {fontSize: 20}]}>Total</Text>
          <Text style={[globalStyle.textBold, styles.mb4, {fontSize: 20}]}>
            IDR {grandTotal.toLocaleString('id-ID')}
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6A4029" />
        ) : isSuccess ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('DrawerNavigator')}
            activeOpacity={0.8}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                // paddingLeft: 30,
                paddingHorizontal: 50,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  // paddingLeft: 55,
                  color: '#F6F6F9',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  fontWeight: '800',
                }}>
                Go Home
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                // paddingLeft: 30,
                paddingHorizontal: 50,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  // paddingLeft: 55,
                  color: '#F6F6F9',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  fontWeight: '800',
                }}>
                CHECKOUT
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 16,
  },
  cardPay: {
    width: 300,
    height: 184,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  mb4: {
    marginBottom: 16,
  },
});

export default Payment;
