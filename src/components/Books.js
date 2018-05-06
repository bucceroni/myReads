import React from "react";
import PropTypes from "prop-types";

import * as BooksAPI from "../utils/BooksAPI";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfCurrently: ""
    };
  }

  handleShelfCurrently = (id) => {
    BooksAPI.get(id).then(book =>
      this.setState({
        shelfCurrently: book.shelf
      })
    );
  }

  render() {
    const { shelfCurrently } = this.state;
    const { books, handleShelf } = this.props;

    const shelves = [
      {
        value: "currentlyReading",
        text: "Currently Reading"
      },
      {
        value: "wantToRead",
        text: "Want To Read"
      },
      {
        value: "read",
        text: "Read"
      },
      {
        value: "none",
        text: "None"
      }
    ];

    return (
      <ol className="books-grid">
        {books.map(book => {
           console.log("shelfCurrently: ", shelfCurrently);
          return (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${
                        book.imageLinks
                          ? book.imageLinks.thumbnail
                          : book.infoLink
                      })`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={shelfCurrently}
                      onClick={() => this.handleShelfCurrently(book.id)}
                      onChange={e => handleShelf(book.id, book.shelf, e)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      {shelves.map((shelf, index) => {
                        return (
                          <option
                            key={index}
                            value={shelf.value}
                            disabled={shelf.value === shelfCurrently}
                          >
                            {shelf.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}

Books.propTypes = {
  books: PropTypes.array,
  handleShelf: PropTypes.func
};

export default Books;
