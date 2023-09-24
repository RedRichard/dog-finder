import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";
import SearchPageSelectors from "../../components/SearchPageSelectors/SearchPageSelectors";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import SelectedDogList from "../../components/SelectedDogList/SelectedDogList";

const Search = observer(() => {
  return (
    <div>
      <DogBreedSelector />
      <DogList />
      <SearchPageSelectors />

      {dogStore.selectedDogsId && <SelectedDogList />}
    </div>
  );
});

export default Search;
