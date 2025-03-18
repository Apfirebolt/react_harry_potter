import React, { useEffect, useState } from "react";
import useStore from "@/store.tsx";
import Loader from "../components/Loader.tsx";
import Spell from "@/types/Spell.tsx";


const Spells: React.FC = () => {
  const { spells, fetchSpells } = useStore();
  const [loading, setLoading] = useState<boolean>(false);


  const fetchData = async () => {
    setLoading(true);
    await fetchSpells();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl bg-secondary-200 text-primary-300 px-2 py-3 font-bold text-center mb-4">
            Spells
          </h1>
          <div className="mx-auto container my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spells.map((spell : Spell) => (
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
