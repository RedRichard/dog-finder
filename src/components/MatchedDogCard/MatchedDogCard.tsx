import { observer } from "mobx-react-lite";
import IDog from "../../interfaces/IDog";

interface IMatchedDogCard {
  dogData: IDog;
}

const MatchedDogCard = observer(({ dogData }: IMatchedDogCard) => {
  return (
    <div className="bg-royal-purple rounded-md overflow-hidden">
      <div className="flex flex-col justify-center">
        <img
          src={dogData.img}
          alt={`${dogData.name}'s photo`}
          className="object-cover w-full "
        />
      </div>
      <div className="flex flex-row p-2 rounded-md text-white justify-between">
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
    </div>
  );
});

export default MatchedDogCard;
