import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ item }) => {
  return (
    <>
      <div className="card mt-4">
        <Link
          to={`/product/${item.id}`}
          className="product_image"
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <img className="card-img" src={item.image} alt="Card cap" />
        </Link>
        <div className="card-body">
          <h4 className="card-title">{item.title}</h4>
          <p className="card-text">
            {item.description.substring(0, 50)}...{' '}
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
              {' '}
              Read more
            </Link>
          </p>
          <div className="buy d-flex justify-content-between align-items-center">
            <div className="price text-success">
              <h5 className="mt-4">
                {' '}
                Price: <del className="text-danger">
                  {item.marcket_price}$
                </del>{' '}
                {item.selling_price}$
              </h5>
            </div>
            <a href="/" className="btn btn-warning mt-3">
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
