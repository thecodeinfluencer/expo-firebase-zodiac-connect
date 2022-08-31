import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import {
  sliceActionLoadList,
  sliceActionLoadMessageList
} from '../../redux/slices/dataSlice';

export default function ChatTab() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const user = state.auth.user;

  const messageList = state.data.list?.zodiac_message_list;

  useEffect(() => {
    dispatch(sliceActionLoadMessageList());
    dispatch(sliceActionLoadList('zodiac_messages'));
  }, []);

  return (
    <Screen title={'Chats'} tab>
      <ScrollView>
        {messageList?.map(({ name, picture, uid }) => (
          <List.Item
            onPress={() =>
              navigation.navigate('ChatScreen', {
                uid,
              })
            }
            key={uid}
            title={name}
            left={props => (
              <Avatar.Image
                {...props}
                size={48}
                source={{
                  uri: picture,
                }}
              />
            )}
            right={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons
                  size={30}
                  {...props}
                  name='chevron-right'
                />
              </View>
            )}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
