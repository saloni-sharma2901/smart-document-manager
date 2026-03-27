const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const {
  uploadDoc,
  getDocs,
  deleteDoc,
  toggleStatus,
  searchDoc
} = require("../controllers/documentController");

router.post("/", upload.single("file"), uploadDoc);
router.get("/", getDocs);
router.delete("/:id", deleteDoc);
router.put("/:id", toggleStatus);
router.get("/search/:key", searchDoc);

module.exports = router;