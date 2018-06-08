import React, { Component } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import {
  createCart,
  getUserCart,
  addProductToCart,
  removeProductFromCart
} from "../../actions/cartActions";
import Spinner from "../common/Spinner";
import Search from "../common/Search";
import toastr from "toastr";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };

    this.onAddToCart = this.onAddToCart.bind(this);
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.cart_id) {
      this.props.getUserCart(localStorage.cart_id);
    } else {
      this.props.createCart();
    }
    this.props.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop) {
      this.setState({ shop: nextProps.shop });
    }
  }

  onAddToCart(product_id) {
    toastr.success("Product added to Cart");
    this.props.addProductToCart(product_id, localStorage.cart_id);
  }

  onRemoveFromCart(product_id) {
    toastr.warning("Product is removed from the cart");
    this.props.removeProductFromCart(product_id, localStorage.cart_id);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let { products, loading } = this.props.shop;
    let content;
    const { cart } = this.props.cart;
    const cart_products = cart.products;

    if (products == null || loading) {
      content = (
        <div className="m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (products.length > 0) {
        if (products !== null && products.length > 0) {
          const searchString = this.state.search.trim().toLowerCase();
          if (searchString.length > 0) {
            products = products.filter(product =>
              product.product_name.toLowerCase().match(searchString)
            );
          }
        }

        content = products.map(product => (
          <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Product
              product={product}
              onAddToCart={this.onAddToCart}
              onRemoveFromCart={this.onRemoveFromCart}
              cartProducts={cart_products}
            />
          </div>
        ));
      } else {
        content = (
          <div className="m-auto border border-danger rounded bg-light p-3">
            <p className="lead">
              Sorry! No Products to Show. We are running out of stock.
            </p>
          </div>
        );
      }
    }

    return (
      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Your Market</h1>
              <p className="lead text-center">Browse and pick your products</p>
              <Search onChange={this.onChange} value={this.state.search} />
              <div className="row">{content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  createCart: PropTypes.func.isRequired,
  getUserCart: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shop: state.shop,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  {
    getProducts,
    createCart,
    getUserCart,
    addProductToCart,
    removeProductFromCart
  }
)(ProductList);
