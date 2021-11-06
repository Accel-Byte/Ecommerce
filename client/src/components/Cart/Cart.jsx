import Axios from 'axios';
import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import {domain} from '../../env';
import {useGlobalState} from '../../state/provider'

const CartPage = () => {
    const [{cart_product_incomplete}, dispatch] = useGlobalState()
    console.log(cart_product_incomplete)
    let cart_product_length;
    if (cart_product_incomplete !== null) {
        cart_product_length = cart_product_incomplete[0]?.cart_product.length;
    } else {
        cart_product_length = 0;
    }

    const token = window.localStorage.getItem('token')
    const history = useHistory()
    const updateCartProduct = async (id) => {
        await Axios({
            method: 'post',
            url: `${domain}/api/updateCartProduct/`,
            headers: {
                Authorization: `token ${token}`
            },
            data: {"id": id}
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response
            })
        })
    }
    const editCartProduct = async (id) => {
        await Axios({
            method: 'post',
            url: `${domain}/api/editCartProduct/`,
            headers: {
                Authorization: `token ${token}`
            },
            data: {"id": id}
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response
            })
        })
    }
    const deleteCartProduct = async (id) => {
        await Axios({
            method: 'post',
            url: `${domain}/api/deleteCartProduct/`,
            headers: {
                Authorization: `token ${token}`
            },
            data: {"id": id}
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response
            })
        })
    }
    const deleteFullCart = async (id) => {
        await Axios({
            method: 'post',
            url: `${domain}/api/deleteFullCart/`,
            headers: {
                Authorization: `token ${token}`
            },
            data: {"id": id}
        }).then(response => {
            dispatch({
                type: "ADD_RELOAD_PAGE_DATA",
                reloadPage: response
            })
            dispatch({
                type: "ADD_CART_PRODUCT_INCOMPLETE",
                cart_product_incomplete: null
            })
            alert("Full Cart is Deleted")
            history.push('/')
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container p-3">
            {
                cart_product_length !== 0 ?
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cart_product_incomplete[0]?.cart_product.map((data, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.product[0].title}</td>
                                    <td>{"$" +data.price}</td>
                                    <td>{data.quantity}</td>
                                    <td>{"$" +data.subtotal}</td>
                                    <td>
                                        <button onClick={() => editCartProduct(data.id)} className="btn btn-info">-
                                        </button>
                                        <button onClick={() => deleteCartProduct(data.id)}
                                                className="btn btn-danger mx-1">X
                                        </button>
                                        <button onClick={() => updateCartProduct(data.id)}
                                                className="btn btn-success">+
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <th colSpan="4" className="text-right">Total</th>
                            <th>{cart_product_incomplete?.total}</th>
                            <th>
                                <Link to="/order" className="btn btn-success">OrderNow</Link>
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                    :
                    (
                        <div>
                            <h1>There is not any Product in Cart Go to home page and add some Products</h1>
                        </div>
                    )
            }
            <div className="row">
                <div className="col">
                    <Link to="/oldorders" className="btn btn-warning">Old Orders</Link>
                </div>
                {
                    cart_product_length !== 0 &&
                    <>
                        <div className="col">
                            <button onClick={() => deleteFullCart(cart_product_incomplete[0]?.id)}
                                    className="btn btn-danger">Delete
                                Cart
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default CartPage;