import React from "react";
import { Route } from "react-router-dom";
import Search from "./Search";
import Shelf from "./Shelf";
import * as BooksAPI from "./utils/BooksAPI";
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
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      this.handleShelves();
    });
  }

  handleShelves() {
    const { books } = this.state;
    books.map(book =>
      this.setState({
        currentlyReading: books.filter(b => b.shelf === "currentlyReading"),
        wantToRead: books.filter(b => b.shelf === "wantToRead"),
        read: books.filter(b => b.shelf === "read")
      })
    );
  }

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
            />
          )}
        />
        <Route path="/search" render={() => <Search />} />
      </div>
    );
  }
}

export default App;
