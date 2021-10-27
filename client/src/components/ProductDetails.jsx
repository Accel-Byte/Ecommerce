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
       
            <div class="container">
        
            <article class="card">
                <div class="card-body">
                        <div class="row">
                            <aside class="col-md-6">
                                    <article class="gallery-wrap">
                                        <div class="card img-big-wrap">
                                            <a href="#"> <img className="w-100" src={product.image} alt=""/></a>
                                        </div> {/*}
                                        <div class="thumbs-wrap">
                                            <a href="#" class="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                        </div>*/}
                                    </article>
                            </aside>
                            <main class="col-md-6">
                                <article>
                                    {// <a href="#" class="text-primary btn-link">Clothes</a> 
                                    }
                                    <h3 class="title">{product.title}</h3>
                                    <div>
                                        <ul class="rating-stars">
                                            <li  class="stars-active"> 
                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i> 
                                                <i class="fa fa-star"></i>  
                                                
                                            </li>
                                            <li>
                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i> 
                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i> 
                                                <i class="fa fa-star"></i> 
                                            </li>
                                        </ul>
                                        <span class="label-rating mr-3 text-muted">7/10</span>
                                        <a href="#" class="btn-link  mr-3 text-muted"> <i class="fa fa-heart"></i> Save for later </a>
                                        <a href="#" class="btn-link text-muted"> <i class="fa fa-book-open"></i> Compare </a>
                                    </div> 
            
                                    <hr />
                        
                                    <div class="mb-3">
                                        <h6>Short description</h6>
                                        <ul class="list-dots mb-0">
                                            {product.description}
                                        </ul>
                                    </div>
                                    {/*
                                    <div class="form-group">
                                        <label class="text-muted">Available sizes</label>
                                        <div>
                                            <label class="js-check btn btn-check active mr-1">
                                                <input type="radio" name="option_size" value="option1" checked="" />
                                                <span>Small</span>
                                            </label>
                                            <label class="js-check btn btn-check mr-1">
                                                <input type="radio" name="option_size" value="option1" />
                                                <span>Medium</span>
                                            </label>
                                            <label class="js-check btn btn-check mr-1">
                                                <input type="radio" name="option_size" value="option1" />
                                                <span>Large</span>
                                            </label>
                                            <label class="js-check btn btn-check disabled">
                                                <input type="radio" name="option_size" disabled="" value="option1" />
                                                <span>Babies</span>
                                            </label>  
                                        </div>            
                                    </div>
                                    */}
                                    <div class="mb-3">
                                        <var class="price h4"><del>{product.marcket_price}$</del> {product.selling_price}$</var> <br />
                                        <span class="monthly">{(product.selling_price/12).toFixed(2)}$ / monthly <a href="#" class="btn-link">installment </a></span>
                                    </div> 
                      
                                    <div class="mb-4">
                                        <a href="#" class="btn btn-primary mr-1">Buy now</a>
                                        <a  onClick={() => addtocart(product.id)} className="btn btn-success" >Add to Cart </a>
                                    </div>
                                    
                                </article> 
                            </main>
                        </div> 
                </div> 
            </article>
            </div>
        
                    </>
                )
            }
         
        </div>
    )
}

export default ProductDetails
