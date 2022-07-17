
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
import ProductDisplay from './GIft/Content/ProductDisplay';
import GiftBar from './GIft/NavBar/GiftBar';
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
            <Route path='/' exact>
              <GiftHome />
            </Route>
            <Route path='/product' exact>
              <div className="ProductsPage">

                <GiftBar></GiftBar>
                <ProductDisplay />
              </div>
            </Route>
          </Router>
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
