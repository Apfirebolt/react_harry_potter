import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Loader from "../components/Loader.tsx";
import Character from "../types/Character.tsx";

const Houses = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHouse, setSelectedHouse] = useState<string>("Ravenclaw");

  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

  // Fetch characters from the API based on the selected house
  const fetchCharacters = async (house: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Character[]>(
        `https://hp-api.onrender.com/api/characters/house/${house}`
      );
      const filteredData = data.filter((character) =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCharacters(filteredData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Handle house tab click
  const handleHouseClick = (house: string) => {
    setSelectedHouse(house);
    fetchCharacters(house);
  };

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (selectedHouse) {
      fetchCharacters(selectedHouse);
    }
  }, [searchText, selectedHouse]);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Hogwarts Houses
          </h1>
          <div className="flex justify-center mb-4">
            {houses.map((house) => (
              <button
                key={house}
                className={`px-4 py-2 mx-2 rounded-lg ${
                  selectedHouse === house
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleHouseClick(house)}
              >
                {house}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search member"
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
                No members found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Houses;
