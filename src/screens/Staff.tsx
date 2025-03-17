import React, { useState, Fragment, useEffect, ChangeEvent } from "react";
import useStore from "@/store.tsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import Character from "@/types/Character.tsx";

const Staff = () => {
  const { staff, fetchStaff } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch staff from the API
  const fetchStaffMembers = async () => {
    setLoading(true);
    await fetchStaff();
    setLoading(false);
  };
  
  // Call the fetchStaffMembers function when user types in the input field
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredStaff = staff.filter((staffMember) =>
    staffMember.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  }

  useEffect(() => {
    fetchStaffMembers();
  }, []);

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
            {filteredStaff && filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember: Character) => (
                <div
                  key={staffMember.id}
                  className="p-4 border border-gray-300 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={staffMember.image}
                      alt={staffMember.name}
                      className="w-32 h-32 my-3 rounded-full"
                    />
                    <p className="font-bold">{staffMember.name}</p>
                    <p>Species: {staffMember.species}</p>
                    <p>Gender: {staffMember.gender}</p>
                    <p>House: {staffMember.house}</p>
                    <p>Date of Birth: {staffMember.dateOfBirth}</p>
                    <p>Ancestry: {staffMember.ancestry}</p>
                    <p>Eye Colour: {staffMember.eyeColour}</p>
                    <p>Hair Colour: {staffMember.hairColour}</p>
                    <p>
                      Wand: {staffMember.wand.wood}, {staffMember.wand.core},{" "}
                      {staffMember.wand.length}
                    </p>
                    <p>Patronus: {staffMember.patronus}</p>
                    <p>Actor: {staffMember.actor}</p>
                    <button
                      onClick={() => goToCharacterDetail(staffMember.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      View Details
                    </button>
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
