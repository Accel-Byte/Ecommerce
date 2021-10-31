import React from 'react';
import {Link} from 'react-router-dom';
import {useGlobalState} from '../state/provider';

const NavBar = () => {
    const [{profile, cart_product_incomplete}, dispatch] = useGlobalState()
    let cart_product_length = 0;
    if (cart_product_incomplete !== null) {
        cart_product_length = cart_product_incomplete[0]?.cartProduct.length;
    } else {
        cart_product_length = 0;
    }
    const logoutButton = () => {
        window.localStorage.clear();
        dispatch({
            type: 'ADD_PROFILE',
            profile: null,
        });
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar_className">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Ecommerce
                </Link>
                <ul className="navbar-nav mr-auto">
                    {
                        profile !== null ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/cart" className="btn btn-dark">
                                            <i className="fas fa-cart-plus"/>
                                            <span>({cart_product_length})</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link btn-dark active">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={logoutButton} className="nav-link active btn-dark">Logout</Link>
                                    </li>
                                </>
                            ) :
                            (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link  active btn-dark">Login</Link>
                                </li>
                            )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
