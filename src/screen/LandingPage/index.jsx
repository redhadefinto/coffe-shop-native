import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import hero from '../../assets/background/bg-landing-page.png';
import {useNavigation} from '@react-navigation/native';

const LandingPage = () => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={hero} style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <Text style={styles.titleHero}>Coffee for Everyone</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.buttonHero,
                buttonPressed ? styles.buttonPressed : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressed(true)}
              onPress={() => {
                navigation.navigate('Welcome');
              }}
              onPressOut={() => {
                setButtonPressed(false);
              }}>
              <Text style={styles.textButton}>Get started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  topContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
  },
  titleHero: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 65,
  },
  buttonHero: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFBA33',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
  },
  buttonPressed: {
    transform: [{scale: 0.95}],
    backgroundColor: '#FFBA55',
  },
  textButton: {
    textAlign: 'center',
    color: '#6A4029',
    fontWeight: '900',
    fontSize: 18,
  },
});

export default LandingPage;
