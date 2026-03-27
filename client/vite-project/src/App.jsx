import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import DocumentsPage from "./pages/DocumentsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">  {/* 👈 YAHAN ADD KIYA */}
        
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/docs" element={<DocumentsPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;