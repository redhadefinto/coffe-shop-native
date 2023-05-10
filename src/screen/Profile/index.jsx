import React, {useEffect, useState} from 'react';

import styles from '../../styles/Profile';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import User from '../images/User.png';
import {Divider} from '@rneui/themed';
// import Sample from '../image/Hazel.png';
// import ButtonCustom from '../components/FancyButton';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import coffe1 from '../../assets/Products/coffe-1.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import historyAction from '../../redux/actions/transaction';
// import transactionActions from '../../redux/actions/transaction';
// import userAction from '../../redux/actions/user';

function Profile() {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  // const auth = useSelector(state => state.auth.userData);
  // const transaction = useSelector(state => state.transaction);
  // const dispatch = useDispatch();
  // const [sort, setSort] = useState('');
  // const [page, setPage] = useState('');
  // const [limit, setLimit] = useState(6);
  // const [history, setHistory] = useState([]);
  // const [meta, setMeta] = useState([]);
  // const URLS = `${process.env.API_BACKEND_URL}/transactions?sort=${sort}&page=${page}&limit=${limit}`;

  // useEffect(() => {
  //   let refresh = true;
  //   const removeFocusEvent = navigation.addListener('focus', e => {
  //     dispatch(userAction.getUserThunk(auth.token));
  //     if (refresh) {
  //       if (transaction.history?.length === 0) {
  //         dispatch(transactionActions.getHistoryThunk(URLS, auth.token));
  //       }
  //     }
  //     refresh = false;
  //   });
  //   const removeBlurEvent = navigation.addListener('blur', e => {
  //     dispatch(transactionActions.deleteHistoryThunk());
  //     refresh = true;
  //   });
  //   return () => {
  //     removeFocusEvent();
  //     removeBlurEvent();
  //   };
  // }, [navigation, transaction.history]);
  console.log(profile.data);
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>My profile</Text>
      </View> */}
      <View style={styles.userinfo}>
        <Image source={coffe1} style={styles.image} />
        <Text style={styles.username}>
          {/* {profile.firstname} {profile.lastname} */}
          Redha Definto
        </Text>
        <Text style={styles.descritption}>
          {/* {profile.email} */}
          Email
        </Text>
        <Text style={styles.descritption}>
          {/* {profile.phone} */}
          0818313123131
        </Text>
        <Text style={styles.descritption}>
          {/* {profile.address} */}
          Padang
        </Text>
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={{flexDirection: 'column', paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          <Text style={styles.history}>Order History</Text>
          <Text
            style={styles.seemore}
            onPress={() => {
              navigation.navigate('History');
            }}>
            See more
          </Text>
        </View>
        {/* {transaction.isLoading && (
          <View style={{paddingTop: 30, paddingBottom: 20}}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        {transaction.err === 'data_not_found' && (
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: 'Poppins-Bold'}}>
              Nothing Transactions Here
            </Text>
          </View>
        )} */}
        {/* <View style={{paddingRight: 0}}>
          <ScrollView
            style={styles.slider}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {transaction.history?.length !== 0 &&
              transaction.history?.map((data, index) => {
                if (index <= 5)
                  return (
                    <View style={styles.imageHistory2} key={index}>
                      <Image
                        source={{uri: data.image}}
                        style={styles.imageHistory}
                      />
                    </View>
                  );
              })}
          </ScrollView> */}
        {/* </View> */}
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Edit Profile</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Edit Password</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>FAQ</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Help</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 15,
          paddingBottom: 100,
        }}>
        {/* <ButtonCustom text={"Save"} textColor={"white"} color={"#6A4029"} /> */}
        <Pressable style={styles.buttonSave}>
          <Text style={styles.textButtonSave}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default Profile;
