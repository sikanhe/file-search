import React from "react";
import { uploadFile } from "../api";

export default class Uploader extends React.Component {
  state = { isUploading: false, description: "" };
  changeDescription = e =>
    this.setState({ description: e.target.value });
  handleFileUpload = e => {
    e.preventDefault();
    if (this.state.isUploading) return;
    if (this.xhr) this.xhr.abort();
    this.xhr = uploadFile(
      {
        file: this.fileInput.files[0],
        description: this.state.description
      },
      this.handleFinishUpload
    );
    this.setState({ isUploading: true });
  };
  handleFinishUpload = (error, response) => {
    if (!error) window.history.go("/");
    console.log(error);
  };
  reset = () => {
    this.xhr.abort();
    this.setState({ isUploading: false });
  };
  render() {
    const inputStyle = this.state.isUploading
      ? { opacity: 0.3 }
      : {};

    return (
      <div style={{ marginBottom: "50px" }}>
        <p>Upload New File</p>
        <form
          onSubmit={this.handleFileUpload}
          disabled={this.state.isUploading}
        >
          <input
            ref={ref => (this.fileInput = ref)}
            type="file"
            disabled={this.state.isUploading}
            style={inputStyle}
          />
          <input
            value={this.state.description}
            onChange={this.changeDescription}
            placeholder="Enter a description..."
            disabled={this.state.isUploading}
            style={inputStyle}
          />
          <button type="submit" className="button">
            Upload
          </button>
          {this.state.isUploading && <span>Uploading....</span>}
          {this.state.isUploading && (
            <span>
              (<a onClick={this.reset}>Cancel</a>)
            </span>
          )}
        </form>
      </div>
    );
  }
}
