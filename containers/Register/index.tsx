import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {usePostRegisterMutation} from '../services/login';

interface UserInfo {
  username: string;
  password: string;
  confirmPassword?: string;
  name: string;
  image: string;
}
const Register = ({navigation}: any) => {
  const [postRegister] = usePostRegisterMutation();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    image: '',
  });

  const handleChange = (value: string, type: string) => {
    switch (type) {
      case 'name':
        return setUserInfo((prev: UserInfo) => ({
          ...prev,
          name: value,
        }));
      case 'username':
        return setUserInfo((prev: UserInfo) => ({
          ...prev,
          username: value,
        }));
      case 'password':
        return setUserInfo((prev: UserInfo) => ({
          ...prev,
          password: value,
        }));
      case 'image':
        return setUserInfo((prev: UserInfo) => ({
          ...prev,
          image: value,
        }));
      case 'confirmPassword':
        return setUserInfo((prev: UserInfo) => ({
          ...prev,
          confirmPassword: value,
        }));
      default:
        break;
    }
  };
  const handleRegister = () => {
    if (userInfo.password === userInfo.confirmPassword) {
      postRegister(userInfo)
        .unwrap()
        .then(() => {
          ToastAndroid.showWithGravityAndOffset('Created an Account', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
          setTimeout(() => {
            navigation.navigate('AppNavigationStack', {screen: 'Login'});
          }, 1000);
        })
        .catch(() => {
          ToastAndroid.showWithGravityAndOffset('Error', ToastAndroid.SHORT, ToastAndroid.TOP, 25, 50);
        });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Confirm Password does not match',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={e => handleChange(e, 'username')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={e => handleChange(e, 'name')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={e => handleChange(e, 'password')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={e => handleChange(e, 'confirmPassword')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Image"
            placeholderTextColor="#003f5c"
            onChangeText={e => handleChange(e, 'image')}
          />
        </View>
        <Pressable style={styles.loginBtn} onPress={() => handleRegister()}>
          <Text style={{color: '#fff'}}>LOGIN</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: 300,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#4c91c1c9',
    color: 'red',
  },
});

export default Register;
