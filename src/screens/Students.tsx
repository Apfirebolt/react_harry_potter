import React, { useState, useEffect, ChangeEvent } from "react";
import Loader from "../components/Loader.tsx";
import { useNavigate } from "react-router-dom";
import useStore from "@/store.tsx";
import { useTransition, animated } from "react-spring";

const Students = () => {
  const { students, fetchStudents } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const delayedFetchCharacters = async () => {
    setLoading(true);
    await fetchStudents();
    setLoading(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  };

  useEffect(() => {
    delayedFetchCharacters();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const transitions = useTransition(filteredStudents, {
    from: { opacity: 0, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
    keys: (student) => student.id,
    config: { duration: 200 },
  });

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl bg-secondary-200 text-primary-300 px-2 py-3 font-bold text-center mb-4">
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
            {transitions((style, student) => (
              <animated.div
                key={student.id}
                style={{ ...style }}
                className="p-4 border border-gray-300 rounded-lg"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-200 via-secondary-300 to-secondary-200"></div>

                  <div className="relative mt-6 mb-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-secondary-200 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-secondary-300 text-white text-xs px-3 py-1 rounded-full shadow-md">
                      {student.house || "Unknown"}
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {student.name}
                  </h3>

                  <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between px-4 py-1 bg-gray-50 rounded">
                      <span className="text-gray-600">Species:</span>
                      <span className="font-medium">{student.species}</span>
                    </div>
                    <div className="flex justify-between px-4 py-1">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{student.gender}</span>
                    </div>
                    <div className="flex justify-between px-4 py-1 bg-gray-50 rounded">
                      <span className="text-gray-600">Ancestry:</span>
                      <span className="font-medium">
                        {student.ancestry || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 py-1">
                      <span className="text-gray-600">Born:</span>
                      <span className="font-medium">
                        {student.dateOfBirth || "Unknown"}
                      </span>
                    </div>
                    {student.patronus && (
                      <div className="flex justify-between px-4 py-1 bg-gray-50 rounded">
                        <span className="text-gray-600">Patronus:</span>
                        <span className="font-medium capitalize">
                          {student.patronus}
                        </span>
                      </div>
                    )}
                    {student.actor && (
                      <div className="flex justify-between px-4 py-1">
                        <span className="text-gray-600">Actor:</span>
                        <span className="font-medium">{student.actor}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => goToCharacterDetail(student.id)}
                    className="w-full mt-4 bg-gradient-to-r from-secondary-300 to-secondary-200 hover:from-secondary-200 hover:to-secondary-300 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Full Details →
                  </button>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
