import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import useStore from "@/store.tsx";

const CharacterDetail = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { character, fetchCharacterById } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  console.log('CharacterDetail characterId:', character);

  useEffect(() => {
    setLoading(true);
    fetchCharacterById(characterId).then(() => setLoading(false));
  }, [characterId]);
  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        character && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {character.name}
            </h1>
            <div className="flex flex-col items-center">
              <img
                src={character.image}
                alt={character.name}
                className="w-32 h-32 my-3 rounded-full"
              />
              <p className="font-bold">{character.name}</p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <p>House: {character.house}</p>
              <p>Date of Birth: {character.dateOfBirth}</p>
              <p>Ancestry: {character.ancestry}</p>
              <p>Eye Colour: {character.eyeColour}</p>
              <p>Hair Colour: {character.hairColour}</p>
              <p>Patronus: {character.patronus}</p>
              <p>Actor: {character.actor}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CharacterDetail;
