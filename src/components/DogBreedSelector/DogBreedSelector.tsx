import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import searchFiltersStore from "../../stores/SearchFiltersStore";
import { observer } from "mobx-react-lite";

const DogBreedSelector = observer(() => {
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
          value={searchFiltersStore.selectedBreed}
          onChange={(e) => searchFiltersStore.setSelectedBreed(e.target.value)}
          className="w-full md:w-auto border-[1px] border-black rounded-md border-none text-black p-2"
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
});

export default DogBreedSelector;
