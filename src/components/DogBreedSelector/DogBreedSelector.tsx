import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";

interface IDogBreedSelector {
  selectedBreed: string;
  handleSelectedBreed: (breed: string) => void;
}

const DogBreedSelector = ({
  selectedBreed,
  handleSelectedBreed,
}: IDogBreedSelector) => {
  const [dogBreeds, setDogBreeds] = useState<Array<string>>();

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const res = await fetchData<Array<string>>({
          endpoint: "/dogs/breeds",
        });
        const breeds = await res.json();
        setDogBreeds(breeds);
      } catch (e) {
        console.error("An error has occurred", e);
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
          onChange={(e) => handleSelectedBreed(e.target.value)}
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

export default DogBreedSelector;
