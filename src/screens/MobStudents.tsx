import React, { useState, useEffect, ChangeEvent } from "react";
import Loader from "../components/Loader.tsx";
import { useNavigate } from "react-router-dom";
// 1. Import the MobX store instance
import store from "@/mob-store.tsx";
// 2. Import the observer HOC
import { observer } from "mobx-react-lite";
import { useTransition, animated } from "react-spring";

// 3. Wrap the component with observer()
const Students = observer(() => {
  const { students, fetchStudents } = store;

  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const delayedFetchCharacters = async () => {
    setLoading(true);
    console.log("Fetching students from MobX store...");
    // 4. Call the action directly on the store instance
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
    if (students.length === 0) {
      delayedFetchCharacters();
    }
  }, [students?.length]);

  // This computation remains local and works fine.
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
                  <p>
                    Wand: {student.wand.wood}, {student.wand.core},{" "}
                    {student.wand.length}
                  </p>
                  <p>Patronus: {student.patronus}</p>
                  <p>Actor: {student.actor}</p>
                  <button
                    onClick={() => goToCharacterDetail(student.id)}
                    className="bg-secondary-300 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    View Details
                  </button>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default Students;
