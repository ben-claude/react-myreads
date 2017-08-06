import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    books: []
  }
  onBookModified = (book, newShelf) => {
    if (book.shelf !== newShelf) {
      // no "optimistic" update of the state to keep code simple: wait for the server response to update the state
      BooksAPI.update(book, newShelf).then(() => {
        // do not call refresh() here because it is too slow
        book.shelf = newShelf // use the book coming from SearchBooksResults to replace the same book in this.state
        this.setState(state => (
          {
            books: this.state.books.filter(b => b.id !== book.id) // remove the previous version of the book
                                   .concat([ book ]) // replace it with the modified book
          }
        ))
      })
    }
  }
  refresh = () => (
    BooksAPI.getAll().then((books) => (
      this.setState({ books })
    ))
  )
  // react lifecycle event
  componentDidMount() {
    this.refresh()
  }
  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks books={books} onBookModified={this.onBookModified} />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks books={books} onBookModified={this.onBookModified} />
        )}/>
      </div>
    )
  }
}

export default BooksApp

