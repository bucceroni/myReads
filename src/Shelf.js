import React from "react";
import { Link } from "react-router-dom";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./utils/BooksAPI";

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        update: []
    };
  }

  updateShelf = (book, shelf) => {
    this.setState(state => ({
      update: BooksAPI.update({ id: book }, shelf).then(update => this.setState({update}))
    }));
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.props;

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ListBooks
                    books={currentlyReading}
                    selectShelf={this.updateShelf}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ListBooks
                    books={wantToRead}
                    selectShelf={this.updateShelf}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ListBooks books={read} selectShelf={this.updateShelf} />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
