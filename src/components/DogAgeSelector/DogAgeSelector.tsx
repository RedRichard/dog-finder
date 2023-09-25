import React from "react";
import { observer } from "mobx-react-lite";
import searchFiltersStore from "../../stores/SearchFiltersStore";

const DogAgeSelector = observer(() => {
  return (
    <div className="flex flex-row gap-4 justify-between md:justify-start">
      <label htmlFor="dog-age-min" className="text-white">
        Min Age
        <select
          id="dog-age-min"
          name="dog-age-min"
          value={searchFiltersStore.minAge}
          onChange={(e) =>
            searchFiltersStore.setMinAge(parseInt(e.target.value))
          }
          className="ml-2 border-[1px] border-black rounded-md border-none text-black p-2"
        >
          {[...Array(20)].map((_, index) => (
            <option key={index}>{index}</option>
          ))}
        </select>
      </label>
      <label htmlFor="dog-age-max" className="text-white">
        {" "}
        Max Age
        <select
          id="dog-age-max"
          name="dog-age-max"
          value={searchFiltersStore.maxAge}
          onChange={(e) =>
            searchFiltersStore.setMaxAge(parseInt(e.target.value))
          }
          className="ml-2 border-[1px] border-black rounded-md border-none text-black p-2"
        >
          {[...Array(20)].map((_, index) => (
            <option key={index}>{index}</option>
          ))}
        </select>
      </label>
    </div>
  );
});

export default DogAgeSelector;
