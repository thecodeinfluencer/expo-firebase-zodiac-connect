import { createSlice } from '@reduxjs/toolkit';
import {
  collection,
  database,
  doc,
  firestore,
  onSnapshot,
  onValue,
  ref,
  set,
  analytics,
  // logEvent,
} from '../../config/firebase';
// import { sliceActionLoadList } from '../actions/dataActions';

const initialState = {
  value: 0,
  list: {},
  error: {},
  busy: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    load: (state, { payload }) => {
      state.list[payload?.list] = payload.data;
      state.error = {};
    },
    add: (state, { payload }) => {
      // state.list[payload?.list] = [
      //   ...state.list[payload?.list],
      //   payload.data
      // ];

      state.error = {};
    },
    setDataBusy: (state, { payload }) => {
      state.busy[payload?.list] = payload.state;
    },
    setDataError: (state, { payload }) => {
      state.error[payload?.list] = payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { load, setDataBusy, setDataError, add } = dataSlice.actions;

export const sliceActionLoadList = list => dispatch => {
  dispatch(setDataBusy({ list, state: true }));

  onValue(ref(database, `${list}`), snap => {
    if (snap.exists()) {
      dispatch(load({ list, data: Object.values(snap.val()) }));
      dispatch(setDataBusy({ list, state: false }));
    } else {
      dispatch(setDataError({ list, message: 'No data found' }));
      dispatch(setDataBusy({ list, state: false }));
    }
  });

  dispatch(setDataBusy({ list, state: false }));
};

export const sliceActionLoadCollectionList = list => dispatch => {
  dispatch(setDataBusy({ list, state: true }));

  onSnapshot(collection(firestore, list), collection => {
    if (collection.empty) {
      dispatch(setDataError({ list, message: 'No data found' }));
      dispatch(setDataBusy({ list, state: false }));
    } else {
      dispatch(load({ list, data: collection.docs.map(doc => doc.data()) }));
      dispatch(setDataBusy({ list, state: false }));
    }
  });

  onValue(ref(database, `${list}`), snap => {
    if (snap.exists()) {
      dispatch(load({ list, data: Object.values(snap.val()) }));
      dispatch(setDataBusy({ list, state: false }));
    } else {
      dispatch(setDataError({ list, message: 'No data found' }));
      dispatch(setDataBusy({ list, state: false }));
    }
  });

  dispatch(setDataBusy({ list, state: false }));
};

export const sliceActionSetList = (list, data) => {
  return dispatch => {
    dispatch(setDataBusy({ list, state: true }));
    const id = Date.now();

    const dbRef = ref(database, `${list}/${id}`);
    set(dbRef, {
      ...data,
      id,
    })
      .then(() => {
        const snapObject = {
          type: list,
          state: {
            ...data,
            id,
          },
        };
        dispatch(add({ list, data: snapObject }));
        dispatch(setDataBusy({ list, state: false }));
      })
      .catch(error => {
        console?.log('ERR: ', { ...error, error });
        dispatch(setDataError({ list, message: error?.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionUpdateListItem = (list, data, listItemId) => {
  return (dispatch, getState) => {
    dispatch(setDataBusy({ list, state: true }));

    set(ref(database, `${list}/${listItemId}`), {
      ...getState().data.list[list]?.filter(({ id }) => id == listItemId)[0],
      ...data,
    })
      .then(() => {
        dispatch(setDataBusy({ list, state: false }));
      })
      .catch(error => {
        dispatch(setDataError({ list, message: error?.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionLoadMessageList = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.user?.uid;
    const list = 'zodiac_message_list';
    dispatch(setDataBusy({ list, state: true }));

    onValue(ref(database, `${list}/${uid}`), data => {
      let chatlist = [];
      let length = data.size;
      let userChatKeys = data.val() ? Object.keys(data.toJSON()) : [];

      if (!data.val()) {
        let chatlist = [];
        dispatch(load({ list, data: chatlist }));
        dispatch(setDataBusy({ list, state: false }));
      }

      userChatKeys.map(userChatKey =>
        onValue(ref(database, `zodiac_users/${userChatKey}`), snap => {
          chatlist.push(snap.val());

          if (chatlist.length === length) {
            dispatch(load({ list, data: chatlist }));
            dispatch(setDataBusy({ list, state: false }));
          }
        })
      );
    });
  };
};

export default dataSlice.reducer;
