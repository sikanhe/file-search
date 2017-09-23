import React from "react";
import Files from "./Files";
import Uploader from './Uploader'
import "./App.css";
import mockFiles from "./mockFiles";

class App extends React.Component {
  state = {
    query: "",
    lastQuery: "",
    files: mockFiles
  };
  componentWillMount() {
    fetch("http://localhost:3000/documents")
      .then(res => res.json())
      .then(files =>
        this.setState({ files, lastQuery: "" })
      )
  }
  changeInput = e => {
    this.setState({ query: e.target.value });
  };
  search = e => {
    e.preventDefault();
    const { isSearching, query, lastQuery } = this.state;
    if (isSearching || query === lastQuery) return;
    this.setState({ isSearching: true }, () => {
      fetch("http://localhost:3000/documents?search=" + query)
        .then(res => res.json())
        .then(files =>
          this.setState({ files, isSearching: false, lastQuery: query })
        )
        .catch(err =>
          this.setState({ files: [], isSearching: false, lastQuery: query })
        );
    });
  };
  render() {
    return (
      <div className="App">
        <h1 className="title">My Files</h1>
        <Uploader />
        <form onSubmit={this.search}>
          <input
            placeholder="Search by file names, description, and etc.."
            value={this.state.input}
            onChange={this.changeInput}
          />
          <button
            className="button"
            type="submit"
            disabled={this.state.isSearching}
          >
            Search
          </button>
          <a className="showAllLink" href="/">
            Show All files
          </a>
        </form>
        <Files files={this.state.files} query={this.state.lastQuery} />
      </div>
    );
  }
}

export default App;
