import React from "react";

export default class SearchForm extends React.Component {
  state = { query: "" }
  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };
  submit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.query)
  }
  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          placeholder="Search by file names, description, and etc.."
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <button
          className="button"
          type="submit"
        >
          Search
        </button>
        <a className="showAllLink" href="/">
          Show All files
        </a>
      </form>
    );
  }
}
