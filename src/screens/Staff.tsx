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
        <div className="p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl bg-secondary-200 text-primary-300 px-2 py-3 font-bold text-center mb-4">
            Hogwarts Staff
          </h1>
          <input
            type="text"
            placeholder="Search staff"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff && filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember: Character) => (
              <div
                key={staffMember.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => goToCharacterDetail(staffMember.id)}
              >
                <div className="relative h-64 bg-gradient-to-b from-gray-100 to-gray-200">
                <img
                  src={staffMember.image || '/placeholder-avatar.png'}
                  alt={staffMember.name}
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {staffMember.name}
                </h2>
                <div className="space-y-2 text-sm text-gray-600">
                  {staffMember.house && (
                  <p className="flex items-center">
                    <span className="font-semibold w-20">House:</span>
                    <span className="text-secondary-300">{staffMember.house}</span>
                  </p>
                  )}
                  <p className="flex items-center">
                  <span className="font-semibold w-20">Role:</span>
                  <span>{staffMember.actor || 'Staff Member'}</span>
                  </p>
                  {staffMember.patronus && (
                  <p className="flex items-center">
                    <span className="font-semibold w-20">Patronus:</span>
                    <span>{staffMember.patronus}</span>
                  </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  goToCharacterDetail(staffMember.id);
                  }}
                  className="w-full mt-4 bg-secondary-300 hover:bg-secondary-400 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  View Full Profile
                </button>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center">
              <p className="text-gray-500 text-lg">No staff members found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
              </div>
            )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
