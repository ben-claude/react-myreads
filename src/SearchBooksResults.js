import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooksResults extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onBookModified: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  mounted = false
  state = {
    matchedBooks: [],
  }

  clear = () => (
    this.setState({ matchedBooks: [] })
  )
  // react "re-rendering" lifecycle event (cf https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1)
  componentWillReceiveProps(nextProps) {
    /* 
    - The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md:
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    - However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
    */
    if (nextProps.query === this.props.query)
      return
    if (!nextProps.query) {
      this.clear()
      return
    }
    BooksAPI.search(nextProps.query).then((matchedBooks) => {
      // treat server async response
      if (this.mounted && // component has been unmounted while waiting for previous response
        this.props.query) { // query has been emptied while waiting for previous response
        if (matchedBooks && Array.isArray(matchedBooks)) {
          this.setState({ matchedBooks })
        }
        else {
          this.clear()
        }
      }
    })
  }
  componentDidMount() {
    this.mounted = true
  }
  componentWillUnmount() {
    /*
    mounted is used to avoid the below message in case the async fetch() response is received after the component is unmounted
    (when the Close button is quickly closed in SearchBooks)
    "Warning: setState(...): Can only update a mounted or mounting component. 
    This usually means you called setState() on an unmounted component."
    */
    this.mounted = false
  }
  render() {
    // if a matched book is already in our shelves replace it with the book of the shelf
    const showingBooks = this.state.matchedBooks.map((matchedBook) => {
      var shelvesBooks = this.props.books.filter((book) => (book.id === matchedBook.id))
      if (shelvesBooks.length > 1) {
        console.log('SearchBooksResults unexpected shelvesBooks length')
      }
      if (shelvesBooks.length === 1) {
        return shelvesBooks[0]
      }
      else {
        return matchedBook
      }
    })
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {showingBooks.map((book, index) => (
            <li key={index}>
              <Book book={book} onBookModified={this.props.onBookModified} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default SearchBooksResults

