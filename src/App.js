import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/App.css';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import store from './BackEnd/store'
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './BackEnd/Login/Login'
import GiftHome from './GIft/GiftHome'
import EditContent from './GIft/Content/EditContent';

function App() {
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>

        <div className='body App-header'>
          <Router>
            <Route path='/EditContent/secretkey4292342329094' exact><EditContent></EditContent> </Route>
            <GiftHome />

          </Router>
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
