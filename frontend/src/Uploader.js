import React from "react";

export default class Uploader extends React.Component {
  state = { isUploading: false };
  handleFileUpload = e => {
    if (this.xhr) this.xhr.abort();
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.open("POST", "/files/", true);

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
    formData.append("file", file);

    xhr.send(formData);

    this.setState({ isUploading: true });
  };

  handleFinishUpload = (error, response) => {
    window.history.go("/");
  };

  reset = () => {
    this.xhr.abort();
    this.setState({ isUploading: false });
    this.fileInput.value = "";
  };

  render() {
    return (
      <div>
        <p>Upload New File</p>
        <input
          ref={ref => (this.fileInput = ref)}
          type="file"
          onChange={this.handleFileUpload}
          disabled={this.state.isUploading}
        />
        {this.props.isUploading && <span>Uploading....</span>}
        {this.props.isUploading && (
          <button onClick={this.reset}> cancel </button>
        )}
      </div>
    );
  }
}
