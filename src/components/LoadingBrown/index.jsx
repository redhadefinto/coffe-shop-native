import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import icon from '../../assets/icon/coffeein.png';
const LoadingBrown = () => {
  const [loadingText, setLoadingText] = useState('');
  useEffect(() => {
    const text = 'Coffein';
    let currentIndex = 0;

    const interval = setInterval(() => {
      setLoadingText(prevText => {
        currentIndex++;
        if (currentIndex > text.length) {
          currentIndex = 1;
          return text.slice(0, 1);
        } else {
          return text.slice(0, currentIndex);
        }
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={icon} style={{width: 80, height: 80}} />
      <Text style={styles.mainText}>{loadingText}</Text>
    </View>
  );
};

export default LoadingBrown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: '#6A4029',
    fontWeight: 'bold',
    textAlign: 'auto',
    marginTop: '6%',
    justifyContent: 'center',
    fontFamily: 'RubikVinyl-Regular',
    fontSize: 40,
  },
});
