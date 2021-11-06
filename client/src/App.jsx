import React, {useEffect} from 'react';
import Axios from 'axios';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import Cart from "./components/Cart/Cart";
import {domain} from './env';
import {useGlobalState} from './state/provider';
import OldOrders from "./components/OldOrder/OldOrder";
import Order from "./components/Order/Order";
import OldOrderDetails from "./components/OldOrderDetails/OldOrderDetails";

const App = () => {
    const [{profile, reloadPage}, dispatch] = useGlobalState();
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (token !== null) {
            const getData = async () => {
                Axios({
                    method: 'get',
                    url: `${domain}/api/profile/`,
                    headers: {
                        Authorization: `token ${token}`,
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
                        console.log(e);
                        dispatch({
                            type: 'ADD_PROFILE',
                            profile: null,
                        });
                    });
            };
            getData().then().catch();
        }
    }, [reloadPage, dispatch, token]);

    useEffect(() => {
        if (profile !== null) {
            const getData = async () => {
                Axios({
                    method: "get",
                    url: `${domain}/api/cart/`,
                    headers: {
                        Authorization: `token ${token}`
                    }
                }).then(res => {
                    const complete_cart = []
                    const incomplete_cart = []
                    res?.data.forEach(data => {
                        if (data.complete) {
                            complete_cart.push(data);
                        } else {
                            incomplete_cart.push(data);
                        }
                    })
                    dispatch({
                        type: "ADD_CART_PRODUCT_COMPLETE",
                        cart_product_complete: complete_cart
                    })
                    dispatch({
                        type: "ADD_CART_PRODUCT_INCOMPLETE",
                        cart_product_incomplete: incomplete_cart
                    })
                })
            }
            getData().then().catch();
        }
    }, [reloadPage, dispatch, profile, token])

    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/product/:id" component={ProductDetails}/>
                {
                    profile !== null ? (
                            <>
                                <Route exact path='/cart' component={Cart}/>
                                 <Route exact path='/order' component={Order} />
                                <Route exact path='/oldOrders' component={OldOrders} />
                                <Route exact path='/oldorders/:id' component={OldOrderDetails} />
                            </>
                        ) :
                        (
                            <>
                                <Route exact path='/login' component={Login}/>
                                <Route exact path='/register' component={Register}/>
                            </>
                        )
                }
                <Route exact component={HomePage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
