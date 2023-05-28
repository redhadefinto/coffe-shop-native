import React, {useEffect, useState, useMemo} from 'react';

import styles from '../../styles/Profile';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import User from '../images/User.png';
import {Divider} from '@rneui/themed';
// import Sample from '../image/Hazel.png';
// import ButtonCustom from '../components/FancyButton';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {StackActions} from '@react-navigation/native';
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import coffe1 from '../../assets/Products/coffe-1.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory} from '../../utils/https/transaction';
import LoadingBrown from '../../components/LoadingBrown';
import {logOut} from '../../utils/https/auth';
import {cartActions} from '../../redux/slices/cart';
import {authAction} from '../../redux/slices/auth';
import manage from '../../assets/icon/manage.png';
// import transactionActions from '../../redux/actions/transaction';
// import userAction from '../../redux/actions/user';
function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const profile = useSelector(state => state.profile.data);
  const [loading, setLoading] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [datasTransaction, setDatasTransaction] = useState([]);
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const fecthProfile = async () => {
    try {
      setLoadingProfile(true);
      const getProfileUpdate = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token,
        }),
      );
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 403'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 401'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
    } catch (error) {
      showMessage({
        message: error.response.data.msg,
        type: 'danger',
      });
    } finally {
      setLoadingProfile(false);
    }
  };
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
  console.log(profile);
  const handleLogout = e => {
    e.preventDefault();
    setLoading(true);
    logOut(token, controller);
    dispatch(cartActions.resetCart());
    dispatch(authAction.filter());
    navigation.replace('LandingPage');
  };
  // console.log(datasTransaction);
  return (
    <ScrollView style={styles.container}>
      <FlashMessage position="top" />
      {profile.data.length === 0 || loadingProfile ? (
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <Text style={styles.textButton}>Edit Profile</Text>
                  <IconComunity
                    name={'chevron-right'}
                    size={20}
                    style={styles.arrowButton}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.containerNavigation}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}>Edit Password</Text>
                  <IconComunity
                    name={'chevron-right'}
                    size={20}
                    style={styles.arrowButton}
                  />
                </TouchableOpacity>
              </View>
              {data.role_id === 1 && (
                <View style={styles.containerNavigation}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ManageOrder')}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text style={styles.textButton}>Manage Order</Text>
                      {/* <Image source={manage} style={{width: 30, height: 30}} /> */}
                    </View>
                    <IconComunity
                      name={'chevron-right'}
                      size={20}
                      style={styles.arrowButton}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.containerNavigation}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}>FAQ</Text>
                  <IconComunity
                    name={'chevron-right'}
                    size={20}
                    style={styles.arrowButton}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.containerNavigation}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}>Help</Text>
                  <IconComunity
                    name={'chevron-right'}
                    size={20}
                    style={styles.arrowButton}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 100,
                }}>
                <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textButtonSave}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>Are you sure to log out?</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={[styles.buttonModal, styles.buttonClose]}>
                <Text style={styles.textStyle}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default Profile;
