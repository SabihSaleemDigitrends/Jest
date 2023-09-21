import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {CustomTextInput} from '../../components';
import {firebase} from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    navigation.navigate('Signup');
  };

  const onLogin = () => {
    if (email.toLowerCase() && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async err => {
          console.log(err.user.email, 'Welcome!');
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
        });
    } else {
      alert('Enter Data Please');
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container1}>
        <View
          style={{
            flexDirection: 'column',
            marginVertical: 15,
            marginHorizontal: 5,
          }}>
          <View>
            <Text style={styles.text}>Email:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter here"
              customStyle={{
                borderColor: '#67bae3',
                color: 'black',
                borderWidth: 2,
                width: '95%',
                height: 40,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}
              value={email}
              onChangeText={email => {
                setEmail(email);
              }}
            />
          </View>

          <View>
            <Text style={styles.text}>Password:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter here"
              customStyle={{
                borderColor: '#67bae3',
                color: 'black',
                borderWidth: 2,
                width: '95%',
                height: 40,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      <View style={styles.container2}>
        <View
          style={{
            marginVertical: 20,
          }}>
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Signin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={signup}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: '#f98b34',
  },
  //container View
  container: {
    alignItems: 'center',
    height: 100,
  },
  textHeader: {
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  //container1 View
  container1: {
    height: 100,
    marginVertical: 10,
  },
  text: {
    marginVertical: 10,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  //container2 View
  container2: {
    height: 260,
    marginVertical: 60,
    width: '95%',
    borderColor: 'black',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#67bae3',
    width: '95%',
    height: 60,
    marginVertical: 10,
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});
export default Login;
