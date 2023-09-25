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
    <div className="flex flex-row flex-wrap">
      {dogStore.dogsData &&
        dogStore.dogsData.map((dogData, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 ">
            <DogCard dogData={dogData} />
          </div>
        ))}
    </div>
  );
});

export default DogList;
