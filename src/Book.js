import React from 'react'
import PropTypes from 'prop-types'
import { shelves } from './Bookshelves'

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookModified: PropTypes.func.isRequired
}

function Book(props) {
  const option = (key, value, label, disabled) => {
    var opts = {}
    if (disabled) {
      // JSX spread attributes from https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
      opts['disabled'] = true
    }
    return <option key={key} value={value} {...opts}>{label}</option>
  }
  const { book } = props
  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks && (
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
        )}

        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(event) => props.onBookModified(book, event.target.value)}>
            { option(0, "none", "Move to...", true) }
            { shelves().map((shelf, index) => (
              option(index + 1, shelf.key, shelf.title, false) 
            ))}
          </select>
        </div>

      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">{book.authors.join(', ')}</div>
      )}
    </div>
  )
}

export default Book

