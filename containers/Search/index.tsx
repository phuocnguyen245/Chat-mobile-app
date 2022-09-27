import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAppContext} from '../AppContext';
import {chatApiKey, chatUserId} from '../chatConfig';
import {useChatClient} from '../hooks/useChatClient';
import {StreamChat} from 'stream-chat';

const chatClient = StreamChat.getInstance(chatApiKey);

const Search = ({navigation}: any) => {
  const {setChannel}: any = useAppContext();
  const [text, onChangeText] = useState('');

  const onPressItem = async (item: any) => {
    const id: string = `${chatUserId
      .replace(/\s/g, '-')
      .toLowerCase()}-${'user_test_333'.replace(/\s/g, '-').toLowerCase()}`;
    const newChannel = await chatClient.channel('messaging', id, {
      name: 'USER_TEST_333',
      image: item.image,
    });

    await newChannel.create();
    await newChannel.addMembers([chatUserId]);
    await newChannel.addMembers(['USER_TEST_333']);
    await newChannel.watch();
    await setChannel(newChannel);
    navigation.navigate('NavigationStack', {screen: 'ChannelScreen'});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        onPressIn={() => navigation.navigate('ChannelScreen')}
      />

      <FlatList
        style={styles.list}
        data={useChatClient()?.chatList}
        renderItem={({item}: {item: {name: string; channel: any}}) => (
          <Text onPress={() => onPressItem(item)} style={styles.item}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    position: 'absolute',
    top: 40,
    zIndex: 10000000000000,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
export default Search;
