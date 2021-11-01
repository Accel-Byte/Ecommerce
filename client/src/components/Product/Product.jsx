import Axios from 'axios'
import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import {domain} from '../../env'
import {useGlobalState} from '../../state/provider'


const Product = ({item}) => {
    const [{profile}, dispatch] = useGlobalState()

    const history = useHistory();

    const addToCart = async (id) => {
        profile !== null ? (
            await Axios({
                method: 'post',
                url: `${domain}/api/addToCart/`,
                headers: {
                    Authorization: `token ${window.localStorage.getItem('token')}`
                },
                data: {"id": id}
            }).then(response => {
                dispatch({
                    type: "ADD_RELOAD_PAGE_DATA",
                    reloadPage: response
                })
            })
        ) : (
            history.push("/login")
        )

    };

    return (
        <>
            <div className="card mt-4">
                <Link
                    to={`/product/${item.id}`}
                    className="product_image"
                    style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                >
                    <img className="card-img" src={item.image} alt="Card cap"/>
                </Link>
                <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">
                        {item.description.substring(0, 50)}...{' '}
                        <Link to={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                            {' '}
                            Read more
                        </Link>
                    </p>
                    <div className="buy d-flex justify-content-between align-items-center">
                        <div className="price">
                            <h5 className="mt-4">
                                {' '}
                                Price: <del className="text-danger">
                                {item.market_price}$
                            </del>{' '}
                                <i className="text-success">{item.selling_price}$</i>
                            </h5>
                        </div>
                        <button onClick={() => addToCart(item.id)} className="btn btn-warning mt-3">
                            <i className="fas fa-shopping-cart"/> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
