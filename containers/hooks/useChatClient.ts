import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId, chatUserName} from '../chatConfig';

const user = {
  id: chatUserId,
  name: chatUserName,
};

const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort: any = {
  last_message_at: -1,
};

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(true);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    (async () => {
      const filterChannel = await chatClient.queryChannels(filters, sort);
      const list: any = filterChannel.map((c: any) => {
        return {name: c.data.name, id: c.cid, image: c.data.image, channel: c};
      });
      setChatList(list);
    })();
  }, []);

  useEffect(() => {
    const setupClient = async () => {
      try {
        chatClient.connectUser(user, chatClient.devToken(user.id));
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
    chatList,
  };
};
