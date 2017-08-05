import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import { shelves, noneShelfKey } from './Bookshelves'

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onBookModified: PropTypes.func.isRequired
}

function ListBooks(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves()
              .filter((shelf) => (shelf.key !== noneShelfKey()))
              .map((shelf, index) => (
                <Bookshelf
                  key={index}
                  title={shelf.title}
                  books={props.books.filter((book) => (
                    book.shelf && book.shelf === shelf.key
                  ))}
                  onBookModified={props.onBookModified}
                />
              ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks

