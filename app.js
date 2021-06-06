const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg") {
      cb(new Error("file type not allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/json-data", (req, res) => {
  console.log("JSON");
  console.log(req.body);
  res.status(200).json(req.body);
});
app.post("/form-data", (req, res) => {
  console.log("FORM");
  console.log(req.body);
  res.status(200).json(req.body);
});
app.post(
  "/file-data",
  upload.fields([
    { name: "dp", maxCount: 2 },
    { name: "sign", maxCount: 3 },
  ]),
  (req, res) => {
    console.log("FILE");
    console.log(req.body);
    res.status(200).json(req.body);
  }
);

app.use(express.static(__dirname + "/static"));

app.listen(3200, () => {
  console.log("Server listning on post 3200");
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(500).json({ message: "File Uploading Error:" + err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
});
