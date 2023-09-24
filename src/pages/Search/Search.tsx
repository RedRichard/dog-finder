import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";
import { autorun } from "mobx";
import searchFiltersStore from "../../stores/SearchFiltersStore";

const Search = () => {
  // const [selectedBreed, setSelectedBreed] = useState<string>("");

  // useEffect(() => {
  //   console.log(`selectedBreed: ${selectedBreed}`);
  // }, [selectedBreed]);

  useEffect(() => {
    autorun(() => {
      console.log(searchFiltersStore.selectedBreed);
    });
  }, []);

  return (
    <div>
      <DogBreedSelector />
      <DogList />
    </div>
  );
};

export default Search;
