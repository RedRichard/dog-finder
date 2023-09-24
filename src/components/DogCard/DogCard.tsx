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
      className={`border-[2px] m-1 ${
        !removable && dogStore.selectedDogsId[dogData.id]
          ? "bg-red-500 cursor-default"
          : ""
      }
      ${!removable ? "cursor-pointer" : ""}`}
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
});

export default DogCard;
