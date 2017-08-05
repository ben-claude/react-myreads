import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onBookModified: PropTypes.func.isRequired
}

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book, index) => (
            <li key={index}>
              <Book book={book} onBookModified={props.onBookModified}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf

