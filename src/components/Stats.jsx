import { useShopping } from "../hooks/useShopping";

function Stats() {
  const { totalCount, boughtCount, notBoughtCount } = useShopping();

  return (
    <div className="stats">
      <div className="stat-box">
        <span className="stat-number">{totalCount}</span>
        <span className="stat-label">Усього</span>
      </div>

      <div className="stat-box">
        <span className="stat-number">{boughtCount}</span>
        <span className="stat-label">Куплено</span>
      </div>

      <div className="stat-box">
        <span className="stat-number">{notBoughtCount}</span>
        <span className="stat-label">Не куплено</span>
      </div>
    </div>
  );
}

export default Stats;