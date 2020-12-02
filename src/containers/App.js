import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from '../store';
import Navbar from './Navbar';
import Main from './Main';
import {setCurrentUser ,setAuthorizationToken} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tamering from the key
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

const App =()=>(
  <Provider store={store}>
    <Router>
       <div className="onBoarding">
          <Navbar/>
          <Main/>
       </div>
    </Router>
  </Provider>
)

export default App;
