import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  changeOrderDone,
  deleteTransaction,
  getAllOrder,
  getDoneOrder,
  getHistory,
  transactionsAdmin,
} from '../../utils/https/transaction';
import globalStyle from '../../styles/global';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import ButtonSecondary from '../../components/ButtonSecondary';
// import ButtonPrimary from '../../components/ButtonPrimary';
// import ModalMsg from '../../components/ModalMsg';
// import LoaderScreen from '../../components/LoaderScreen';

const Card = ({data, reff}) => {
  // console.log('data: ', data);s
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDone = async () => {
    const body = {
      transactions_id: data.transactions_id,
      product_id: data.product_id,
      size_id: data.size_id,
      user_id: data.user_id,
    };
    setLoading(true);
    try {
      const result = await changeOrderDone(body, token, controller);
      console.log(result);
      reff();
      setLoading(false);
      ToastAndroid.showWithGravityAndOffset(
        `Done`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
    } catch (error) {
      console.log(error);
      reff();
      setLoading(false);
    }
  };

  const lengthText = text => {
    if (text.length > 15) {
      return text.substring(0, 12) + '...';
    } else {
      return text;
    }
  };
  console.log(data.status);
  return (
    <View style={styles.cardContainer}>
      {/* {data} */}
      {data.transactions_id === data.transactions_id && (
        <>
          {data.image ? (
            <Image source={{uri: data.image}} style={styles.imageProd} />
          ) : (
            <Image
              source={require('../../assets/Products/default-product.png')}
              style={styles.imageProd}
            />
          )}
          <View style={{marginLeft: 130}}>
            <Text style={styles.titleProd}>
              Transaction id: {data.transactions_id}
            </Text>
            <Text style={styles.titleProd}>
              {lengthText(data.product_name)}
            </Text>
            <Text style={styles.textPrice}>{data.price}</Text>
            <Text style={styles.textInfo}>
              {data.payment_method === 'Door Delivery'
                ? 'Door Deliv'
                : data.method}{' '}
              at {data.created_at}
            </Text>
            <Text style={{fontWeight: '900', fontSize: 20}}>{data.status}</Text>
          </View>
          {isLoading ? (
            <TouchableOpacity style={styles.btnDel}>
              <ActivityIndicator size="large" color="#FFBA33" />
            </TouchableOpacity>
          ) : (
            data.status === 'paid' && (
              <TouchableOpacity onPress={handleDone} style={styles.btnDel}>
                <IonIcon
                  name="checkmark-done-outline"
                  size={22}
                  color="white"
                />
              </TouchableOpacity>
            )
          )}
        </>
      )}
    </View>
  );
};

const ManageOrder = () => {
  const {token} = useSelector(state => state.auth.data);
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetching = async () => {
    try {
      const result = await transactionsAdmin(token, controller);
      setData(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      fetching();
    });
    fetching();
    return unsubFocus;
  }, [refresh]);

  const groupTransactionsById = transactions => {
    const groupedData = {};
    transactions.forEach(item => {
      if (groupedData[item.transactions_id]) {
        groupedData[item.transactions_id].push(item);
      } else {
        groupedData[item.transactions_id] = [item];
      }
    });
    return groupedData;
  };

  const groupedData = groupTransactionsById(data);
  // console.log(groupedData);
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#6A4029" />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: '5%',
            paddingVertical: 20,
          }}>
          <View
            style={{
              marginBottom: 40,
              width: '100%',
              minHeight: 200,
              position: 'relative',
            }}>
            <Text style={[globalStyle.textBold, {fontSize: 24}]}>Just now</Text>
            {Object.values(groupedData).map((items, index) => (
              <View key={index} style={{minWidth: '100%'}}>
                {items
                  .filter(
                    item => item.status === 'pending' || item.status === 'paid',
                  )
                  .map((item, idx) => (
                    <Card
                      key={idx}
                      data={item}
                      reff={() => setRefresh(!refresh)}
                    />
                  ))}
              </View>
            ))}
            {Object.values(groupedData).every(items => items.length === 0) && (
              <View
                style={{
                  width: 900,
                  height: 200,
                  backgroundColor: '#FFF',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 25,
                    fontWeight: '900',
                  }}>
                  No new transactions recently
                </Text>
              </View>
            )}
          </View>

          <View style={{marginBottom: 40}}>
            <Text style={[globalStyle.textBold, {fontSize: 24}]}>Finished</Text>
            {/* <Text>{groupedData}</Text> */}
            {Object.values(groupedData).map((items, index) => (
              <View key={index}>
                {items
                  .filter(item => item.status === 'finished')
                  .map((item, idx) => (
                    <Card
                      key={idx}
                      data={item}
                      reff={() => setRefresh(!refresh)}
                    />
                  ))}
                {items.length === 0 && (
                  <Text>No Finised transactions recently</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 22,
    marginBottom: 22,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomColor: '#6A4029',
    paddingVertical: 6,
  },
  imageProd: {
    width: 100,
    height: 100,
    borderRadius: 60,
    position: 'absolute',
    // borderWidth: 1,
    // borderColor: '#6A4029',
  },
  textInfo: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textPrice: {
    fontFamily: 'Poppins-Bold',
    // fontSize: 12,
    color: '#6A4029',
  },
  titleProd: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'black',
  },
  btnQty: {
    width: 21,
    height: 21,
    backgroundColor: '#FFBA33',
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDel: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 3,
  },
  modalScreen: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modal: {
    height: 300,
    borderRadius: 32,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
});

export default ManageOrder;
