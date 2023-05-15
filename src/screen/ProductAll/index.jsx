import React, {useEffect, useState, useMemo, useCallback} from 'react';

import styles from '../../styles/Favorite';
// import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';
import coffe1 from '../../assets/Products/coffe-1.png';
import coffe2 from '../../assets/Products/coffe-2.png';
import coffe3 from '../../assets/Products/coffe-3.png';
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
} from 'react-native';
import searchIcon from '../../assets/icon/icon-search.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import CardProduct from '../../components/CardProduct';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {getProducts} from '../../utils/https/products';
// import {FlatList} from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';
const ProductAll = () => {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRoute();
  const searchParams = router.params.search || '';
  const categoriesParams = router.params.categories || '';
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(13);
  const [categories, setCategories] = useState(categoriesParams);
  const [search, setSearch] = useState(searchParams);
  const [dataProduct, setDataProduct] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [borderSearch, setBorderSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [noData, setNoData] = useState(false);

  const handlePage = async () => {
    // if (totalPage === page) return;
    // if (
    //   metaData.totalPage === page ||
    //   dataProduct.length === metaData.totalData
    // )
    //   return;
    try {
      setLoading(true);
      // console.log(search);
      let querys = `name=${
        search || ''
      }&page=${page}&categories=${categories}&limit=${limit}`;
      const result = await getProducts(controller, querys);
      // console.log(result.data.data);
      // const merged = [...dataProduct, ...result.data.data];
      // console.log(result.payload);
      setDataProduct(result.data.data);
      setNoData(false);
      // setPage(result.data.meta.next.page);
      // setMetaData(result.data.meta);
      // if (result.data.meta.next.page === null) {
      //   return;
      // }
      setPage(result.data.meta.next.page);
      // setTotalPage(result.data.meta.totalPage);
      // console.log(result.data.meta);
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
    handlePage();
  }, [search, categories]);
  console.log(dataProduct);
  // console.log(metaData);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <ScrollView style={styles.scrolles}>
        <View style={styles.navbar}>
          <IconComunity
            name="chevron-left"
            size={35}
            style={styles.icon}
            onPress={() => {
              navigation.navigate('DrawerNavigator');
            }}
          />
          <Text style={styles.textNavbar}>All Product</Text>
        </View>
        <View style={{flex: 1, paddingBottom: '15%'}}>
          <View>
            {/* Start */}
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
                value={search}
              />
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
            {/* End */}
          </View>
          <View style={styles.containerCard}>
            {loading ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 2,
                }}>
                <ActivityIndicator size="large" color="#6A4029" />
              </View>
            ) : noData ? (
              <View>
                <Text>Data Not Found</Text>
              </View>
            ) : (
              dataProduct.length > 0 &&
              dataProduct.map((data, idx) => {
                return (
                  <View key={data.id}>
                    <CardProduct
                      id={data.id}
                      name={data.product_name}
                      image={data.image}
                      price={data.price}
                    />
                  </View>
                );
              })
            )}
            {/* <FlatList
              style={{width: '100%'}}
              data={dataProduct}
              renderItem={({item}) => (
            keyExtractor={item => item.id.toString()
                numColumns={2}
                onEndReached={handlePage}
                onEndReachedThreshold={2} /> */}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default ProductAll;
