import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import DogCard from "../DogCard/DogCard";

const SelectedDogList = observer(() => {
  useEffect(() => {
    dogStore.makeSelectedDogsSearch();
  }, []);

  return (
    <div>
      <div>{`You have selected ${dogStore.selectedDogsData.length} dogs`}</div>
      <div>
        {dogStore.selectedDogsData &&
          dogStore.selectedDogsData.map((dogData, index) => (
            <div key={index}>
              <DogCard dogData={dogData} removable />
            </div>
          ))}
      </div>
    </div>
  );
});

export default SelectedDogList;
