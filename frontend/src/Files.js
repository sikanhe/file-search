import React from "react";
import mockFiles from "./mockFiles";

export default class Files extends React.Component {
  renderTime = timestamp =>
    new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  render() {
    const { files, query } = this.props;
    return (
      <div>
        <p>
          {query === "" ? (
            "All files"
          ) : (
            "Search results for: " + this.props.query
          )}
        </p>

        {files.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Filetype</th>
                <th>Uploaded at</th>
                <th>Link</th>
              </tr>
              {files.map(
                ({ id, name, description, url, filetype, uploadedAt }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{filetype}</td>
                    <td>{this.renderTime(uploadedAt)}</td>
                    <td>
                      <a href={url}>Download</a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <div> No result found </div>
        )}
      </div>
    );
  }
}
