import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import searchFiltersStore from "../../stores/SearchFiltersStore";
import { observer } from "mobx-react-lite";

const SortBreedSelector = observer(() => {
  return (
    <div>
      <label htmlFor="dog-breeds">
        <select
          id="dog-breeds"
          name="dog-breeds"
          value={searchFiltersStore.sortBreed}
          onChange={(e) => searchFiltersStore.setSortBreed(e.target.value)}
          className="w-full md:w-auto border-[1px] border-black rounded-md border-none text-black p-2"
        >
          <option value="asc">Breed Asc</option>
          <option value="desc">Breed Desc</option>
        </select>
      </label>
    </div>
  );
});

export default SortBreedSelector;
