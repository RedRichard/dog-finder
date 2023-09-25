import React, { useState } from "react";
import IDog from "../../interfaces/IDog";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";

interface IDogCard {
  dogData: IDog;
  removable?: boolean;
}

const DogCard = observer(({ dogData, removable = false }: IDogCard) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className={`p-4 m-1 rounded-md ${
        !removable && dogStore.selectedDogsId[dogData.id]
          ? "bg-royal-purple cursor-default"
          : ""
      }
      ${!removable ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (!removable)
          if (!selected) {
            dogStore.addSelectedDogId(dogData.id);
            setSelected(true);
          } else {
            dogStore.deleteSelectedDogId(dogData.id);
            setSelected(false);
          }
      }}
    >
      <div className="p-4 rounded-md bg-vista-blue">
        <div className="w-full h-full flex flex-row">
          <div className="basis-[70%] flex flex-row p-2 rounded-md text-white justify-between">
            <div className="flex flex-col justify-between">
              <div className="font-semibold">Name</div>
              <div className="font-semibold">Age</div>
              <div className="font-semibold">Breed</div>
              <div className="font-semibold">Zip Code</div>
            </div>
            <div className="flex flex-col text-right justify-between">
              <div>{dogData.name}</div>
              <div>{dogData.age}</div>
              <div>{dogData.breed}</div>
              <div>{dogData.zip_code}</div>
            </div>
          </div>
          <div className="basis-1/3 p-1 flex flex-col justify-center">
            <img
              src={dogData.img}
              alt={`${dogData.name}'s photo`}
              className="object-cover h-[15vh] md:h-[10vh] lg:h-[20vh] w-full rounded-xl"
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
