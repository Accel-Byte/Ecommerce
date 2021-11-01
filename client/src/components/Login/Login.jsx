import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { domain, header2 } from '../../env';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginbutton = (e) => {
    e.preventDefault();
    Axios({
      url: `${domain}/api/login/`,
      method: 'post',
      headers: header2,
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data['token']);
        window.location.href = '/';
      })
      .catch((e) => {
        alert('Username OR Password is invalid Try Again !!');
      });
  };

  return (
    <div className="container">
      <div className="row m-5 no-gutters shadow-lg">
        <div className="col-md-6 bg-white p-5" style={{ height: '500px' }}>
          <h3 className="pb-3">Login</h3>
          <div className="form-style">
            <form>
              <div className="form-group pb-3">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group pb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pb-2">
                <button
                  type="submit"
                  className="btn btn-dark w-100 font-weight-bold mt-2"
                  onClick={(e) => loginbutton(e)}
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="pt-4 text-center">
              Haven't Registered Yet?{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register Now
              </Link>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 d-none d-md-block"
          style={{ height: '500px', paddingLeft: 0, paddingRight: 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
            className="img-fluid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
