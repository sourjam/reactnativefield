// this will be the runner that handles loading all of the other services
// within the main App

// it will handle data as it comes in from the user or server and process it
// and send it in the appropriate direction

// LOGGERS
//
const _log = (message) => {
  console.log(message);
}

// FIREBASE
// Firebase is currently intended to be used for auth and analytics and data store
import firebase from 'react-native-firebase';

// https://firebase.google.com/docs/auth/web/start
const auth = firebase.auth();

const _firebaseAuthStart = () => {
  // start by watching for user status changing
  auth.onUserChanged(_userChangeHandler);
}

const _userChangeHandler = (user) => {
  _log('user is Anonymous: ' + user.isAnonymous )
  if (!user.isAnonymous) {
    _log('user is real: ' + Object.keys(user) )
  }
}

// CORE SERVICE
//
const startTasks = [
  '_firebaseAuthStart',
  _firebaseAuthStart,
]

export default class CoreService {
  constructor() {
    startTasks.forEach((task) => {
      if (typeof task === 'function') {
        task.apply();
      } else {
        _log('calling:' + task);
      }
    });
  }

  createAccount(email, password) {
    _log('account created with: ', email, password);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  signInAccount(email, password) {
    _log('account signed in with: ', email, password);
    return auth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
  
  errorHandler(errObj) {
    _log('Error: ' +errObj)
  }
}
