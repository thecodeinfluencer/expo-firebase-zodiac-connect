import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import UserCard from '../../components/UserCard';
import { zodiacSigns } from '../../local/data';
import { sliceActionLoadList } from '../../redux/slices/dataSlice';

export default function HomeTab() {
  const [active, setActive] = React.useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const initialUsers = state.data.list?.zodiac_users?.filter(
    u => u?.uid !== user?.uid
  );

  let users;

  if (active > 0) {
    users = initialUsers?.filter(
      user => user?.zodiac === zodiacSigns[active - 1].label
    );
  }

  if (active === 0) {
    users = initialUsers;
  }

  useEffect(() => {
    dispatch(sliceActionLoadList('zodiac_users'));
  }, []);

  const styles = StyleSheet.create({
    scroll: { marginBottom: 8, marginTop: 16 },
    scrollContainer: {
      paddingTop: !user?.interests ? 16 : 0,
    },
    grid: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 160,
    },
    textStyle: {
      color: theme.colors.text,
      fontSize: 18,
      paddingVertical: 2,
      paddingHorizontal: 8,
    },
    textstyleActive: {
      color: theme.colors.accent,
      fontSize: 16,
      paddingVertical: 2,
      paddingHorizontal: 8,
    },
    chip: {
      backgroundColor: theme.colors.background,
      marginRight: 4,
      borderRadius: theme.roundness + 8,
    },
    chipActive: {
      backgroundColor: theme.colors.primary,
      marginRight: 4,
      borderRadius: theme.roundness + 8,
    },
  });

  return (
    <Screen title={'Connect'} tab>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scroll}
        >
          {[{ label: 'All' }, ...zodiacSigns]?.map(({ label }, index) => (
            <Chip
              key={index}
              mode={active === index ? 'flat' : 'outlined'}
              textStyle={
                active === index ? styles.textstyleActive : styles.textStyle
              }
              style={active === index ? styles.chipActive : styles.chip}
              onPress={() => {
                setActive(index);
              }}
            >
              {label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {users?.map(user => (
            <UserCard key={user?.uid} user={user} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
