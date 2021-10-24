import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { domain } from '../env'
import { useGlobalState } from '../state/provider'
import Product from './Product'

//https://codepen.io/seansky/pen/oNvOdwX

const ProductDetails = () => {
    const { id } = useParams()
    const [{ profile }, dispatch] = useGlobalState()
    const history = useHistory()
    const [product, setProduct] = useState(null)
    const [categoryproduct, setCategoryproduct] = useState(null)
    useEffect(() => {
        const getproduct = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/product/${id}/`,
            }).then(response => {
                setProduct(response?.data)
                getcatdata(response?.data?.category["id"])
            }).catch(error => {
                console.log(error);
            })
        }
        getproduct()
    }, [id])
    const getcatdata = async (id) => {
        await Axios({
            method: "get",
            url: `${domain}/api/category/${id}/`
        }).then(response => {
            setCategoryproduct(response?.data)
        })
    }
    const addtocart = async (id) => {
        profile !== null ? (
            await Axios({
                method: 'post',
                url: `${domain}/api/addtocart/`,
                headers: {
                    Authorization: `token ${window.localStorage.getItem('token')}`
                },
                data: { "id": id }
            }).then(response => {
                console.log(response);
                dispatch({
                    type: "ADD_RELOADPAGE_DATA",
                    reloadpage: response
                })
            })
        ) : (
                history.push("/login")
            )

    }
    // console.log(categoryproduct[0].category_product);
    return (
        <div className="container">
            {
                product !== null && (
                    <>
                        <div className="row">
                            <img className="w-100" src={product.image} alt="" />
                            <div className="col-md-7 p-2">
                                <h1>{product.title}</h1>
                                <h2>Price: <del>{product.marcket_price}$</del> {product.selling_price}$</h2>
                            </div>
                            <div className="col-md-4 p-3">
                                <p onClick={() => addtocart(product.id)} className="btn btn-success">Add to Cart</p>
                            </div>
                            <p>{product.description}</p>
                        </div>
                    </>
                )
            }
            <div className="row">
                <h1>Related Products</h1>
                {
                    categoryproduct !== null &&
                    categoryproduct[0]?.category_product?.map((product, i) => (
                        <div className="col-md-3 mt-2" key={i}>
                            <Product item={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductDetails
