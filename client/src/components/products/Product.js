import React, { Component } from "react";
import PropTypes from "prop-types";

class Product extends Component {
  render() {
    const { product, cartProducts } = this.props;

    let index = -1;
    let quantity = 0;
    if (cartProducts && cartProducts.length > 0) {
      index = cartProducts
        .map(product => product.product._id)
        .indexOf(product._id);
      quantity = index < 0 ? 0 : cartProducts[index].quantity;
    }

    const add = (
      <div className="mt-4">
        <button
          onClick={() => this.props.onAddToCart(product._id)}
          className="btn btn-info btn-sm col-12"
        >
          <i className="fas fa-cart-plus mr-2" />
          Add to Cart
        </button>
      </div>
    );

    const add_remove = (
      <div className="mt-4">
        <button
          onClick={() => this.props.onRemoveFromCart(product._id)}
          className="btn btn-danger btn-sm col-2"
        >
          -
        </button>
        <input
          type="text"
          value={`Qty ${quantity}`}
          className="text-center col-8"
          readOnly="true"
        />
        <button
          onClick={() => this.props.onAddToCart(product._id)}
          className="btn btn-warning btn-sm col-2"
        >
          +
        </button>
      </div>
    );

    return (
      <div className="product">
        <div className="card card-body bg-light">
          <div className="text-center">
            <img
              className="col-md-8 rounded mb-4"
              src="http://via.placeholder.com/200x200"
              alt="Placeholder"
            />
          </div>
          <div className="">
            <p className="lead">{product.product_name}</p>
            <p>
              <span className="text-muted">Price:</span> ${product.price}
            </p>
            <small>
              <i className="fas fa-truck mr-2" />Standard Delivery Tomorrow
            </small>
          </div>
          {index < 0 ? add : add_remove}
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  cartProducts: PropTypes.array,
  onAddToCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default Product;
