import React from "react";
import searchFiltersStore from "../../stores/SearchFiltersStore";

interface IPageSelector {
  page: number;
}

const PageSelector = ({ page }: IPageSelector) => {
  return (
    <>
      {((searchFiltersStore.selectedIndex < 4 && page < 9) ||
        (page < searchFiltersStore.selectedIndex + 5 &&
          page > searchFiltersStore.selectedIndex - 5)) && (
        <div
          className={`h-4 w-4 cursor-pointer  ${
            page === searchFiltersStore.selectedIndex
              ? "text-red-500"
              : "text-black"
          }`}
          onClick={(e) => searchFiltersStore.setSelectedIndex(page)}
        >
          {page + 1}
        </div>
      )}
    </>
  );
};

export default PageSelector;
