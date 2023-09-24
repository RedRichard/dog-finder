import React, { useState, useEffect } from "react";
import DogCard from "../DogCard/DogCard";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import dogStore from "../../stores/DogStore";
import searchFiltersStore from "../../stores/SearchFiltersStore";
import PageSelector from "../PageSelector/PageSelector";

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

      <div className="flex flex-row gap-2 justify-center">
        {dogStore.dogSearch &&
          [
            ...Array(Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE)),
          ].map((x, index) => <PageSelector page={index} key={index} />)}
      </div>
    </div>
  );
});

export default DogList;
