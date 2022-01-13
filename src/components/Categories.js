import React from 'react';
import PropTypes from 'prop-types';

import { getCategories } from '../services/api';
import Loading from './Loading';

export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesAPI();
  }

  getCategoriesAPI = async () => {
    const categories = await getCategories();

    this.setState({ isLoading: false, categories });
  }

  showCategories = () => {
    const { categories } = this.state;
    const { category, onChange } = this.props;
    return (
      categories.map(({ name, id }) => (
        <div key={ id }>
          <label data-testid="category" htmlFor={ id }>
            <input
              type="radio"
              name="category"
              id={ id }
              value={ name }
              checked={ category === id }
              onChange={ onChange }
            />
            { name }
          </label>
        </div>
      ))
    );
  }

  render() {
    const { isLoading } = this.state;

    return (
      <aside className="lado-esquerdo">
        { isLoading ? <Loading /> : this.showCategories() }
      </aside>
    );
  }
}

Categories.propTypes = {
  category: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Categories.defaultProps = {
  category: null,
};
