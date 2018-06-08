import React, { Component } from "react";
import PropTypes from "prop-types";

class CartProduct extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className="product">
        <div className="card card-body bg-light">
          <div className="row">
            <div className="col-lg-2 col-md-3">
              <img
                className="col-md-8 rounded mb-4"
                src="http://via.placeholder.com/200x200"
                alt="Placeholder"
              />
            </div>
            <div className="col-lg-4 col-md-3">
              <p className="lead">{product.product.product_name}</p>
              <p className="text-muted">Quantity: {product.quantity}</p>
              <p className="text-muted">Price: {product.product.price}</p>
            </div>
            <div className="col-md-3">
              <button
                onClick={() => this.props.onRemoveFromCart(product.product._id)}
                className="btn btn-sm btn-light border border-danger rounded"
              >
                -
              </button>
              <span className="col-2">{product.quantity}</span>
              <button
                onClick={() => this.props.onAddToCart(product.product._id)}
                className="btn btn-sm btn-light border border-success rounded"
              >
                +
              </button>
            </div>
            <div className="col-md-3">
              <p className="text-muted">Total item cost</p>
              <p className="">
                {`${product.quantity} * ${product.product.price}`}
              </p>
              <p className="text-success">
                $ {(product.quantity * product.product.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.object,
  onAddToCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default CartProduct;
