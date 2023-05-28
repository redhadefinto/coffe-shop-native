import React, {useEffect, useState, useMemo, useCallback} from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import searchIcon from '../../assets/icon/icon-search.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import CardProduct from '../../components/CardProduct';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../utils/https/products';
import {NativeBaseProvider, Box, Menu} from 'native-base';
// import {useTheme} from 'native-base';
// import {FlatList} from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';
const ProductAll = () => {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRoute();
  // const theme = useTheme();
  const searchParams = router.params.search || '';
  const categoriesParams = router.params.categories || '';
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [categories, setCategories] = useState(categoriesParams);
  const [search, setSearch] = useState(searchParams || '');
  const [dataProduct, setDataProduct] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [borderSearch, setBorderSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [noData, setNoData] = useState(false);
  const [order, setOrder] = useState('');
  const [textOrder, setTextOrder] = useState('Sort By');
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const profileUser = useSelector(state => state.profile.data);
  const fecthingProduct = async () => {
    try {
      setLoading(true);
      let querys = `name=${
        search || ''
      }&page=${page}&categories=${categories}&limit=${limit}&order=${order}`;
      const result = await getProducts(controller, querys);
      console.log(result.data.meta);
      setDataProduct(result.data.data);
      setNoData(false);
      setTotalPage(result.data.meta.totalPage);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setNoData(true);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };
  const debounceHandler = useCallback(
    debounce(text => {
      console.log(text);
      setSearch(text);
    }, 500),
    [],
  );
  const searchHandler = text => {
    // if (!text) return;
    debounceHandler(text);
  };

  useEffect(() => {
    fecthingProduct();
  }, [search, categories, order]);

  const handlePage = async () => {
    if (totalPage === page) return setEndPage(true);
    try {
      setLoadingScroll(true);
      setEndPage(false);
      let newPage = page + 1;
      let querys = `name=${
        search || ''
      }&page=${newPage}&categories=${categories}&limit=${limit}&order=${order}`;
      const result = await getProducts(controller, querys);
      console.log(result.data.meta);
      const merged = [...dataProduct, ...result.data.data];
      setDataProduct(merged);
      setNoData(false);
      setPage(newPage);
      setTotalPage(result.data.meta.totalPage);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setNoData(true);
        setLoadingScroll(false);
      }
    } finally {
      setLoadingScroll(false);
    }
  };
  console.log('Data Product', dataProduct);
  return (
    <NativeBaseProvider>
      <View style={styles.mainScreen}>
        <View style={{paddingHorizontal: '5%', gap: 10, paddingVertical: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.SearchInput}>
              <Image
                source={require('../../assets/icon/icon-search.png')}
                style={{width: 18, height: 18}}
              />
              <TextInput
                style={{fontWeight: 'bold', width: '100%'}}
                placeholder="Search"
                onChangeText={searchHandler}
                placeholderTextColor={'black'}
                // autoFocus={params ? params.search : false}
                // autoFocus={true}
                value={search}
              />
            </View>

            <Box alignItems="flex-end">
              <Menu
                w="190"
                trigger={triggerProps => {
                  return (
                    <Pressable {...triggerProps} style={styles.btnSort}>
                      <Text style={styles.btnSortText}>{textOrder}</Text>
                    </Pressable>
                  );
                }}>
                <Menu.Item
                  bold
                  onPress={() => {
                    setOrder('');
                    setTextOrder('Sort By');
                    setPage(1);
                  }}>
                  Reset
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    setOrder('cheapest');
                    setPage(1);
                    setTextOrder('Cheapest');
                  }}>
                  Cheapest
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    setOrder('priciest');
                    setPage(1);
                    setTextOrder('priciest');
                  }}>
                  priciest
                </Menu.Item>
              </Menu>
            </Box>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              // gap: 22,
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Pressable onPress={() => setCategories('')}>
              <Text
                style={
                  categories === ''
                    ? styles.categoryActive
                    : styles.categoryText
                }>
                Favorite
              </Text>
            </Pressable>
            <Pressable onPress={() => setCategories(1)}>
              <Text
                style={
                  categories === 1 ? styles.categoryActive : styles.categoryText
                }>
                Coffee
              </Text>
            </Pressable>
            <Pressable onPress={() => setCategories(2)}>
              <Text
                style={
                  categories === 2 ? styles.categoryActive : styles.categoryText
                }>
                Non Coffee
              </Text>
            </Pressable>
            <Pressable onPress={() => setCategories(3)}>
              <Text
                style={
                  categories === 3 ? styles.categoryActive : styles.categoryText
                }>
                Foods
              </Text>
            </Pressable>
          </View>
        </View>

        {loading ? (
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
        ) : noData ? (
          <Text style={styles.notFound}>Data Not Found</Text>
        ) : (
          <>
            <FlatList
              style={{width: '100%'}}
              data={dataProduct}
              renderItem={({item, index}) => (
                <View style={styles.cardContainer} key={index}>
                  <CardProduct
                    id={item.id}
                    name={item.product_name}
                    image={item.image}
                    price={item.price}
                    discount={item.discount}
                    role_id={profileUser.data[0].role_id}
                  />
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              onEndReached={handlePage}
              onEndReachedThreshold={0.1}
            />
            {loadingScroll && (
              <View>
                <ActivityIndicator size="large" color="#6A4029" />
              </View>
            )}
            {endPage && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: '#6A4029', fontSize: 18, fontWeight: '900'}}>
                  End Page
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    paddingVertical: 20,
  },
  titleScreen: {
    fontSize: 34,
    fontFamily: 'Poppins-Bold',
    lineHeight: 40,
    color: 'black',
  },
  SearchInput: {
    width: '76%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CACACA',
    borderRadius: 24,
    paddingHorizontal: 20,
    gap: 12,
  },
  btnSort: {
    borderWidth: 2,
    borderColor: '#CACACA',
    padding: 10,
    borderRadius: 24,
  },
  btnSortText: {color: 'black', fontFamily: 'Poppins-Regular'},
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: '3%',
    // borderWidth: 2,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 2,
  },
  categoryText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  categoryActive: {
    color: '#6A4029',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    borderBottomWidth: 2,
    fontWeight: '900',
    borderBottomColor: '#6A4029',
  },
  notFound: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#6A4029',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 60,
  },
});

export default ProductAll;
