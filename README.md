# expo-firebase-zodiac-connect

Expo react native app to connect with peers of similar zodiac signs. Includes Google maps and Google sign in

## expo package

[expo.dev/@mbenjerminne/zodiac-connect](https://expo.dev/@mbenjerminne/zodiac-connect)

## prerequisites

for the project to work correctly, make sure you do the following:

- Create a root file called `.env`.
- The following are the contents of the `.env` file

```javascript
# // FIREBASE CONFIG
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_DATABASE_URL=your-database-url
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

You can get the details for `FIREBASE_` variables in the `.env` by doing the following:

- Create a free firebase project on [console.firebase.google.com](https://console.firebase.google.com)
- Add a web app to your project
- Enable email login on the authentication section
- Enable realtime database and ensure to **start in test mode**
- For an admin account, register as a resident then in the realtime database, manually change `role` from **resident** to **admin**

You can reach out in caseof any problems

## setup

- After you clone the repo, run `npm install` or `yarn install` depending on your package manager
- Run `yarn start` or `npm start` depending on your package manager or if you have expo-cli `expo start`
- Follow the instructions on the terminal to open your project in either **Android** or **iOS**

## technologies

- React Native
- Expo
- React Navigation
- Redux (with Thunk)
- React Native Paper
- Firebase (Realtime DB | Auth)
- Formik
- Yup
- Moment.JS
