import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {StreamChat} from 'stream-chat';
import {useAppContext} from '../AppContext';
import {chatApiKey} from '../chatConfig';
import {useClient} from '../hooks/useClient';
import {useGetSearchUserMutation} from '../services/login';

const chatClient = StreamChat.getInstance(chatApiKey);

const Search = (props: any) => {
  const {username} = useClient()?.userInfo?.profile?.user;
  const {setChannel}: any = useAppContext();
  const [text, setText] = useState('');
  const [searchData, setSearchData] = useState<[]>([]);

  const [getSearch] = useGetSearchUserMutation();

  useEffect(() => {
    if (text !== '') {
      getSearch(text)
        .unwrap()
        .then((res: any) => {
          const arr = res?.user?.map((u: any) => ({
            username: u.username,
            name: u.name,
            image: u.image,
          }));
          setSearchData(arr);
        })
        .catch(error => console.log(error));
    } else {
      setSearchData([]);
    }
  }, [text, getSearch]);

  const onPressItem = async (item: any) => {
    const id: string = `${username.replace(/\s/g, '-').toLowerCase()}-${item.username
      .replace(/\s/g, '-')
      .toLowerCase()}`;
    const newChannel = await chatClient.channel('messaging', id, {
      name: item.name,
      image: item.image,
    });

    await newChannel.create();
    await newChannel.addMembers([username]);
    await newChannel.addMembers([item.username]);
    await newChannel.watch();
    await setChannel(newChannel);
    props?.navigation?.navigate('ChannelScreen', {name: item.name});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value: string) => setText(value)}
        value={text}
        onPressIn={() =>
          props?.props?.navigation?.navigate('NavigationStack', {
            screen: 'Search',
          })
        }
      />

      <FlatList
        style={styles.list}
        data={searchData}
        renderItem={({item}: {item: {name: string}}) => (
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
