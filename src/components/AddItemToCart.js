import React from 'react';
import PropTypes from 'prop-types';

// import * as api from '../services/shoppingCartAPI';

export default class AddItemToCart extends React.Component {
  render() {
    const { dataTestId, onClick } = this.props;

    return (
      <button
        type="button"
        data-testid={ dataTestId }
        onClick={ onClick }
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}

AddItemToCart.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
}.isRequired;
