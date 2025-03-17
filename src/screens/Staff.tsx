import React, { useState, Fragment, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Loader from "../components/Loader.tsx";

interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  actor: string;
  image: string;
  alive: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  alternate_names: string[];
  alternate_actors: string[];
  yearOfBirth: number;
}

const Staff = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch characters from the API
  const fetchCharacters = async (searchText: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Character[]>(
        `https://hp-api.onrender.com/api/characters/staff`
      );
      const filteredData = data.filter(
        (character) =>
          character.hogwartsStaff &&
          character.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCharacters(filteredData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Call the delayedFetchCharacters function when user types in the input field
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchCharacters(searchText);
  }, [searchText]);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Hogwarts Staff
          </h1>
          <input
            type="text"
            placeholder="Search staff"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters && characters.length > 0 ? (
              characters.map((character) => (
                <div
                  key={character.id}
                  className="p-4 border border-gray-300 rounded-lg"
                >
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
                    <p>
                      Wand: {character.wand.wood}, {character.wand.core},{" "}
                      {character.wand.length}
                    </p>
                    <p>Patronus: {character.patronus}</p>
                    <p>Actor: {character.actor}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No staff found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
