/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
//import sortBy from "sort-by";

import * as BooksAPI from "./utils/BooksAPI";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: ""
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  render() {
    const { books, query } = this.state;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingBooks = books.filter(book => match.test(book.name));
    } else {
      showingBooks = books;
    }

    //showingBooks.sort(sortBy("name"));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={e => this.updateQuery(e.target.value)}
            />
            <ol className="books-grid">
              {showingBooks.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value=""
                          onChange={e =>
                            this.handleChange(book.id, book.shelf, e)
                          }
                        >
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default Search;
