import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { domain } from '../env';
import Product from './Product';

const HomePage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getdata = () => {
      Axios({
        method: 'get',
        url: `${domain}/api/product/`,
      }).then((res) => {
        setProducts(res.data);
      });
    };
    getdata();
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
                  <div class="col-12 col-sm-8 col-md-6 col-lg-4" key={i}>
                    <Product item={item} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>Loding...</h1>
              </>
            )}
          </div>
          <div className="homepage__pagination">
            <div className="">
              {products?.previous !== null ? (
                <button onClick={previousPage} class="btn btn-lg btn-success">
                  <i class="fas fa-backward"></i> Previous
                </button>
              ) : (
                <button class="btn btn-lg btn-success" disabled>
                  {' '}
                  <i class="fas fa-backward"></i> Previous
                </button>
              )}
            </div>
            <div className="">
              {products?.next !== null ? (
                <button onClick={nextPage} class="btn btn-lg btn-danger">
                  Next <i class="fas fa-forward"></i>
                </button>
              ) : (
                <button class="btn btn-lg btn-danger" disabled>
                  Next <i class="fas fa-forward"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3"></div>
      </div>
    </div>
  );
};

export default HomePage;
