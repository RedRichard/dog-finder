import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import DogCard from "../DogCard/DogCard";

const DogMatcher = observer(() => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-end">
        <button
          className="bg-cornflower-blue p-4 w-full md:w-1/3 lg:w-1/4 font-semibold text-white rounded-md"
          onClick={() => dogStore.makeMatch()}
        >
          Match!
        </button>
      </div>
      {dogStore.matchedDogData && <DogCard dogData={dogStore.matchedDogData} />}
    </div>
  );
});

export default DogMatcher;
