import React, { useEffect, useState } from "react";
import DogBreedSelector from "../../components/DogBreedSelector/DogBreedSelector";
import DogList from "../../components/DogList/DogList";
import SearchPageSelectors from "../../components/SearchPageSelectors/SearchPageSelectors";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import SelectedDogList from "../../components/SelectedDogList/SelectedDogList";
import DogMatcher from "../../components/DogMatcher/DogMatcher";
import DogAgeSelector from "../../components/DogAgeSelector/DogAgeSelector";
import SortBreedSelector from "../../components/SortBreedSelector/SortBreedSelector";

const Search = observer(() => {
  return (
    <div className="bg-white">
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-md bg-cornflower-blue">
          <SortBreedSelector />
          <DogBreedSelector />
          <DogAgeSelector />
        </div>
      </div>
      <DogList dogsData={dogStore.dogsData} />
      <SearchPageSelectors />

      {Object.keys(dogStore.selectedDogsId).length > 0 && (
        <div>
          <div className="p-4 font-bold text-xl">{`You have selected ${
            dogStore.selectedDogsData.length
          } ${dogStore.selectedDogsData.length > 1 ? "dogs" : "dog"}`}</div>
          <DogList dogsData={dogStore.selectedDogsData} cardsRemovable={true} />
          <DogMatcher />
        </div>
      )}
    </div>
  );
});

export default Search;
