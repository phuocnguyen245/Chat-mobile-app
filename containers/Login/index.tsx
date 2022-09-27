import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {usePostLoginMutation} from '../services/login';

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [onLogin] = usePostLoginMutation();
  const handelLogin = () => {
    // ToastAndroid.showWithGravityAndOffset(
    //   'A wild toast appeared!',
    //   ToastAndroid.LONG,
    //   ToastAndroid.BOTTOM,
    //   25,
    //   50,
    // );
    // onLogin({username, password})
    //   .unwrap()
    //   .then(response => console.log(response))
    //   .catch(e => console.log(e));
    navigation.navigate('NavigationStack', {screen: 'ChannelList'});
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
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
