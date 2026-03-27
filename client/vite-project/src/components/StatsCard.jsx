function StatsCard({ docs }) {
  const total = docs.length;
  const verified = docs.filter(d => d.status === "Verified").length;
  const pending = docs.filter(d => d.status === "Pending").length;

  return (
    <div className="stats">
      <div className="stat-box">
        <h2>{total}</h2>
        <p>Total Documents</p>
      </div>

      <div className="stat-box">
        <h2>{verified}</h2>
        <p>Verified Files</p>
      </div>

      <div className="stat-box">
        <h2>{pending}</h2>
        <p>Pending Review</p>
      </div>
    </div>
  );
}

export default StatsCard;