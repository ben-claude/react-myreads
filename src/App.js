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
  onBookModified = (bookId, newShelf) => {
    // no "optimistic" update of the state to keep code simple (use redux-optimist package ?)
    BooksAPI.update({ id: bookId }, newShelf).then(() => (
      this.refresh()
    ))
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

