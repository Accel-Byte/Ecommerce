import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../state/provider';

const NavBar = () => {
  const [{ profile }, dispatch] = useGlobalState();

  const logoutbutton = () => {
    window.localStorage.clear();
    dispatch({
      type: 'ADD_PROFILE',
      profile: null,
    });
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar_class">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Ecommerce
        </Link>
        <ul className="navbar-nav mr-auto">
          {profile !== null ? (
            <>
              <li class="nav-item">
                <Link onClick={logoutbutton} class="nav-link active btn-dark">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li class="nav-item">
              <Link to="/login" class="nav-link  active btn-dark">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
