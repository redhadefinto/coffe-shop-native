import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import searchIcon from '../../assets/icon/icon-search.png';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import coffe1 from '../../assets/Products/coffe-1.png';
import coffe2 from '../../assets/Products/coffe-2.png';
import coffe3 from '../../assets/Products/coffe-3.png';
// import {BottomTabs, DrawerNavigator} from '../../../router';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../../components/CardHome';
// import Footer from '../../components/BottomTabs';

const HomePage = () => {
  const [borderSearch, setBorderSearch] = useState(false);
  const navigation = useNavigation();
  const datas = [
    {
      image: coffe1,
      title: 'Hazelnut Latte',
      price: 'IDR 25.000',
    },
    {
      image: coffe2,
      title: 'Creamy Ice Latte',
      price: 'IDR 27.000',
    },
    {
      image: coffe3,
      title: 'Creamy Ice Latte',
      price: 'IDR 27.000',
    },
  ];
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.mainContainer}>
        {/* <DrawerNavigator /> */}
        <View style={styles.headerMain}>
          <Text style={styles.title}>A good coffee is a good day</Text>
          <View
            style={[
              styles.containerSearch,
              borderSearch ? styles.borderSearch : null,
            ]}>
            <ImageBackground source={searchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.inputSearch}
              placeholder="Search"
              onFocus={() => {
                setBorderSearch(true);
              }}
              onBlur={() => {
                setBorderSearch(false);
              }}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          style={styles.categories}
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
          overScrollMode="always">
          <TouchableOpacity style={styles.categoriesTitle}>
            <Text style={styles.categoriesText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesTitle}>
            <Text style={styles.categoriesText}>Promo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesTitle}>
            <Text style={styles.categoriesText}>Coffee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesTitle}>
            <Text style={styles.categoriesText}>Non Coffee</Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'flex-end', paddingRight: 40}}
            onPress={() => navigation.navigate('Favorite')}>
            <Text style={{color: '#6A4029', fontWeight: '900'}}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containerProductMain} horizontal={true}>
          {datas.map((data, idx) => {
            return (
              <CardHome
                title={data.title}
                image={data.image}
                price={data.price}
                key={idx}
              />
            );
          })}
        </ScrollView>
        {/* <Footer /> */}
      </View>
      {/* <Footer /> */}
      {/* <BottomTabs /> */}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
  },
  mainContainer: {
    marginTop: 20,
  },
  title: {
    color: 'black',
    fontSize: 34,
    fontWeight: '900',
  },
  containerSearch: {
    width: '100%',
    backgroundColor: '#EFEEEE',
    marginTop: 20,
    borderRadius: 50,
    position: 'relative',
    flexDirection: 'row',
  },
  borderSearch: {
    borderWidth: 2,
  },
  inputSearch: {
    width: '100%',
    fontSize: 17,
    paddingHorizontal: 70,
    paddingVertical: 15,
    fontWeight: '900',
    borderRadius: 50,
  },
  searchIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '24%',
    left: '8%',
  },
  categories: {
    // marginTop: ,
    minWidth: '100%',
    flexDirection: 'row',
    height: 70,
    overflow: 'scroll',
    // paddingRight: 40,
  },
  categoriesTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  categoriesText: {
    fontSize: 17,
  },
  headerMain: {
    paddingRight: 40,
  },
  containerProductMain: {
    marginTop: 20,
    minWidth: '100%',
    height: 350,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  containerProduct: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 20,
    height: 300,
    marginTop: 30,
  },
  productTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    width: '80%',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    color: '#6A4029',
    fontSize: 20,
    fontWeight: '900',
    width: '80%',
    textAlign: 'center',
    marginTop: 5,
  },
  productImage: {
    width: 170,
    height: 170,
    // top: '-25%',
    borderRadius: 30,
    // display: 'none',
  },
  containerImage: {
    height: 170,
    width: 170,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // borderWidth: 2,
    position: 'relative',
    top: '-10%',
    overflow: 'hidden',
  },
});
