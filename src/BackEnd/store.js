import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from 'redux'
import {
    firebaseReducer
} from 'react-redux-firebase'

import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyBQEQrNKs4Sq7MTaOyv2YL_L0vp-y4I9mA",
    authDomain: "lovelygiftlove.firebaseapp.com",
    projectId: "lovelygiftlove",
    storageBucket: "lovelygiftlove.appspot.com",
    messagingSenderId: "738820003136",
    appId: "1:738820003136:web:58ed440486dddd6acdd6a5",
    measurementId: "G-XPFJVCNR0G"
}


// Initialize firebase instance
firebase.initializeApp(fbConfig)
// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state reactReduxFirebase(firebase),
const initialState = {}



const store = createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;