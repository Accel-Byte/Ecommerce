import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {domain} from '../../env'

const OldOrders = () => {
    const token = window.localStorage.getItem('token')
    const [orders, setOrders] = useState(null)
    const [reload, setReload] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            Axios({
                method: 'get',
                url: `${domain}/api/orders/`,
                headers: {
                    Authorization: `token ${token}`
                }
            }).then(response => {
                setOrders(response.data)
            })
        }
        getOrder().then().catch();
    }, [reload, token])

    const deleteOrderHistory = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/orders/${id}/`,
            headers: {
                Authorization: `token ${token}`
            }
        }).then((res) => {
            setReload(res.data)
        })
    }

    return (
        <div className="container">
            <h1>Orders History</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>SN</th>
                    <th>Total</th>
                    <th>Product</th>
                    <th>Order Status</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    orders?.length !== 0 ?
                        orders?.map((order, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>TK. {order?.total}</td>
                                <td>{order?.cart_product?.length}</td>
                                <td>{order?.order_status}</td>
                                <td><Link to={`/oldOrders/${order.id}`} className="btn btn-success">Details</Link></td>
                                <td><p onClick={() => deleteOrderHistory(order.id)}
                                       className="btn btn-danger">Delete</p></td>
                            </tr>
                        )) :
                        (
                            <div>
                                <h1 className="display-1">
                                    No Old Order
                                </h1>
                                <Link to="/" className="btn btn-info">GO HOME</Link>
                            </div>
                        )
                }
                </tbody>
            </table>
        </div>
    )
}

export default OldOrders;