import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/global';

const PaymentProdList = ({data}) => {
  const sizeName =
    data.sizes === 1 ? 'Regular' : data.sizes === 2 ? 'Large' : 'Extra Large';
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={globalStyle.textBold}>{data.name}</Text>
        <Text style={globalStyle.textReg}>
          {data.qty}&#215; {sizeName}
        </Text>
      </View>
      <Text style={globalStyle.textBold}>
        IDR {data.price.toLocaleString('id-ID')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PaymentProdList;
