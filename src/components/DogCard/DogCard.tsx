import React from "react";
import IDog from "../../interfaces/IDog";
import dogStore from "../../stores/DogStore";

interface IDogCard {
  dogData: IDog;
  removable?: boolean;
}

const DogCard = ({ dogData, removable = false }: IDogCard) => {
  return (
    <div
      className="border-[2px] m-1"
      onClick={() => {
        // console.log(dogData.id);
        if (!removable) dogStore.addSelectedDogId(dogData.id);
      }}
    >
      <div>{dogData.name}</div>
      <div>{dogData.age}</div>
      <div>{dogData.breed}</div>
      <div>{dogData.zip_code}</div>
      {removable && (
        <div
          className="cursor-pointer"
          onClick={() => dogStore.deleteSelectedDogId(dogData.id)}
        >
          x
        </div>
      )}
    </div>
  );
};

export default DogCard;
