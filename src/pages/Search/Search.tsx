import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";
import SearchPageSelectors from "../../components/SearchPageSelectors/SearchPageSelectors";

const Search = () => {
  return (
    <div>
      <DogBreedSelector />
      <DogList />
      <SearchPageSelectors />
    </div>
  );
};

export default Search;
