import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {domain} from '../env';
import {Link} from 'react-router-dom';
import Product from './Product';

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/product/${id}/`,
            })
                .then((response) => {
                    setProduct(response?.data);
                    getCategoryData(response?.data?.category['id']);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getProduct();
    }, [id]);

    const getCategoryData = async (id) => {
        await Axios({
            method: 'get',
            url: `${domain}/api/category/${id}/`,
        }).then((response) => {
            console.log(response?.data);
            setCategoryProducts(response?.data);
        });
    };

    const addToCart = async (id) => {
        console.log(id);
    };

    return (
        <div className="container">
            {product !== null && (
                <>
                    <div className="container" style={{marginTop: '20px'}}>
                        <article className="card p-3">
                            <div className="card-body">
                                <div className="row">
                                    <aside className="col-md-6">
                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                            {' '}
                                            <img
                                                className="w-75 mx-auto d-block"
                                                src={product.image}
                                                alt=""
                                            />
                                        </div>
                                        {' '}
                                    </aside>
                                    <main className="col-md-6">
                                        <h3 className="title">{product.title}</h3>
                                        <hr/>
                                        <div className="mb-3">
                                            <h6>Short description</h6>
                                            <ul className="list-dots mb-0">{product.description}</ul>
                                        </div>
                                        <div className="mb-3">
                                            <div className="price">
                                                <h5 className="mt-4">
                                                    {' '}
                                                    Price:{' '}
                                                    <del className="text-danger">
                                                        {product.market_price}$
                                                    </del>
                                                    {' '}
                                                    <i className="text-success">
                                                        {product.selling_price}$
                                                    </i>
                                                </h5>
                                            </div>
                                            <br/>
                                            <span className="monthly">
                        {(product.selling_price / 12).toFixed(2)}$ / monthly{' '}
                                                <a href="/" className="btn-link">
                          installment{' '}
                        </a>
                      </span>
                                        </div>

                                        <div className="mb-4">
                                            <Link onClick={() => addToCart(product.id)}>
                                                <a href="/" className="btn btn-success mt-3">
                                                    <i className="fas fa-shopping-basket"/>
                                                    Buy Product
                                                </a>
                                            </Link>
                                            &nbsp;
                                            <Link onClick={() => addToCart(product.id)}>
                                                <a href="/" className="btn btn-warning mt-3">
                                                    <i className="fas fa-shopping-cart"/> Add to Cart
                                                </a>
                                            </Link>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="row">
                        <h1>Related Products</h1>
                        {categoryProducts !== null &&
                        categoryProducts[0]?.category_product?.map((categoryProduct) => {
                            if (categoryProduct.id !== product.id) {
                                return (
                                    <div className="col-md-3 mt-2" key={categoryProduct.id}>
                                        <Product item={categoryProduct}/>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
