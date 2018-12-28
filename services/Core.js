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

// AUTH
// https://firebase.google.com/docs/auth/web/start
const auth = firebase.auth();

const _userChangeHandler = (user) => {
  if (!user.isAnonymous) {
    _log('user is real: ' + Object.keys(user) );
  } else {
    _log('user is Anonymous: ' + user.isAnonymous );
  }
}

const _firebaseAuthStart = () => {
  // start by watching for user status changing
  // probably not needed tbh
  auth.onUserChanged(_userChangeHandler);
}

// DATABASE
// https://firebase.google.com/docs/database/web/start
const firestore = firebase.firestore();
const userCollectionRef = firestore.collection('users');

const _firebaseInitUserData = (uid) => {
  return new Promise((resolve, reject) => {
    userCollectionRef.doc(uid).set({
      onboard: false
    })
    .then(() => {
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

const _firebaseGetUserData = (uid) => {
  return new Promise((resolve, reject) => {
    _log('getting user data for: ' + uid);
    userCollectionRef.doc(uid).get().then(doc => {
      if (!doc._data) {
        resolve({data: false});
      } else {
        resolve({data: doc._data});
      }
    });
  });
}

// CORE SERVICE
//
const startTasks = [
  '_firebaseAuthStart',
  _firebaseAuthStart,
]

const startTasksMemo = () => {
  let tasksDone = false;
  return () => {
    if (!tasksDone) {
      startTasks.forEach((task) => {
        if (typeof task === 'function') {
          task.apply();
        } else {
          _log('calling:' + task);
        }
      });
      tasksDone = true;
    }
  }
}

const runStartTasks = startTasksMemo();

export default class CoreService {
  constructor() {
    runStartTasks();
  }

  createAccount(email, password) {
    _log('account created with: ', email, password);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  signInAccount(email, password) {
    _log('account signed in with: ', email, password);
    return auth.signInWithEmailAndPassword(email, password);
  }

  signOutAccount() {
    return auth.signOut();
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  getUserData(uid) {
    return _firebaseGetUserData(uid);
  }

  initUserData(uid) {
    return _firebaseInitUserData(uid);
  }

  errorHandler(errObj) {
    _log('Error: ' +errObj)
  }
}
