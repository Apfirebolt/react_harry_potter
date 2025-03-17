import React, { useState, useEffect, ChangeEvent } from "react";
import useStore from "@/store.tsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import Character from "../types/Character.tsx";

const Houses = () => {
  const { students, fetchHouseStudents, resetStudents } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHouse, setSelectedHouse] = useState<string>("Ravenclaw");

  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const navigate = useNavigate();

  // Fetch characters from the API based on the selected house
  const fetchCharacters = async (house: string) => {
    setLoading(true);
    await fetchHouseStudents(house);
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

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  };

  useEffect(() => {
    if (selectedHouse) {
      fetchCharacters(selectedHouse);
    }
  }, [selectedHouse]);

  useEffect(() => {
    return () => {
      // console.log("unmount");
      resetStudents();
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
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
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student: Character) => (
                <div
                  key={student.id}
                  className="p-4 border border-gray-300 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-32 h-32 my-3 rounded-full"
                    />
                    <p className="font-bold">{student.name}</p>
                    <p>Species: {student.species}</p>
                    <p>Gender: {student.gender}</p>
                    <p>House: {student.house}</p>
                    <p>Date of Birth: {student.dateOfBirth}</p>
                    <p>Ancestry: {student.ancestry}</p>
                    <p>Eye Colour: {student.eyeColour}</p>
                    <p>Hair Colour: {student.hairColour}</p>
                    {student.wand && (
                      <p>
                        Wand: {student.wand.wood}, {student.wand.core},{" "}
                        {student.wand.length}
                      </p>
                    )}
                    <p>Patronus: {student.patronus}</p>
                    <p>Actor: {student.actor}</p>
                    <button
                      onClick={() => goToCharacterDetail(student.id)}
                      className="bg-secondary-300 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      View Details
                    </button>
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
