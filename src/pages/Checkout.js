import React from 'react';
import * as api from '../services/shoppingCartAPI';

export default class Checkout extends React.Component {
  render() {
    const items = api.readShoppingCart();
    return (
      <>
        <section data-testid="shopping-cart">
          Seu carrinho tem:
          { items.map((item, index) => (
            <div key={ index }>
              Nome:&nbsp;
              <div data-testid="shopping-cart-product-name">{ item.title }</div>
              Quantidade:&nbsp;
              <div
                data-testid="shopping-cart-product-quantity"
              >
                { item.shopping_cart }
              </div>
            </div>
          ))}
        </section>
        <section>
          <form>
            <label htmlFor="checkout-fullname">
              Nome:
              <input
                type="text"
                data-testid="checkout-fullname"
              />
            </label>
            <label htmlFor="checkout-email">
              Email:
              <input
                type="email"
                data-testid="checkout-email"
              />
            </label>
            <label htmlFor="checkout-cpf">
              CPF:
              <input
                type="text"
                data-testid="checkout-cpf"
              />
            </label>
            <label htmlFor="checkout-phone">
              Telefone:
              <input
                type="tel"
                data-testid="checkout-phone"
              />
            </label>
            <label htmlFor="checkout-cep">
              CEP:
              <input
                type="text"
                data-testid="checkout-cep"
              />
            </label>
            <label htmlFor="checkout-cidade">
              Cidade:
              <input
                type="text"
                data-testid="checkout-cidade"
              />
            </label>
            <label htmlFor="checkout-estado">
              Estado:
              <input
                type="text"
                data-testid="checkout-estado"
              />
            </label>
            <label htmlFor="checkout-address">
              Endereço:
              <input
                type="text"
                data-testid="checkout-address"
              />
            </label>
          </form>
          <div>
            <h3>Método de Pagamento</h3>
            <input type="radio" name="Boleto" />
            Boleto
            <input type="radio" />
            Visa
            <input type="radio" />
            Elo
            <input type="radio" />
            MasterCard
          </div>
          <button type="submit">Comprar</button>
        </section>
      </>
    );
  }
}
