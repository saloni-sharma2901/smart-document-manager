import React, { useEffect, useState } from "react";
import { getDocs, uploadDoc, searchDoc } from "../services/api";
import Navbar from "../components/Navbar";

function UploadPage() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const fetchDocs = async () => {
    const res = await getDocs();
    setDocs(res.data);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // 🔍 Search
  const handleSearch = async (e) => {
    const key = e.target.value;
    setSearch(key);

    if (key) {
      const res = await searchDoc(key);
      setDocs(res.data);
    } else {
      fetchDocs();
    }
  };

  // 📤 Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    fd.append("file", file);

    await uploadDoc(fd);

    setTitle("");
    setCategory("");
    setFile(null);

    fetchDocs();
  };

  const total = docs.length;
  const verified = docs.filter(d => d.status === "Verified").length;
  const pending = docs.filter(d => d.status === "Pending").length;

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="hero">
        <h1>Manage Your Documents Smartly</h1>
        <p>
          Upload, organize, search and track important files in one secure place.
        </p>
      </div>

      {/* STATS */}
      <div className="stats">
        <div><h1>{total}</h1><p>Total Documents</p></div>
        <div><h1>{verified}</h1><p>Verified Files</p></div>
        <div><h1>{pending}</h1><p>Pending Review</p></div>
        <div><h1>3</h1><p>Categories</p></div>
      </div>

      {/* SEARCH */}
      <div className="search-row">
        <input
          placeholder="Search by file name..."
          value={search}
          onChange={handleSearch}
        />

        
        
      </div>

      {/* MAIN GRID */}
      <div className="grid">

        {/* LEFT - Upload (ONLY ONE FORM ✅) */}
        <div className="card">
          <h2>Upload New Document</h2>
          <p>Select a file and upload it to your document system.</p>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              <option>Identity</option>
              <option>Education</option>
              <option>Finance</option>
            </select>

            <button className="upload-btn">Upload File</button>
          </form>
        </div>

        {/* RIGHT - Recent */}
        <div className="card">
          <h2>Recent Documents</h2>

          {docs.length === 0 ? (
            <p>No documents uploaded yet.</p>
          ) : (
            docs.slice(0, 3).map((doc) => (
              <div key={doc._id} className="recent-item">
                <h4>{doc.title}</h4>
                <p>Category: {doc.category}</p>
                <small>
                  Uploaded on: {new Date(doc.date).toLocaleDateString()}
                </small>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default UploadPage;