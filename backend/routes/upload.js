const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("pdf"), (req, res) => {
  console.log("UPLOAD REQUEST RECEIVED");
  console.log(req.file);

  res.json({
    message: "PDF uploaded successfully!",
    file: req.file.filename,
  });
});

module.exports = router;