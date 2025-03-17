import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import useStore from "@/store.tsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";

const Home = () => {
  const { characters, fetchCharacters } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(25);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Fetch characters from the API
  const fetchData = async () => {
    setLoading(true);
    await fetchCharacters();
    setLoading(false);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Call the delayedFetchCharacters function when user types in the input field
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Load more characters when user scrolls to the bottom of the page
  const onScrollWindow = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      characters.length
    ) {
      setVisibleCount((prevCount) => prevCount + 25);
    } 
    // if we reach top of the page, reset the visibleCount to 25
    if (window.scrollY === 0) {
      setVisibleCount(25);
    }
  }

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScrollWindow);
    return () => window.removeEventListener("scroll", onScrollWindow);
  }, [characters]);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Harry Potter Characters
          </h1>
          <input
            type="text"
            placeholder="Search character"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCharacters && filteredCharacters.length > 0 ? (
              filteredCharacters.slice(0, visibleCount).map((character) => (
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
                    <button onClick={() => goToCharacterDetail(character.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No characters found
              </div>
            )}
          </div>
          <div ref={loaderRef} className="h-10"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
