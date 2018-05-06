import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as BooksAPI from "../utils/BooksAPI";

import Books from "../components/Books";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchBook: [],
      searchError: false
    };
  }

  getSearchBooks = event => {
    const query = event.target.value.trim();
    this.setState({ query: query });

    if (query) {
      BooksAPI.search(query, 20).then(books => {
        books.length > 0
          ? this.setState({ searchBook: books, searchError: false })
          : this.setState({ searchBook: [], searchError: true });
      });
    } else this.setState({ searchBook: [], searchError: false });
  };


  render() {
    const { query, searchBook, searchError } = this.state;
    const { handleShelf } = this.props;

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
              onChange={this.getSearchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBook.length > 0 && (
              <div>
                <div className="">
                  <h3>Search returned {searchBook.length} books </h3>
                </div>
                <Books books={searchBook} handleShelf={handleShelf} />
              </div>
            )}
            {searchError && (
              <div>
                <div className="">
                  <h3>Search returned 0 books. Please try again!</h3>
                </div>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleShelf: PropTypes.func
};

export default Search;
