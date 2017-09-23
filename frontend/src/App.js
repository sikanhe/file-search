import React from "react";
import Files from "./components/Files";
import SearchForm from "./components/SearchForm";
import Uploader from "./components/Uploader";
import { listFiles, searchFiles } from "./api";
import "./App.css";

class App extends React.Component {
  state = {
    lastQuery: "",
    files: []
  };
  componentWillMount() {
    listFiles().then(files => this.setState({ files }));
  }
  search = query => {
    const { isSearching, lastQuery } = this.state;
    if (isSearching || query === lastQuery) return;
    this.setState({ isSearching: true }, () => {
      searchFiles(query)
        .then(files =>
          this.setState({
            files,
            isSearching: false,
            lastQuery: query
          })
        )
        .catch(err =>
          this.setState({
            files: [],
            isSearching: false,
            lastQuery: query
          })
        );
    });
  };
  render() {
    return (
      <div className="App">
        <h1 className="title">My Files</h1>
        <Uploader />
        <SearchForm onSubmit={this.search} />
        <Files files={this.state.files} query={this.state.lastQuery} />
      </div>
    );
  }
}

export default App;
