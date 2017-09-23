import React from "react";

export default class Uploader extends React.Component {
  state = { isUploading: false, description: "" };
  changeDescription = e =>
    this.setState({ description: e.target.value })
  handleFileUpload = e => {
    e.preventDefault();
    if (this.state.isUploading) return;
    if (this.xhr) this.xhr.abort();
    const file = this.fileInput.files[0];
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.open("POST", "http://localhost:3000/documents/", true);

    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.response);

      if (xhr.status < 400) {
        this.handleFinishUpload(null, response);
      } else {
        this.handleFinishUpload(response.error);
      }

      this.reset();
    });

    const formData = new window.FormData();
    formData.append("Content-Type", file.type);
    formData.append("document[file]", file);
    formData.append("document[description]", this.state.description);

    xhr.send(formData);

    this.setState({ isUploading: true });
  };

  handleFinishUpload = (error, response) => {
    if (!error) window.history.go("/");
    console.log(error);
  };

  reset = () => {
    this.xhr.abort();
    this.setState({ isUploading: false });
    this.fileInput.value = "";
  };

  render() {
    return (
      <div style={{marginBottom: '50px'}}>
        <p>Upload New File</p>
        <form onSubmit={this.handleFileUpload}>
          <input
            ref={ref => (this.fileInput = ref)}
            type="file"
            disabled={this.state.isUploading}
          />
          <input
            value={this.state.description}
            onChange={this.changeDescription}
            placeholder="Enter a description..."
          />
          {this.props.isUploading && <span>Uploading....</span>}
          {this.props.isUploading && (
            <button onClick={this.reset}> cancel </button>
          )}
          <button type="submit" className="button">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
