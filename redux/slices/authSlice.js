import { createSlice } from '@reduxjs/toolkit';
import {
  auth,
  child,
  createUserWithEmailAndPassword,
  database,
  get,
  GoogleAuthProvider,
  googleProvider,
  ref,
  set,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  update as updateDB,
} from '../../config/firebase';

const initialState = { user: {}, error: {}, busy: {}, onboard: false };

export const dataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = {};
    },
    register: (state, action) => {
      state.user = action.payload;
      state.error = {};
    },
    logout: state => {
      state.user = {};
      state.error = {};
    },
    update: (state, action) => {
      state.user = action.payload;
      state.error = {};
    },
    onboard: (state, action) => {
      state.onboard = action.payload;
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
export const {
  setDataBusy,
  setDataError,
  login,
  register,
  update,
  onboard,
  logout,
} = dataSlice.actions;

export const sliceActionLogin = (email, password) => {
  return dispatch => {
    const list = 'login';
    dispatch(setDataBusy({ list, state: true }));

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        get(child(ref(database), `zodiac_users/${user.uid}`))
          .then(snap => {
            if (snap.exists()) {
              const user = snap.val();
              dispatch(login(user));
              dispatch(setDataBusy({ list, state: false }));
            } else {
              dispatch(
                setDataError({ list, message: 'user-deleted/contact-admin' })
              );
              dispatch(setDataBusy({ list, state: false }));
            }
          })
          .catch(error => {
            dispatch(setDataError({ list, message: error.message }));
            dispatch(setDataBusy({ list, state: false }));
          });
      })
      .catch(error => {
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionConnectGoogle = userInfo => {
  return dispatch => {
    const list = 'connect';
    dispatch(setDataBusy({ list, state: true }));

    get(child(ref(database), `zodiac_users/${userInfo?.id}`))
      .then(snap => {
        if (snap.exists()) {
          const user = snap.val();
          dispatch(login(user));
          dispatch(setDataBusy({ list, state: false }));
        } else {
          set(ref(database, 'zodiac_users/' + userInfo?.id), {
            ...userInfo,
            uid: userInfo?.id,
          })
            .then(() => {
              const user = {
                ...userInfo,
                uid: userInfo?.id,
              };

              dispatch(register(user));
              dispatch(setDataBusy({ list, state: false }));
            })
            .catch(error => {
              dispatch(setDataError({ list, message: error.message }));
              dispatch(setDataBusy({ list, state: false }));
            });
        }
      })
      .catch(error => {
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionEmailLogin = ({ email, password }) => {
  console.log('user login <<<>>>>>> ', email, password);

  return dispatch => {
    const list = 'connect';
    dispatch(setDataBusy({ list, state: true }));

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('user login >>> ', Object.keys(user));

        get(child(ref(database), `zodiac_users/${user?.id}`)).then(snap => {
          if (snap.exists()) {
            const user = snap.val();
            dispatch(login(user));
            dispatch(setDataBusy({ list, state: false }));
          } else {
            dispatch(
              setDataError({ list, message: 'user-deleted/contact-admin' })
            );
            dispatch(setDataBusy({ list, state: false }));
          }
        });
      })
      .catch(error => {
        console.log('user login error >>> ', error);
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionEmailRegister = ({ email, password, fname }) => {
  console.log('user signup <<<>>>>>> ', email, password);

  return dispatch => {
    const list = 'connect';
    dispatch(setDataBusy({ list, state: true }));

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        set(ref(database, 'zodiac_users/' + user?.uid), {
          email: user.email,
          uid: user?.uid,
          id: user?.uid,
          name: fname,
        }).then(() => {
          const user = {
            email: user.email,
            uid: user?.uid,
            id: user?.uid,
            name: fname,
          };

          dispatch(register(user));
          dispatch(setDataBusy({ list, state: false }));
        });
      })
      .catch(error => {
        console.log('user signup error >>> ', error);
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionRegister = data => {
  return dispatch => {
    const list = 'register';
    dispatch(setDataBusy({ list, state: true }));

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user: cUser }) => {
        set(ref(database, 'zodiac_users/' + cUser.uid), {
          ...data,
          uid: cUser.uid,
          password: null,
        })
          .then(() => {
            const user = { ...data, uid: cUser.uid, password: null };
            dispatch(register(user));
            dispatch(setDataBusy({ list, state: false }));
          })
          .catch(error => {
            dispatch(setDataError({ list, message: error.message }));
            dispatch(setDataBusy({ list, state: false }));
          });
      })
      .catch(error => {
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export const sliceActionUpdateUser = data => {
  return (dispatch, getState) => {
    const list = 'update';
    dispatch(setDataBusy({ list, state: true }));

    set(ref(database, 'zodiac_users/' + getState().auth.user?.uid), {
      ...getState().auth.user,
      ...data,
    })
      .then(() => {
        const user = { ...getState().auth.user, ...data };
        dispatch(update(user));
        dispatch(setDataBusy({ list, state: false }));
      })
      .catch(error => {
        dispatch(setDataError({ list, message: error.message }));
        dispatch(setDataBusy({ list, state: false }));
      });
  };
};

export default dataSlice.reducer;
