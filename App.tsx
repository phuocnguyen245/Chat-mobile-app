import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {StreamChat} from 'stream-chat';
import {
  Channel,
  ChannelList,
  ChannelPreviewMessenger,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Thread,
  useMessageContext,
} from 'stream-chat-react-native'; // Or stream-chat-expo
import {AppProvider, useAppContext} from './containers/AppContext';
import {chatApiKey, chatUserId} from './containers/chatConfig';
import {useChatClient} from './containers/hooks/useChatClient';
import Login from './containers/Login';
import {store} from './containers/redux/store';
import Search from './containers/Search';
const Stack = createStackNavigator();

const chatClient = StreamChat.getInstance(chatApiKey);
const filters = {
  members: {
    $in: [chatUserId],
  },
};
const sort: any = {
  last_message_at: -1,
};

const ChannelListScreen = (props: any) => {
  const {setChannel}: any = useAppContext();
  return (
    <View style={{flex: 1}}>
      <Search />
      <ChannelList
        Preview={CustomListItem}
        filters={filters}
        sort={sort}
        onSelect={channel => {
          const {navigation} = props;
          setChannel(channel);
          navigation.navigate('ChannelScreen');
        }}
      />
    </View>
  );
};

const ChannelScreen = (props: any) => {
  const {navigation}: any = props;
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
    <Channel
      channel={channel}
      thread={thread}
      threadList
      MessageSimple={CustomMessage}>
      <Thread {...props} />
    </Channel>
  );
};

const CustomListItem = (props: any) => {
  const {unread} = props;
  const backgroundColor = unread ? '	#00FFFF !important' : '	#00FFFF !important';
  return (
    <View style={{backgroundColor}}>
      <ChannelPreviewMessenger {...props} />
    </View>
  );
};

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
      <Text style={{color: '#00FFFF', backgroundColor: '#00FFFF'}}>
        {message.text}
      </Text>
    </View>
  );
};

const NavigationStack = () => {
  const {clientIsReady} = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient} enableOfflineSupport>
        <Stack.Navigator>
          <Stack.Screen name="ChannelList" component={ChannelListScreen} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

const AppNavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="AppNavigationStack"
                  component={AppNavigationStack}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="NavigationStack"
                  component={NavigationStack}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </AppProvider>
    </Provider>
  );
};

export default App;
