import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';
import {usePostLoginMutation} from '../services/login';
import {isLogin} from './loginSlice';

const chatClient = StreamChat.getInstance(chatApiKey);
const Login = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [onLogin] = usePostLoginMutation();
  const dispatch = useDispatch();
  const handelLogin = () => {
    onLogin({username, password})
      .unwrap()
      .then(async (res: any) => {
        const {accessToken, ...rest} = res;
        await chatClient.connectUser({id: rest.user.username, name: rest.user.name}, accessToken);
        await AsyncStorage.setItem('USER_TOKEN', accessToken);
        await AsyncStorage.setItem('USER_INFO', JSON.stringify(res));
        dispatch(isLogin(true));
        ToastAndroid.showWithGravityAndOffset('Login Success', ToastAndroid.SHORT, ToastAndroid.TOP, 25, 50);
        setTimeout(() => {
          navigation.navigate('NavigationStack', {screen: 'ChannelList'});
        }, 1000);
      })
      .catch((error: any) => {
        ToastAndroid.showWithGravityAndOffset(error?.data?.message, ToastAndroid.SHORT, ToastAndroid.TOP, 25, 50);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={e => setUsername(e)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={p => setPassword(p)}
        />
      </View>
      <Pressable style={{width: '70%'}} onPress={() => navigation.navigate('AppNavigationStack', {screen: 'Register'})}>
        <Text style={{textAlign: 'right'}}>Register now</Text>
      </Pressable>

      <Pressable style={styles.loginBtn} onPress={() => handelLogin()}>
        <Text style={{color: '#fff'}}>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'flex-start',
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
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#4c91c1c9',
    color: 'red',
  },
});
