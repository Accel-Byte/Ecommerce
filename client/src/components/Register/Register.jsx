import Axios from 'axios';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {domain, header2} from '../../env';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const registerButton = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert('Password not patch try agane !');
        } else {
            await Axios({
                method: 'post',
                url: `${domain}/api/register/`,
                headers: header2,
                data: {
                    username: username,
                    password: password,
                },
            }).then((response) => {
                if (response.data['data']) {
                    history.push('/login');
                }
                alert(response.data['message']);
            });
        }
    };
    return (
        <div className="container">
            <div className="row m-5 no-gutters shadow-lg">
                <div
                    class="col-md-6 d-none d-md-block"
                    style={{height: '500px', paddingLeft: 0, paddingRight: 0}}
                >
                    <img
                        src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                        className="img-fluid"
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        alt="login"
                    />
                </div>
                <div className="col-md-6 bg-white p-5" style={{height: '500px'}}>
                    <h3 className="pb-3">Register</h3>
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
                            <div className="form-group pb-3">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </div>
                            <div className="pb-2">
                                <button
                                    type="submit"
                                    className="btn btn-dark w-100 font-weight-bold mt-2"
                                    onClick={(e) => registerButton(e)}
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="pt-4 text-center">
                                Already Registered?{' '}
                                <Link to="/login" style={{textDecoration: 'none'}}>
                                    Login Now
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
