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
          <div className="mx-auto container my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {spells.map((spell: Spell) => (
              <div
                key={spell.id}
                className="bg-secondary-300 text-primary-300 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-secondary-200"
              >
                <h3 className="my-2 text-2xl font-semibold border-b border-primary-300 pb-2">
                  {spell.name}
                </h3>
                <p className="my-3 text-sm leading-relaxed opacity-90">
                  {spell.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Spells;
