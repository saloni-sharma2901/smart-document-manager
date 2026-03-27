import { FaEye, FaDownload, FaTrash, FaSync } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import {
  getDocs,
  deleteDoc,
  toggleStatus,
  searchDoc
} from "../services/api";
import Navbar from "../components/Navbar";

function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDocs = async () => {
    const res = await getDocs();
    setDocs(res.data);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

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

  const total = docs.length;
  const verified = docs.filter(d => d.status === "Verified").length;
  const pending = docs.filter(d => d.status === "Pending").length;

  return (
    <div>
      <Navbar />

      {/* STATS */}
      <div className="stats">
        <div><h1>{total}</h1><p>Total Documents</p></div>
        <div><h1>{verified}</h1><p>Verified Files</p></div>
        <div><h1>{pending}</h1><p>Pending Review</p></div>
      </div>

      {/* SEARCH */}
      <div className="search-row">
        <input
          placeholder="Search documents..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* DOCUMENT LIST */}
      <div className="grid">
        {docs.map((doc) => (
          <div className="card" key={doc._id}>
            <h3>{doc.title}</h3>
            <p>Category: {doc.category}</p>
            <p className={doc.status}>{doc.status}</p>

            {/* Buttons */}
            <div className="btn-group">
  <a href={`http://localhost:5000/uploads/${doc.file}`} target="_blank">
    <button>
      <FaEye /> Preview
    </button>
  </a>

  <a href={`http://localhost:5000/uploads/${doc.file}`} download>
    <button>
      <FaDownload /> Download
    </button>
  </a>

  <button onClick={() => toggleStatus(doc._id).then(fetchDocs)}>
    <FaSync /> Toggle
  </button>

  <button onClick={() => deleteDoc(doc._id).then(fetchDocs)}>
    <FaTrash /> Delete
  </button>
</div>
            </div>
          
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;