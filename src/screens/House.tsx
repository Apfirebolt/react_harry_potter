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
          <h1 className="text-2xl bg-secondary-200 text-primary-300 px-2 py-3 font-bold text-center mb-4">
            Hogwarts House Members
          </h1>
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {houses.map((house) => (
              <button
                key={house}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
                  selectedHouse === house
                    ? "bg-secondary-200 text-primary-300 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student: Character) => (
                <div
                  key={student.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={student.image || "https://via.placeholder.com/150"}
                        alt={student.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-secondary-200 shadow-md"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {student.name}
                    </h3>
                    <div className="w-full space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span className="font-semibold">Species:</span>
                        <span>{student.species || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Gender:</span>
                        <span>{student.gender || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">House:</span>
                        <span className="text-secondary-200 font-medium">
                          {student.house}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Ancestry:</span>
                        <span>{student.ancestry || "Unknown"}</span>
                      </div>
                      {student.patronus && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Patronus:</span>
                          <span>{student.patronus}</span>
                        </div>
                      )}
                      {student.actor && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Actor:</span>
                          <span className="text-right">{student.actor}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => goToCharacterDetail(student.id)}
                      className="bg-secondary-200 hover:bg-secondary-300 text-white px-6 py-2 rounded-lg mt-4 font-semibold transition-colors duration-200 w-full"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow">
                <p className="text-lg">No members found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Houses;
