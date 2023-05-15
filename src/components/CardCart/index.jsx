import {View, Text, Image, Pressable, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/Cart';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {cartActions} from '../../redux/slices/cart';

const CardCart = ({image, price, name, id, sizes, qty}) => {
  // const grandTotal = [];
  // grandTotal.push(price);
  const dispatch = useDispatch();
  // setPrice(grandTotal);
  const handleQty = info => {
    if (info === 'inc') {
      dispatch(cartActions.increment(id));
    } else {
      if (qty === 1) {
        return dispatch(cartActions.deleteItem({id, sizes}));
      }
      if (qty === 0) return;
      dispatch(cartActions.decrement(id));
    }
  };
  // cartActions
  const [quantity, setQuantity] = useState(1);
  const costing = price => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const {width} = useWindowDimensions();
  return (
    <View style={styles.card}>
      <View
        style={{
          marginRight: 20,
          backgroundColor: 'white',
          width: width / 3,
          padding: 10,
          borderRadius: 30,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <Image source={{uri: image}} style={styles.cardImage} />
        <Text style={styles.cardPrice}>IDR {costing(price)}</Text>
        <Text style={styles.sizes}>
          {sizes === 1 ? 'Regular' : sizes === 2 ? 'Large' : 'Extra Large'}
        </Text>
      </View>
      <View>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.quantity}>
          <Pressable
            style={styles.quantityBtn}
            onPress={() => handleQty('dec')}>
            <IconComunity name={'window-minimize'} size={15} />
          </Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable
            style={styles.quantityBtn}
            onPress={() => handleQty('inc')}>
            <Icons name={'plus'} size={10} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardCart;
