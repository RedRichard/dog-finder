import React, { useState, useEffect } from "react";
import DogCard from "../DogCard/DogCard";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import dogStore from "../../stores/DogStore";
import IDog from "../../interfaces/IDog";

interface IDogList {
  dogsData: Array<IDog>;
  cardsRemovable?: boolean;
}

const DogList = ({ dogsData, cardsRemovable = false }: IDogList) => {
  useEffect(() => {
    dogStore.makeDogSearch();
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      {dogsData &&
        dogsData.map((dogData, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 ">
            <DogCard dogData={dogData} removable={cardsRemovable} />
          </div>
        ))}
    </div>
  );
};

export default DogList;
