import { useEffect, useState } from "react";
import { getDocuments } from "../services/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getDocuments().then((res) => {
      const data = {};
      res.data.forEach((doc) => {
        data[doc.category] = (data[doc.category] || 0) + 1;
      });
      setCategories(data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Categories</h1>

      {Object.keys(categories).map((cat) => (
        <div key={cat}>
          {cat} - {categories[cat]}
        </div>
      ))}
    </div>
  );
}