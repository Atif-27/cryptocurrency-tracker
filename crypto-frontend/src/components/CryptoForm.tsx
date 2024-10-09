// components/CryptoForm.tsx
"use client";
import React, { useState } from "react";
import CryptoStats from "./CryptoStats";
import StandardDeviation from "./StandardDeviation";
interface CryptoStatsProps {
  price: number;
  marketCap: number;
  change24h: number;
}
const CryptoForm: React.FC = () => {
  const [coin, setCoin] = useState("bitcoin");
  const [data, setData] = useState<React.ReactNode | null>(null);
  const [deviation, setDeviation] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Fetch crypto stats
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats?coin=${coin}`
      );
      if (!response.ok) throw new Error("Failed to fetch stats data");
      const result = await response.json();

      // Rename the 24hChange property to change24h
      const modifiedResult = {
        ...result,
        change24h: result["24hChange"],
      };

      setData(modifiedResult);

      // Fetch standard deviation
      const deviationResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deviation?coin=${coin}`
      );
      if (!deviationResponse.ok)
        throw new Error("Failed to fetch deviation data");
      const deviationResult = await deviationResponse.json();

      setDeviation(deviationResult.deviation);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="bottom-10">
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="border p-2 rounded mr-2 text-black"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="matic-network">Matic Network</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Get Stats
        </button>
      </form>
      <div className="my-10">
        {error && <p className="text-red-500">{error}</p>}
        {data && <CryptoStats {...(data as unknown as CryptoStatsProps)} />}
        {deviation !== null && <StandardDeviation deviation={deviation} />}{" "}
      </div>
    </div>
  );
};

export default CryptoForm;
