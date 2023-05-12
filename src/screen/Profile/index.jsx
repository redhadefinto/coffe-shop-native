import React, {useEffect, useState, useMemo} from 'react';

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
import {getHistory} from '../../utils/https/transaction';
import LoadingBrown from '../../components/LoadingBrown';
// import historyAction from '../../redux/actions/transaction';
// import transactionActions from '../../redux/actions/transaction';
// import userAction from '../../redux/actions/user';
function Profile() {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  const [loading, setLoading] = useState();
  const [datasTransaction, setDatasTransaction] = useState([]);
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  useEffect(() => {
    setLoading(true);
    getHistory(token, controller)
      .then(({data}) => {
        setDatasTransaction(data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // console.log(profile.data);
  console.log(datasTransaction);
  return (
    <ScrollView style={styles.container}>
      {profile.data.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 2,
          }}>
          <LoadingBrown />
        </View>
      ) : (
        profile.data.map((data, idx) => {
          return (
            <View key={idx}>
              <View style={styles.userinfo}>
                <Image source={{uri: data.image}} style={styles.image} />
                <Text style={styles.username}>
                  {data.first_name} {data.last_name}
                </Text>
                <Text style={styles.descritption}>{data.email}</Text>
                <Text style={styles.descritption}>{data.phone_number}</Text>
                <Text style={styles.descritption}>{data.address}</Text>
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
                {loading ? (
                  <View style={{paddingTop: 30, paddingBottom: 20}}>
                    <ActivityIndicator size="large" color="#6A4029" />
                  </View>
                ) : datasTransaction.length === 0 ? (
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
                ) : (
                  <View style={{paddingRight: 0}}>
                    <ScrollView
                      style={styles.slider}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {datasTransaction?.length !== 0 &&
                        datasTransaction.map((data, index) => {
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
                    </ScrollView>
                  </View>
                )}
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
            </View>
          );
        })
      )}
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
    </ScrollView>
  );
}

export default Profile;
