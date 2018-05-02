import React from "react";
import { Route, Link } from "react-router-dom";

import * as BooksAPI from "./utils/BooksAPI";

import Search from "./containers/Search";
import Shelf from "./components/Shelf";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  componentDidMount() {
    this.getShelfBooks();
  }

  getShelfBooks = () => {
    BooksAPI.getAll().then(books =>
      books.map(
        book =>
          this.setState({
            currentlyReading: books.filter(b => b.shelf === "currentlyReading")
          }),
        this.setState({
          wantToRead: books.filter(b => b.shelf === "wantToRead")
        }),
        this.setState({ read: books.filter(b => b.shelf === "read") })
      )
    );
  };

  handleShelf = (bookId, shelf, e) => {
    let newShelf = e.target.value;

    const text = confirm("Do you confirm change between the shelves?");
    if (text && newShelf !== shelf) {
      BooksAPI.update({ id: bookId }, newShelf).then(response => {
        this.getShelfBooks();
      });
    } else {
      alert("Error:\n This book already belongs to this shelf");
    }
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelf
                  currentlyReading={currentlyReading}
                  wantToRead={wantToRead}
                  read={read}
                  handleShelf={this.handleShelf}
                />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => <Search handleShelf={this.handleShelf} />}
        />
      </div>
    );
  }
}

export default App;
