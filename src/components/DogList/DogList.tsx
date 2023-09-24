import React, { useState, useEffect } from "react";
import DogCard from "../DogCard/DogCard";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import dogStore from "../../stores/DogStore";
import searchFiltersStore from "../../stores/SearchFiltersStore";

const DEFAULT_SEARCH_SIZE: number = 25;

const DogList = observer(() => {
  useEffect(() => {
    dogStore.makeDogSearch();
  }, []);

  return (
    <div>
      {dogStore.dogsData &&
        dogStore.dogsData.map((dogData, index) => (
          <div key={index}>
            <DogCard dogData={dogData} />
          </div>
        ))}
      <div className="flex flex-row justify-center gap-2">
        {dogStore.dogSearch &&
          [
            ...Array(Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE)),
          ].map((x, index) => (
            <div
              key={index}
              className={`h-4 w-4 cursor-pointer ${
                (searchFiltersStore.selectedIndex < 4 && index < 9) ||
                (index < searchFiltersStore.selectedIndex + 5 &&
                  index > searchFiltersStore.selectedIndex - 5)
                  ? "block"
                  : "hidden"
              } ${
                index === searchFiltersStore.selectedIndex
                  ? "text-red-500"
                  : "text-black"
              }`}
              onClick={(e) => searchFiltersStore.setSelectedIndex(index)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </div>
  );
});

export default DogList;
