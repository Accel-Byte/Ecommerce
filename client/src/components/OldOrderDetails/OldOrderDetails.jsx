import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {domain} from '../../env';

const OldOrderDetails = () => {
    const token = window.localStorage.getItem('token')
    const {id} = useParams()
    const [details, setDetails] = useState(null);
    useEffect(() => {
        const getData = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/orders/${id}/`,
                headers: {
                    Authorization: `token ${token}`
                }
            }).then((res) => {
                console.log(res?.data.data[0]);
                setDetails(res?.data?.data[0])
            })
        }
        getData().then().catch();
    }, [id, token])

    const products = details?.cart_product

    return (
        <div className="container p-3">
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>discount</th>
                    <th>Products</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        details != null && (
                            <>
                                <td>{details.date}</td>
                                <td>{"$" + details.total} </td>
                                <td>{details.email}</td>
                                <td>{details.mobile}</td>
                                <td>{details.discount}</td>
                                <td>{details.cart_product?.length}</td>
                            </>
                        )
                    }
                </tr>
                </tbody>
            </table>
            <h1>Product details</h1>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>SN</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {
                    products?.map((data, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.product[0].title}</td>
                            <td>{"$" + data.price}</td>
                            <td>{data.quantity}</td>
                            <td>{"$" +data.subtotal}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default OldOrderDetails;