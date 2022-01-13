import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import * as api from '../services/shoppingCartAPI';

export default class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.readShoppingCart();
  }

  readShoppingCart = () => {
    const items = api.readShoppingCart();
    this.setState({ items, isLoading: false });
  }

  handleAddItem = ({ target }) => {
    const { items } = this.state;
    api.addItemToCart(items.find(({ id }) => id === target.value));
    this.readShoppingCart();
  }

  handleSubItem = ({ target }) => {
    const { items } = this.state;
    api.subItemFromCart(items.find(({ id }) => id === target.value));
    this.readShoppingCart();
  }

  handleRemoveItem = ({ target }) => {
    const { items } = this.state;
    api.removeItemFromCart(items.find(({ id }) => id === target.value));
    this.readShoppingCart();
  }

  render() {
    const { items, isLoading } = this.state;

    if (!items.length) {
      return (
        <div data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </div>
      );
    }

    if (isLoading) return <Loading />;

    return (
      <div data-testid="shopping-cart">
        Seu carrinho tem:
        { items.map((item, index) => (
          <div key={ index }>
            Nome:&nbsp;
            <div data-testid="shopping-cart-product-name">{ item.title }</div>
            Quantidade:&nbsp;
            <div data-testid="shopping-cart-product-quantity">{ item.shopping_cart }</div>
            <div id="buttons">
              <button
                type="button"
                value={ item.id }
                data-testid="product-decrease-quantity"
                onClick={ this.handleSubItem }
              >
                -
              </button>
              <button
                type="button"
                value={ item.id }
                data-testid="product-increase-quantity"
                onClick={ this.handleAddItem }
              >
                +
              </button>
              <button
                type="button"
                value={ item.id }
                onClick={ this.handleRemoveItem }
              >
                X
              </button>
            </div>
            <div id="price-per-item">
              { (item.price * item.shopping_cart)
                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </div>
          </div>
        )) }
        <div id="total-price">
          Valor Total:&nbsp;
          { items.reduce((acc, item) => acc + (item.price * item.shopping_cart), 0)
            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
        </div>
        <Link
          data-testid="checkout-products"
          to={ { pathname: '/checkout' } }
        >
          Finalize a compra
        </Link>
      </div>
    );
  }
}
