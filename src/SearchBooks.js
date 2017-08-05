import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchBooksResults from './SearchBooksResults'


class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookModified: PropTypes.func.isRequired
  }
  // react "controlled component"
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  clearQuery = () => {
    this.setState({ query: '' })
  }
  render() {
    const { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" onClick={this.clearQuery}>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <SearchBooksResults query={query} onBookModified={this.props.onBookModified} books={this.props.books} />
      </div>
    )
  }
}

export default SearchBooks

