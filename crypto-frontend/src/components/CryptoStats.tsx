// components/CryptoStats.tsx
import React from "react";

interface CryptoStatsProps {
  price: number;
  marketCap: number;
  change24h: number;
}

const CryptoStats: React.FC<CryptoStatsProps> = ({
  price,
  marketCap,
  change24h,
}) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">Crypto Stats</h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Market Cap: ${marketCap.toLocaleString()}</p>
      <p>24h Change: {change24h.toFixed(2)}%</p>
    </div>
  );
};

export default CryptoStats;
