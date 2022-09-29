import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useMemo, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';

export const useClient = () => {
  const chatClient = StreamChat.getInstance(chatApiKey);
  const [clientIsReady, setClientIsReady] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({
    profile: {
      user: {
        username: '',
        image: '',
        name: '',
        token: '',
      },
    },
    chatApiKey: '',
  });

  useEffect(() => {
    (async () => {
      const info = await AsyncStorage.getItem('USER_INFO');
      if (JSON.parse(info as string)?.user?.username) {
        setUserInfo({
          profile: JSON.parse(info as string),
          chatApiKey: 'qhk6w6rhkxpt',
        });
      } else {
        setUserInfo({
          profile: {
            user: {
              username: '',
              image: '',
              name: '',
              token: '',
            },
          },
          chatApiKey: 'qhk6w6rhkxpt',
        });
      }
    })();
  }, []);

  const user = useMemo(
    () => ({
      id: userInfo?.profile?.user?.username,
      name: userInfo?.profile?.user?.name,
      token: userInfo?.profile?.accessToken,
    }),
    [userInfo],
  );

  useEffect(() => {
    if (!!user.token && !!user.id && !!user.name) {
      const setupClient = async () => {
        try {
          setClientIsReady(true);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`An error occurred while connecting the user: ${error.message}`);
          }
        }
      };
      if (!chatClient.userID) {
        setupClient();
      }
    }
  }, [chatClient, user]);

  if (!clientIsReady) return null;

  return {userInfo, clientIsReady};
};
