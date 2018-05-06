import React from "react";
import { Route } from "react-router-dom";

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
      books.map(book =>
        this.setState({
          books: books,
          currentlyReading: books.filter(b => b.shelf === "currentlyReading"),
          wantToRead: books.filter(b => b.shelf === "wantToRead"),
          read: books.filter(b => b.shelf === "read")
        })
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
            <Shelf
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              handleShelf={this.handleShelf}
            />
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
