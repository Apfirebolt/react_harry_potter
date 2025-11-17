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
  };

  const goToCharacterDetail = (id: string) => {
    navigate(`/character/${id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollWindow);
    return () => window.removeEventListener("scroll", onScrollWindow);
  }, [characters]);

  return (
    <div className="min-h-screen bg-primary-300 container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl bg-secondary-200 text-primary-300 px-2 py-3 font-bold text-center mb-4">
            Harry Potter
          </h1>
          <input
            type="text"
            placeholder="Search character"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters && filteredCharacters.length > 0 ? (
              filteredCharacters.slice(0, visibleCount).map((character) => (
                <div
                  key={character.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => goToCharacterDetail(character.id)}
                >
                  <div className="relative h-64 bg-gray-200">
                    <img
                      src={character.image || "/placeholder.png"}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {character.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {character.house && (
                        <p className="font-semibold text-primary-500">
                          {character.house}
                        </p>
                      )}
                      {character.actor && (
                        <p className="italic">Played by {character.actor}</p>
                      )}
                      {character.species && (
                        <p>Species: {character.species}</p>
                      )}
                      {character.dateOfBirth && (
                        <p>Born: {character.dateOfBirth}</p>
                      )}
                      {character.patronus && (
                        <p>Patronus: {character.patronus}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-gray-500">
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
