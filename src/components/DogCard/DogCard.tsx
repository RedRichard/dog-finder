import React, { useState } from "react";
import IDog from "../../interfaces/IDog";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";

interface IDogCard {
  dogData: IDog;
  removable?: boolean;
}

const DogCard = observer(({ dogData, removable = false }: IDogCard) => {
  return (
    <div
      className={`p-4 ${
        !removable && dogStore.selectedDogsId[dogData.id]
          ? "bg-red-500 cursor-default"
          : ""
      }
      ${!removable ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (!removable) dogStore.addSelectedDogId(dogData.id);
      }}
    >
      <div className="p-4 rounded-md bg-vista-blue text-white">
        <div className="w-full flex flex-row">
          <div className="basis-[70%] flex flex-row p-2 justify-between">
            <div>
              <div className="font-semibold">Name</div>
              <div className="font-semibold">Age</div>
              <div className="font-semibold">Breed</div>
              <div className="font-semibold">Zip Code</div>
            </div>
            <div className="text-right">
              <div>{dogData.name}</div>
              <div>{dogData.age}</div>
              <div>{dogData.breed}</div>
              <div>{dogData.zip_code}</div>
            </div>
          </div>
          <div className="basis-1/3 p-1">
            <img
              src={dogData.img}
              alt={`${dogData.name}'s photo`}
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
        </div>
        {removable && (
          <div
            className="cursor-pointer"
            onClick={() => dogStore.deleteSelectedDogId(dogData.id)}
          >
            x
          </div>
        )}
      </div>
    </div>
  );
});

export default DogCard;
