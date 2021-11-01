import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {domain} from '../../env';
import Product from '../Product/Product';

const HomePage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const getData = () => {
            Axios({
                method: 'get',
                url: `${domain}/api/product/`,
            }).then((res) => {
                setProducts(res.data);
            });
        };
        getData();
    }, []);

    const nextPage = async () => {
        Axios({
            method: 'get',
            url: products?.next,
        }).then((res) => {
            setProducts(res.data);
        });
    };

    const previousPage = async () => {
        Axios({
            method: 'get',
            url: products?.previous,
        }).then((res) => {
            setProducts(res.data);
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        {products !== null ? (
                            <>
                                {products?.results.map((item, i) => (
                                    <div className="col-12 col-sm-8 col-md-6 col-lg-4" key={i}>
                                        <Product item={item}/>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <h1>Loading...</h1>
                            </>
                        )}
                    </div>
                    <div className="homepage__pagination">
                        <div className="">
                            {products?.previous !== null ? (
                                <button onClick={previousPage} className="btn btn-lg btn-success">
                                    <i className="fas fa-backward"/> Previous
                                </button>
                            ) : (
                                <button className="btn btn-lg btn-success" disabled>
                                    {' '}
                                    <i className="fas fa-backward"/> Previous
                                </button>
                            )}
                        </div>
                        <div className="">
                            {products?.next !== null ? (
                                <button onClick={nextPage} className="btn btn-lg btn-danger">
                                    Next <i className="fas fa-forward"/>
                                </button>
                            ) : (
                                <button className="btn btn-lg btn-danger" disabled>
                                    Next <i className="fas fa-forward"/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-3"/>
            </div>
        </div>
    );
};

export default HomePage;
