import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddItemToCart from './AddItemToCart';
import FreteGratis from '../images/frete-gratis.png';

export default class ProductCard extends React.Component {
  render() {
    const { product, onClick } = this.props;
    const { id, title, thumbnail, price, shipping } = product;

    return (
      <div className="product-card" data-testid="product" id={ id }>
        <Link
          data-testid="product-detail-link"
          to={ `/product-details/${id}` }
        >
          <h4>{ title }</h4>
        </Link>
        <div>
          <img src={ thumbnail } alt="Product Thumbnail" className="thumbnail" />
          { shipping.free_shipping && (
            <img
              className="frete-gratis"
              data-testid="free-shipping"
              src={ FreteGratis }
              alt="frete grátis"
            />) }
        </div>
        <span>
          { `${price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` }
        </span>
        <AddItemToCart dataTestId="product-add-to-cart" onClick={ onClick } />
      </div>
    );
  }
}

ProductCard.propTypes = {
  key: PropTypes.string.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
}.isRequired;
