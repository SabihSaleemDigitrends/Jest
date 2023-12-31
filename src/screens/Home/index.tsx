import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import database from '@react-native-firebase/database';

const Home = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [uidFromDatabase, setUidFromDatabase] = useState<number>(0);
  console.log('uidFromDatabase', uidFromDatabase);

  useEffect(() => {
    fetchUidFromDatabase();
  }, []);

  const appId = '50896009e4634da2afbf663860036a49';
  const channelName = 'Video chat';
  const token =
    '007eJxTYNjffVrD0TVrz1bbh0fvsygsVNaTDLD1YE76U8Or0ZemL6XAYGpgYWlmYGCZamJmbJKSaJSYlpRmZmZsARQzNks0sdwkKJzaEMjIwJ1Vy8AIhSA+F0NYZkpqvkJyRmIJAwMA2LMcjw==';

  const fetchUidFromDatabase = () => {
    try {
      database()
        .ref('User')
        .once('value')
        .then((snapshot: {val: () => any}) => {
          const getValue = snapshot.val();
          console.log('getValue', getValue);
          let array = [];
          for (let key in getValue) {
            const value = {...getValue[key], key};
            array.push(value);
          }
          array.filter(el => {
            console.log('el?.uid', el?.uid);
            if (el?.uid !== null) {
              setUidFromDatabase(el?.uid);
            } else {
              console.error('Uid not found in the database');
            }
          });
        })
        .catch((error: any) => {
          console.error('Error fetching uid from database:', error);
        });
    } catch (error) {
      console.error('Error fetching uid from database:', error);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  function showMessage(msg: string) {
    setMessage(msg);
  }

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  });

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uidFromDatabase, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video Calling Quickstart</Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <React.Fragment key={0}>
            <RtcSurfaceView
              canvas={{uid: uidFromDatabase}}
              style={styles.videoView}
            />
            <Text>Local user uid: {uidFromDatabase}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
});

export default Home;
