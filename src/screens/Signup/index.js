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
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onSignup = () => {
    if (email.toLowerCase() && name && address && contactNo && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((uid) => {
          firebase
            .database()
            .ref('User')
            .push({
              uid: uid?.user?.uid,
              name,
              password,
              email: email?.toLowerCase(),
              address,
              contactNo,
            })
            .then(() => {
              console.log('Data update.');
              alert('Data update.');
            })
            .catch(error => {
              console.log('failed: ' + error.message);
            });
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('Error!', 'That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('Error!', 'That email address is invalid!');
          }

          console.error(error);
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
            <Text style={styles.text}>Name:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter name here"
              customStyle={{
                borderColor: '#67bae3',
                color: 'black',
                borderWidth: 2,
                width: '95%',
                height: 40,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}
              value={name}
              onChangeText={name => {
                setName(name);
              }}
            />
          </View>

          <View>
            <Text style={styles.text}>Email:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter email here"
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
              placeholder="Enter password here"
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

          <View>
            <Text style={styles.text}>Addres:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter address here"
              customStyle={{
                borderColor: '#67bae3',
                color: 'black',
                borderWidth: 2,
                width: '95%',
                height: 40,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}
              value={address}
              onChangeText={address => setAddress(address)}
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={styles.text}>Contact No:</Text>
            <CustomTextInput
              placeholderTextColor="black"
              placeholder="Enter contact no. here"
              customStyle={{
                borderColor: '#67bae3',
                color: 'black',
                borderWidth: 2,
                width: '95%',
                height: 40,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}
              value={contactNo}
              onChangeText={contactNo => {
                setContactNo(contactNo);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.container2}>
        <View
          style={{
            marginVertical: 20,
          }}>
          <TouchableOpacity style={styles.button} onPress={onSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  //container1 View
  container1: {
    marginVertical: 10,
  },
  text: {
    marginVertical: 10,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  //container2 View
  container2: {
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
export default Signup;
