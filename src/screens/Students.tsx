import React, { useState, Fragment, useEffect, ChangeEvent } from "react";
import Loader from "../components/Loader.tsx";
import { useNavigate } from "react-router-dom";
import useStore from "@/store.tsx";


const Students = () => {
  const { students, fetchStudents } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch characters from the API
  const delayedFetchCharacters = async () => {
    setLoading(true);
    await fetchStudents();
    setLoading(false);
  };

  // Call the delayedFetchCharacters function when user types in the input field
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  }

  useEffect(() => {
    delayedFetchCharacters();
  }, []);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Hogwarts Students
          </h1>
          <input
            type="text"
            placeholder="Search student"
            className="w-full p-2 border border-primary-200 rounded-lg mb-4"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students && students.length > 0 ? (
              students.map((character) => (
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
                    <button
                      onClick={() => goToCharacterDetail(character.id)}
                      className="bg-secondary-300 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No students found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
