const formRef = document.querySelector("form");
const jsonButtonRef = document.querySelector("#jsonData");
const formButtonRef = document.querySelector("#formData");
const fileButtonRef = document.querySelector("#fileData");

let submissionType = "JSON";
let setSubmissionToJSON = (event) => {
  submissionType = "JSON";
};
let setSubmissionToFORM = (event) => {
  submissionType = "FORM";
};
let setSubmissionToFILE = (event) => {
  submissionType = "FILE";
};

const uploadData = (event) => {
  console.log(submissionType);
  event.preventDefault();
  if (submissionType === "JSON") {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3200/json-data", {
      method: "post",
      body: `{"fullName":"${event?.target[0]?.value}"}`,
      headers: headers,
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  if (submissionType === "FORM") {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    fetch("http://localhost:3200/form-data", {
      method: "post",
      body: "fullName=" + event?.target[0]?.value,
      headers: headers,
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  if (submissionType === "FILE") {
    let dpFiles = event?.target[1]?.files;
    let signFiles = event?.target[2]?.files;
    let formData = new FormData();
    formData.append("fullName", event?.target[0]?.value);
    for (let i = 0; i < dpFiles.length; i++) {
      formData.append("dp", dpFiles[i]);
    }
    for (let i = 0; i < signFiles.length; i++) {
      formData.append("sign", signFiles[i]);
    }
    // let headers = new Headers();
    // headers.append("Content-Type", "multipart/form-data");
    fetch("http://localhost:3200/file-data", {
      method: "post",
      body: formData,
      // headers: headers,
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
};

jsonButtonRef.addEventListener("click", setSubmissionToJSON);
formButtonRef.addEventListener("click", setSubmissionToFORM);
fileButtonRef.addEventListener("click", setSubmissionToFILE);
formRef.addEventListener("submit", uploadData);
