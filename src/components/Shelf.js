import React from "react";
import PropTypes from "prop-types";

import Books from "./Books";

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentlyReading, wantToRead, read, handleShelf } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <Books books={currentlyReading} handleShelf={handleShelf} />
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <Books books={wantToRead} handleShelf={handleShelf} />
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <Books books={read} handleShelf={handleShelf} />
          </div>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  handleShelf: PropTypes.func
};

export default Shelf;
