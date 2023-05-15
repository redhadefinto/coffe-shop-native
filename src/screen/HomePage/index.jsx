import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Navbar from '../../components/Navbar';
import searchIcon from '../../assets/icon/icon-search.png';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import coffe1 from '../../assets/Products/coffe-1.png';
import coffe2 from '../../assets/Products/coffe-2.png';
import coffe3 from '../../assets/Products/coffe-3.png';
// import {BottomTabs, DrawerNavigator} from '../../../router';
import {useNavigation} from '@react-navigation/native';
import CardHome from '../../components/CardHome';
import {profileAction} from '../../redux/slices/profile';
// import Footer from '../../components/BottomTabs';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../utils/https/products';
import debounce from 'lodash.debounce';
import LoadingBrown from '../../components/LoadingBrown';
import privateRoute from '../../utils/wrapper/private.route';
const HomePage = () => {
  const [borderSearch, setBorderSearch] = useState(false);
  const controllerProfile = useMemo(() => new AbortController(), []);
  const controller = useMemo(() => new AbortController(), []);
  // const profileUser = useSelector(state => state.profile.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const profileUser = useSelector(state => state.profile.data);
  // const {token, id} = useSelector(state => state.auth.data.data);
  const {token} = useSelector(state => state.auth.data);
  // console.log('inisial token');
  // console.log(token);

  const [limit, setLimit] = useState(8);
  const [categories, setCategories] = useState('');
  const [search, setSearch] = useState('');
  const [dataProduct, setDataProduct] = useState([]);
  const [metaData, setMetaData] = useState([]);
  // console.log(authUser);
  // const id = useSelector(state => state.auth.data.data.id);
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
  const fetchProfile = async () => {
    // console.log('start');
    try {
      const result = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token,
        }),
      );
      // console.log(result);
      if (result.error?.message === 'Request failed with status code 403') {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (result.error?.message === 'Request failed with status code 401') {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (result.payload?.data) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('LandingPage'));
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let query = `name=${search}&page=1&categories=${categories}&limit=${limit}`;
    setLoading(true);
    if (!token) {
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('LandingPage'));
      }, 5000);
    }
    fetchProfile();
    getProducts(controller, query)
      .then(({data}) => {
        setDataProduct(data.data);
        setMetaData(data.meta);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [token]);
  useEffect(() => {
    // navigation.navigate('ProductAll', {
    //   search,
    //   categories,
    // });
  }, [categories, search]);
  const debounceHandler = useCallback(
    debounce(text => {
      console.log(text);
      setSearch(text);
    }, 700),
    [],
  );
  const searchHandler = text => {
    // if (!text) return;
    debounceHandler(text);
  };
  console.log(profileUser);
  // console.log(dataProduct);
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <ScrollView style={styles.mainContainer}>
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
              onChangeText={text => searchHandler(text)}
            />
            {profileUser.data[0].role_id === 1 && (
              <TouchableOpacity style={styles.containerIconPencil}>
                <Text style={styles.iconPlus}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView
          horizontal
          style={styles.categories}
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
          overScrollMode="always">
          <TouchableOpacity
            style={styles.categoriesTitle}
            onPress={() => setCategories('')}>
            <Text
              style={[
                styles.categoriesText,
                categories === '' && styles.textActive,
              ]}>
              Favorite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoriesTitle}
            onPress={() => setCategories(1)}>
            <Text
              style={[
                styles.categoriesText,
                categories === 1 && styles.textActive,
              ]}>
              Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoriesTitle}
            onPress={() => setCategories(2)}>
            <Text
              style={[
                styles.categoriesText,
                categories === 2 && styles.textActive,
              ]}>
              Non Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoriesTitle}
            onPress={() => setCategories(3)}>
            <Text
              style={[
                styles.categoriesText,
                categories === 3 && styles.textActive,
              ]}>
              Foods
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'flex-end', paddingRight: 40}}
            onPress={() =>
              navigation.navigate('ProductAll', {
                search,
                categories,
              })
            }>
            <Text style={{color: '#6A4029', fontWeight: '900'}}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containerProductMain} horizontal={true}>
          {!dataProduct || loading ? (
            <View
              style={{
                width: '100%',
                height: '80%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#6A4029" />
            </View>
          ) : (
            dataProduct.map((data, idx) => {
              return (
                <CardHome
                  title={data.product_name}
                  image={data.image}
                  price={data.price}
                  key={idx}
                  id={data.id}
                  role_id={profileUser.data[0].role_id}
                />
              );
            })
          )}
        </ScrollView>
      </ScrollView>
    </ScrollView>
  );
};

export default privateRoute(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    minHeight: '200%',
    paddingBottom: '45%',
  },
  mainContainer: {
    marginTop: 20,
    flex: 1,
    // paddingBottom: '25%',
    // paddingBottom: '45%',
  },
  textActive: {
    color: '#6A4029',
    fontWeight: '900',
    borderBottomWidth: 2,
  },
  title: {
    color: 'black',
    fontSize: 34,
    fontWeight: '900',
  },
  containerSearch: {
    width: '80%',
    backgroundColor: '#fafafa',
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
    height: 400,
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
  containerIconPencil: {
    width: 50,
    height: 50,
    backgroundColor: '#6A4029',
    borderRadius: 10000,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  containerAddProduct: {
    Height: 400,
    borderWidth: 2,
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconPlus: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
  },
});
