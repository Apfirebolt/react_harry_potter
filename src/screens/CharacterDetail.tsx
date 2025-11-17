import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import useStore from "@/store.tsx";

const CharacterDetail = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { character, fetchCharacterById } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchCharacterById(characterId).then(() => setLoading(false));
  }, [characterId]);
  return (
    <div className="min-h-screen bg-primary-100 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        character && (
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
            <h1 className="text-3xl bg-gradient-to-r from-secondary-200 to-secondary-300 text-primary-300 px-4 py-4 font-bold text-center mb-6 rounded-xl shadow-md">
              {character.name}
            </h1>
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-40 h-40 rounded-full shadow-xl ring-4 ring-secondary-200 object-cover"
                />
              </div>
              <div className="w-full space-y-3">
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <p className="font-bold text-lg text-gray-800">
                    {character.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Species</p>
                    <p className="font-semibold">{character.species}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold">{character.gender}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">House</p>
                    <p className="font-semibold">{character.house}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold">{character.dateOfBirth}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Ancestry</p>
                    <p className="font-semibold">{character.ancestry}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Eye Colour</p>
                    <p className="font-semibold">{character.eyeColour}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Hair Colour</p>
                    <p className="font-semibold">{character.hairColour}</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">Patronus</p>
                    <p className="font-semibold">{character.patronus}</p>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <p className="text-sm text-gray-600">Portrayed by</p>
                  <p className="font-semibold text-lg">{character.actor}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CharacterDetail;
