const HOST = "http://localhost:3000"

export function listFiles() {
  const url = HOST + "/documents"
  return fetch(url).then(res => res.json())
}

export function searchFiles(query) {
  const url = HOST + "/documents?search=" + query
  return fetch(url).then(res => res.json())
}

export function uploadFile({file, description}, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", HOST + "/documents", true);

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);

    if (xhr.status < 400) {
      cb(null, response);
    } else {
      cb(response.error);
    }
  });

  const formData = new window.FormData();
  formData.append("Content-Type", file.type);
  formData.append("document[file]", file);
  formData.append("document[description]", description);

  xhr.send(formData);
  return xhr
}