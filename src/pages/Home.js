import React from 'react';

import * as api from '../services/api';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import ShoppingCartButton from '../components/ShoppingCartButton';
import * as cartApi from '../services/shoppingCartAPI';

import '../styles/Home.css';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      category: null,
      searchText: '',
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  handleInput = ({ target: { name, value } }) => { this.setState({ [name]: value }); }

  handleRadio = ({ target: { checked, id } }) => {
    if (checked) {
      this.setState({ category: id });
    }
  }

  handleClick = () => {
    this.setState({ isLoading: true });
    this.getProducts();
  }

  getProducts = async () => {
    const { category, searchText } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(category, searchText);
    const results = products ? products.results : [];
    this.setState({ isLoading: false, products: results });
  }

  results = () => {
    const { products } = this.state;
    if (!products.length) {
      return (
        <h4>Digite algum termo de pesquisa ou escolha uma categoria.</h4>
      );
    }
    return (
      products.map((product, idx) => (
        <ProductCard
          key={ idx }
          product={ product }
          onClick={ () => {
            cartApi.addItemToCart(product);
            this.setState({});
          } }
        />))
    );
  }

  render() {
    const { isLoading, category, searchText } = this.state;

    return (
      <main data-testid="home-initial-message" className="flex">
        <Categories category={ category } onChange={ this.handleRadio } />
        <section className="lado-direito">
          <article className="query-form">
            <input
              type="text"
              data-testid="query-input"
              className="query-input"
              name="searchText"
              value={ searchText }
              onChange={ this.handleInput }
              placeholder="Termo de pesquisa"
            />
            <button
              type="submit"
              data-testid="query-button"
              className="query-button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            <ShoppingCartButton cartSize={ cartApi.getCartSize() } />
          </article>
          <article className="query-results">
            { isLoading ? <Loading /> : this.results() }
          </article>
        </section>
      </main>
    );
  }
}
