import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";
import SearchPageSelectors from "../../components/SearchPageSelectors/SearchPageSelectors";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import SelectedDogList from "../../components/SelectedDogList/SelectedDogList";
import DogMatcher from "../../components/DogMatcher/DogMatcher";
import DogAgeSelector from "../../components/DogAgeSelector/DogAgeSelector";

const Search = observer(() => {
  return (
    <div>
      <DogBreedSelector />
      <DogAgeSelector />
      <DogList />
      <SearchPageSelectors />

      {Object.keys(dogStore.selectedDogsId).length > 0 && (
        <div>
          <SelectedDogList />
          <DogMatcher />
        </div>
      )}
    </div>
  );
});

export default Search;
