import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader.tsx";

interface Spell {
  id: string;
  name: string;
  description: string;
}

const Spells: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hp-api.onrender.com/api/spells`
      );
      if (response) {
        setLoading(false);
        setSpells(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Spells</h1>
          <div className="mx-auto container my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spells.map((spell) => (
              <div
                key={spell.id}
                className="bg-secondary-300 text-primary-300 p-4 rounded-lg shadow-lg"
              >
                <p className="my-2 text-xl">{spell.name}</p>
                <p className="my-1">Description: {spell.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Spells;
