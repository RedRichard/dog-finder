import React, { useState, useEffect } from "react";
import IDog from "../../interfaces/IDog";
import DogCard from "../DogCard/DogCard";
import fetchData from "../../utils/fetchData";
import IDogSearch from "../../interfaces/IDogSearch";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import dogStore from "../../stores/DogStore";

const DEFAULT_SEARCH_SIZE: number = 25;

const DogList = observer(() => {
  // const [dogSearch, setDogSearch] = useState<IDogSearch>();
  // const [dogsData, setDogsData] = useState<Array<IDog>>();
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    dogStore.makeDogSearch();
  }, []);

  useEffect(
    () =>
      autorun(() => {
        console.log("autorun");
        console.log(dogStore.dogsData);
      }),
    []
  );

  // useEffect(() => {
  //   const getDogIds = async () => {
  //     try {
  //       const res = await fetchData<IDogSearch>({
  //         endpoint: "/dogs/search",
  //         params: {
  //           size: DEFAULT_SEARCH_SIZE.toString(),
  //           from: (selectedIndex * DEFAULT_SEARCH_SIZE).toString(),
  //           sort: "breed:asc",
  //         },
  //       });
  //       const dogIds = await res.json();
  //       setDogSearch(dogIds);
  //     } catch (e) {
  //       console.error("An error has occurred", e);
  //     }
  //   };

  //   getDogIds();
  // }, [selectedIndex]);

  // useEffect(() => {
  //   const getDogData = async () => {
  //     try {
  //       const res = await fetchData<Array<string>>({
  //         endpoint: "/dogs",
  //         body: dogSearch?.resultIds,
  //       });
  //       const dogsData = await res.json();
  //       setDogsData(dogsData);
  //     } catch (e) {
  //       console.error("An error has occurred", e);
  //     }
  //   };

  //   if (dogSearch) getDogData();
  //   console.log(`DogList: ${dogSearch?.total}`);
  // }, [dogSearch]);

  return (
    <div>
      {dogStore.dogsData &&
        dogStore.dogsData.map((dogData, index) => (
          <div key={index}>
            <DogCard dogData={dogData} />
          </div>
        ))}
      <div className="flex flex-row justify-center gap-2">
        {dogStore.dogSearch &&
          [
            ...Array(Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE)),
          ].map((x, index) => (
            <div
              key={index}
              className={`h-4 w-4 cursor-pointer ${
                (dogStore.selectedIndex < 4 && index < 9) ||
                (index < dogStore.selectedIndex + 5 &&
                  index > dogStore.selectedIndex - 5)
                  ? "block"
                  : "hidden"
              } ${
                index === dogStore.selectedIndex ? "text-red-500" : "text-black"
              }`}
              onClick={(e) => dogStore.setSelectedIndex(index)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </div>
  );
});

export default DogList;
