import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import AppText from '../../fragments/AppText';
import { sliceActionSetList } from '../../redux/slices/dataSlice';

export default function ChatScreen({ route }) {
  const [sendText, setSendText] = React.useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const user = state.auth.user;
  const chatList = state.data.list?.zodiac_message_list;
  const bubbles = state.data.list?.zodiac_messages;

  const activeChat = chatList?.find(list => list?.uid === route.params.uid);
  const activeBubbles = bubbles?.filter(
    bubble =>
      (bubble?.sender === route.params.uid && bubble?.reciever === user?.uid) ||
      (bubble?.sender === user?.uid && bubble?.reciever === route.params?.uid)
  );

  return (
    <>
      <Screen disableHorizontalPadding title={activeChat?.name}>
        <View style={styles.cover} />
        <ScrollView contentContainerStyle={styles.root}>
          {activeBubbles?.map(({ sender, message, time }, i = 0) => {
            const left = sender === user?.uid;

            return (
              <View
                key={i}
                style={[styles.bubble, left ? styles.left : styles.right]}
              >
                {!left && (
                  <Avatar.Image
                    size={48}
                    source={{
                      uri:
                        activeChat?.picture ||
                        'https://ui-avatars.com/api/?background=random&name=User+Ser',
                    }}
                  />
                )}
                <View style={styles.messageContainer}>
                  <View
                    style={[
                      styles.message,
                      left ? styles.messageLeft : styles.messageRight,
                    ]}
                  >
                    <AppText>{message}</AppText>
                  </View>
                  <AppText style={styles.time}>
                    {moment(time).fromNow()}
                  </AppText>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Screen>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          name='message'
          placeholder='Type a message'
          value={sendText}
          onChangeText={setSendText}
        />
        <IconButton
          icon='send'
          color='#ef895f'
          size={30}
          onPress={() => {
            dispatch(
              sliceActionSetList('zodiac_messages', {
                isseen: false,
                message: sendText,
                reciever: route.params.uid,
                sender: user?.uid,
                time: Date.now(),
              })
            );
            dispatch(
              sliceActionSetList(
                `zodiac_message_list/${user?.uid}/${route.params.uid}`,
                {
                  id: route.params.uid,
                }
              )
            );
            dispatch(
              sliceActionSetList(
                `zodiac_message_list/${route.params.uid}/${user?.uid}`,
                {
                  id: user?.uid,
                }
              )
            );
            setSendText('');
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cover: {
    flex: 1,
  },
  root: {
    paddingHorizontal: 16,
    paddingBottom: 56 + 56 + 16,
    paddingTop: 16,
  },
  bubble: {
    width: '100%',
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-end',
  },
  right: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
    alignSelf: 'baseline',
  },
  message: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  messageLeft: {
    backgroundColor: '#ef895f',
    color: '#fff',
    border: 'none',
  },
  messageRight: {
    backgroundColor: '#fff',
    color: '#ef895f',
    border: '1px solid ',
  },
  time: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    paddingLeft: 16,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
