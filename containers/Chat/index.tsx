import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {StreamChat} from 'stream-chat';
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  QuickSqliteClient,
  Thread,
  useMessageContext,
} from 'stream-chat-react-native'; // Or stream-chat-expo
import {useAppContext} from '../AppContext';
import {chatApiKey} from '../chatConfig';
import {useClient} from '../hooks/useClient';
import Search from '../Search';

const Stack = createStackNavigator();
const chatClient = StreamChat.getInstance(chatApiKey);

const ChatPage = () => {
  const [channelName, setChannelName] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    (async () => {
      const name: any = await AsyncStorage.getItem('USER_INFO');
      if (Object.keys(name).length) {
        setUsername(JSON.parse(name)?.user?.username);
      }
    })();
  }, []);

  const logout = async (props: any) => {
    await AsyncStorage.clear();
    QuickSqliteClient.resetDB();
    chatClient.disconnectUser();
    props.navigation.navigate('AppNavigationStack', {screen: 'Login'});
  };

  const filters: {} = useMemo(
    () =>
      username && {
        members: {
          $in: [username],
        },
      },
    [username],
  );

  const sort: any = {
    last_message_at: -1,
  };

  const ChannelListScreen = (props: any) => {
    const {setChannel}: any = useAppContext();
    return (
      <View style={{flex: 1}}>
        <Search props={props} />
        <ChannelList
          filters={filters}
          sort={sort}
          onSelect={async (channel: any) => {
            await AsyncStorage.setItem('CHAT_USER', channel?.data?.name);
            const {navigation} = props;
            setChannel(channel);
            setChannelName(channel?.data?.name);
            navigation.navigate('ChannelScreen');
          }}
        />
        <Button onPress={() => logout(props)} title={'logout'} />
      </View>
    );
  };

  const ChannelScreen = (props: any) => {
    const {navigation, route}: any = props;
    setChannelName(route?.params?.name);
    const {channel, setThread}: any = useAppContext();
    return (
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={message => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate('ThreadScreen');
            }
          }}
        />
        <MessageInput />
      </Channel>
    );
  };

  const ThreadScreen = (props: any) => {
    const {channel, thread}: any = useAppContext();
    return (
      <Channel channel={channel} thread={thread} threadList MessageSimple={CustomMessage}>
        <Thread {...props} />
      </Channel>
    );
  };

  //   const CustomListItem = (props: any) => {
  //     const {unread} = props;
  //     const backgroundColor = unread ? '	#00FFFF !important' : '	#00FFFF !important';
  //     return (
  //       <View style={{backgroundColor}}>
  //         <ChannelPreviewMessenger {...props} />
  //       </View>
  //     );
  //   };

  const CustomMessage = () => {
    const {message, isMyMessage} = useMessageContext();
    const messageStyle: any = {
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: isMyMessage ? '#00FFFF !important' : 'red !important',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      width: '70%',
    };
    return (
      <View style={messageStyle}>
        <Text style={{color: '#00FFFF', backgroundColor: '#00FFFF'}}>{message.text}</Text>
      </View>
    );
  };
  const isReady = useClient()?.clientIsReady;
  if (!isReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChannelList"
            component={ChannelListScreen}
            options={{
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={{title: channelName}} />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatPage;
