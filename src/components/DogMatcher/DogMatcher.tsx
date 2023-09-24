import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import DogCard from "../DogCard/DogCard";

const DogMatcher = observer(() => {
  return (
    <div>
      <button
        className="bg-blue-500 text-white rounded-md"
        onClick={() => dogStore.makeMatch()}
      >
        Match
      </button>
      {dogStore.matchedDogData && <DogCard dogData={dogStore.matchedDogData} />}
    </div>
  );
});

export default DogMatcher;
