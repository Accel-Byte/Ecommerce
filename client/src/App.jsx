import React, { useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ProductDetails from './components/ProductDetails';
import Register from './components/Register';
import { domain } from './env';
import { useGlobalState } from './state/provider';

const App = () => {
  const [{ reloadpage }, dispatch] = useGlobalState();
  const tokenget = window.localStorage.getItem('token');
  
  useEffect(() => {
    if (tokenget !== null) {
      const getdata = async () => {
        await Axios({
          method: 'get',
          url: `${domain}/api/profile/`,
          headers: {
            Authorization: `token ${tokenget}`,
          },
        })
          .then((res) => {
            let user = res.data['data'];
            dispatch({
              type: 'ADD_PROFILE',
              profile: user,
            });
          })
          .catch((e) => {
            dispatch({
              type: 'ADD_PROFILE',
              profile: null,
            });
          });
      };
      getdata();
    }
  }, [reloadpage, dispatch, tokenget]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
