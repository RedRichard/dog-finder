import { observer } from "mobx-react-lite";
import dogStore from "../../stores/DogStore";
import MatchedDogCard from "../MatchedDogCard/MatchedDogCard";

const DogMatcher = observer(() => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-end">
        <button
          className="hover:bg-slate-800 bg-cornflower-blue p-4 w-full md:w-1/3 lg:w-1/4 font-semibold text-white rounded-md"
          onClick={() => dogStore.makeMatch()}
        >
          Match!
        </button>
      </div>

      {dogStore.matchedDogData && (
        <div className="font-bold text-xl pt-10 pb-4">{`Meet ${dogStore.matchedDogData?.name}, your new best friend!`}</div>
      )}
      <div className="flex flex-row justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3">
          {dogStore.matchedDogData && (
            <MatchedDogCard dogData={dogStore.matchedDogData} />
          )}
        </div>
      </div>
    </div>
  );
});

export default DogMatcher;
