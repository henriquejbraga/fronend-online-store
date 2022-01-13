import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class Form extends Component {
  /* constructor() {
    super();
    this.state = {
      name: '',
      comment: '',
      stars: 0,
    };
  } */

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('avaliation', JSON.stringify([this.state]));
    // https://josiaspereira.com.br/como-usar-localstorage-no-reactjs/
    // localStorage.setItem("ourarraykey",JSON.stringify(ourArray));
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Digite seu Nome"
          onChange={ this.handleChange }
        />
        <textarea
          id="comment"
          name="comment"
          placeholder="Comentário"
          cols="30"
          rows="5"
          data-testid="product-detail-evaluation"
          onChange={ this.handleChange }
        />
        <input
          type="number"
          name="stars"
          id="stars"
          min="0"
          max="5"
          onChange={ this.handleChange }
        />
        <button type="submit" onClick={ this.handleClick }>
          Avalie
        </button>
      </form>
    );
  }
}

/* Form.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
}; */
