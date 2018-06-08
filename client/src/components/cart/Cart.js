import React, { Component } from "react";
import PropTypes from "prop-types";
import CartProduct from "./CartProduct";
import { connect } from "react-redux";
import {
  getUserCart,
  addProductToCart,
  removeProductFromCart
} from "../../actions/cartActions";
import Spinner from "../common/Spinner";
import toastr from "toastr";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.onAddToCart = this.onAddToCart.bind(this);
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
  }

  componentDidMount() {
    if (localStorage.cart_id) {
      this.props.getUserCart(localStorage.cart_id);
    } else {
      this.props.createCart();
    }
    this.setState({ cart: this.props.cart });
  }

  onAddToCart(product_id) {
    toastr.success("Product added to the cart");
    this.props.addProductToCart(product_id, localStorage.cart_id);
  }

  onRemoveFromCart(product_id) {
    toastr.warning("Product is removed from the cart");
    this.props.removeProductFromCart(product_id, localStorage.cart_id);
  }

  render() {
    const { cart, loading } = this.props.cart;
    const cart_products = cart.products;
    let content;
    let totalCost = 0;
    if (cart_products == null || loading) {
      content = (
        <div className="m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (cart_products.length > 0) {
        content = cart_products.map(product => (
          <div key={product._id} className="col-md-12 col-sm-6 mb-4">
            <CartProduct
              product={product}
              onAddToCart={this.onAddToCart}
              onRemoveFromCart={this.onRemoveFromCart}
            />
          </div>
        ));

        totalCost = cart_products
          .reduce((total, product) => {
            return (
              Number(total) +
              Number((product.quantity * product.product.price).toFixed(2))
            );
          }, 0)
          .toFixed(2);
      } else {
        content = (
          <div className="m-auto border border-danger rounded bg-light p-3">
            <p className="lead">Your cart is still empty.</p>
          </div>
        );
      }
    }

    const checkout = (
      <div className="row">
        <div className="col-md-6 col-md-offset-5 p-0 bg-light border border-success">
          <div className="m-3">
            <p className="">
              Sub Total: <span className="text-muted">$ {totalCost}</span>
            </p>
            <p>
              Delivery Charges: <span className="text-muted">$ **</span>
            </p>
            <small>** Delivery charges calculated during the checkout</small>
          </div>
          <div className="lead text-center p-2 bg-success">
            <span style={{ color: "white" }}>Checkout</span>
          </div>
        </div>
      </div>
    );
    return (
      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Your Cart</h1>
              <p className="lead text-center">
                Items you have added to the cart
              </p>
              <div className="row">{content}</div>
              {totalCost > 0 ? checkout : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  getUserCart: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getUserCart, addProductToCart, removeProductFromCart }
)(Cart);
