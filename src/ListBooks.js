import React from "react";
import PropTypes from "prop-types";

import SelectShelf from "./SelectShelf";

class ListBooks extends React.Component {
  render() {
    const { books } = this.props;

    return (
      <ol className="books-grid">
        {books.map(book => (
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
                  <SelectShelf />
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array
};

export default ListBooks;
