import React from "react";

interface StandardDeviationProps {
  deviation: number;
}

const StandardDeviation: React.FC<StandardDeviationProps> = ({ deviation }) => {
  console.log(deviation);

  return (
    <div className="p-4 border rounded shadow-md mt-4">
      <h2 className="text-lg font-bold">Standard Deviation</h2>
      <p>Standard Deviation: {deviation}</p>
    </div>
  );
};

export default StandardDeviation;
