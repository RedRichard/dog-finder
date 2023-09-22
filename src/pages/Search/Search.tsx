import React, { useEffect, useState } from "react";

const Search = () => {
  const [dogBreeds, setDogBreeds] = useState<Array<string>>();
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const res = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setDogBreeds(data);
        } else throw new Error(`Couldn't get dog breeds`);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
        else console.log("An error has occurred");
      }
    };

    getBreeds();
  }, []);

  return (
    <div>
      <label htmlFor="dog-breeds">
        <select
          id="dog-breeds"
          name="dog-breeds"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          {dogBreeds &&
            dogBreeds.map((dogBreed, index) => (
              <option key={index} value={dogBreed}>
                {dogBreed}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Search;
