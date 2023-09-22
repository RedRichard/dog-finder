import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";

const Search = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  useEffect(() => {
    console.log(`selectedBreed: ${selectedBreed}`);
  }, [selectedBreed]);

  return (
    <div>
      <DogBreedSelector
        selectedBreed={selectedBreed}
        handleSelectedBreed={setSelectedBreed}
      />
      <DogList />
    </div>
  );
};

export default Search;
