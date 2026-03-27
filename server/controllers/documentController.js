const Document = require("../models/Document");

// Upload
exports.uploadDoc = async (req, res) => {
  try {
    const doc = new Document({
      title: req.body.title,
      category: req.body.category,
      file: req.file.filename
    });

    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all
exports.getDocs = async (req, res) => {
  const docs = await Document.find().sort({ date: -1 });
  res.json(docs);
};

// Delete
exports.deleteDoc = async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// Toggle Status
exports.toggleStatus = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  doc.status = doc.status === "Pending" ? "Verified" : "Pending";
  await doc.save();
  res.json(doc);
};

// Search
exports.searchDoc = async (req, res) => {
  const result = await Document.find({
    title: { $regex: req.params.key, $options: "i" }
  });
  res.json(result);
};