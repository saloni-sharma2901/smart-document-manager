import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Smart Document Manager</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/docs">Documents</Link>
        <Link to="#">Categories</Link>
      </div>
    </div>
  );
}

export default Navbar;