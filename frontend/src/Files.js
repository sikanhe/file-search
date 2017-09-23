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
              {files
                .sort((a, b) => a.created_at < b.created_at)
                .map(
                  ({ id, filename, description, content_type, created_at }) => (
                    <tr key={id}>
                      <td>{filename}</td>
                      <td>{description || "N/A"}</td>
                      <td>{content_type}</td>
                      <td>{this.renderTime(created_at)}</td>
                      <td>
                        <a href={`http://localhost:3000/documents/${id}`}>
                          Download
                        </a>
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
