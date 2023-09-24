import React from "react";
import IDog from "../../interfaces/IDog";
import dogStore from "../../stores/DogStore";

interface IDogCard {
  dogData: IDog;
}

const DogCard = ({ dogData }: IDogCard) => {
  return (
    <div
      className="border-[2px] m-1"
      onClick={() => {
        // console.log(dogData.id);
        dogStore.addSelectedDogId(dogData.id);
      }}
    >
      <div>{dogData.name}</div>
      <div>{dogData.age}</div>
      <div>{dogData.breed}</div>
      <div>{dogData.zip_code}</div>
    </div>
  );
};

export default DogCard;
