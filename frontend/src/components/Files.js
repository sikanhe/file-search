import React from "react";

export default class Files extends React.Component {
  render() {
    const { files, query } = this.props;
    return (
      <div>
        <p>{
          query === ""
          ? "All files"
          : "Search results for: " + query
        }</p>

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
              {renderFiles(files)}
            </tbody>
          </table>
        ) : (
          <div> No result found </div>
        )}
      </div>
    );
  }
}

const renderFiles = files =>
  files.sort((a, b) => a.created_at < b.created_at).map(renderFileRow);

const renderFileRow = ({
  id,
  filename,
  description,
  content_type,
  created_at
}) => (
  <tr key={id}>
    <td>{filename}</td>
    <td>{description || "N/A"}</td>
    <td>{content_type}</td>
    <td>{renderTime(created_at)}</td>
    <td>
      <a href={`http://localhost:3000/documents/${id}`}>Download</a>
    </td>
  </tr>
);

const renderTime = timestamp =>
  new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
