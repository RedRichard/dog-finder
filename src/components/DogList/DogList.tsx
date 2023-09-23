import React, { useState, useEffect } from "react";
import IDog from "../../interfaces/IDog";
import DogCard from "../DogCard/DogCard";
import fetchData from "../../utils/fetchData";
import IDogSearch from "../../interfaces/IDogSearch";

const DEFAULT_SEARCH_SIZE: number = 25;

const DogList = () => {
  const [dogSearch, setDogSearch] = useState<IDogSearch>();
  const [dogsData, setDogsData] = useState<Array<IDog>>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const getDogIds = async () => {
      try {
        const res = await fetchData<IDogSearch>({
          endpoint: "/dogs/search",
          params: { size: "5", from: "0" },
        });
        const dogIds = await res.json();
        setDogSearch(dogIds);
      } catch (e) {
        console.error("An error has occurred", e);
      }
    };

    getDogIds();
  }, []);

  useEffect(() => {
    const getDogData = async () => {
      try {
        const res = await fetchData<Array<string>>({
          endpoint: "/dogs",
          body: dogSearch?.resultIds,
        });
        const dogsData = await res.json();
        setDogsData(dogsData);
      } catch (e) {
        console.error("An error has occurred", e);
      }
    };

    if (dogSearch) getDogData();
    console.log(`DogList: ${dogSearch?.total}`);
  }, [dogSearch]);

  return (
    <div>
      {dogsData &&
        dogsData.map((dogData, index) => (
          <div key={index}>
            <DogCard dogData={dogData} />
          </div>
        ))}
      <div className="flex flex-row justify-center gap-2">
        {dogSearch &&
          [...Array(Math.ceil(dogSearch.total / DEFAULT_SEARCH_SIZE))].map(
            (x, index) => (
              <div
                key={index}
                className={`h-4 w-4 cursor-pointer ${
                  (selectedIndex < 4 && index < 9) ||
                  (index < selectedIndex + 5 && index > selectedIndex - 5)
                    ? "block"
                    : "hidden"
                } ${index === selectedIndex ? "text-red-500" : "text-black"}`}
                onClick={(e) => setSelectedIndex(index)}
              >
                {index + 1}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default DogList;
