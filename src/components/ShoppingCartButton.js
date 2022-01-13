import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/ShoppingCartButton.css';

export default class ShoppingCartButton extends React.Component {
  render() {
    const { cartSize } = this.props;

    return (
      <Link to="/cart" className="cart-link" data-testid="shopping-cart-button">
        <span className="cart-button" role="img" aria-label="shopping-cart">
          &#128722;
        </span>
        <div className="cart-size" data-testid="shopping-cart-size">
          { cartSize }
        </div>
      </Link>
    );
  }
}

ShoppingCartButton.propTypes = {
  cartSize: PropTypes.number.isRequired,
};
