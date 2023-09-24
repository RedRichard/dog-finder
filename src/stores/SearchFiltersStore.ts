import { makeAutoObservable } from "mobx";
import dogStore from "./DogStore";

interface ISearchParams {
  breeds: string;
}

const DEFAULT_SEARCH_SIZE: number = 25;

class SearchFiltersStore {
  selectedBreed: string = "";
  selectedIndex: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  resetSelectedindex() {
    this.selectedIndex = 0;
  }

  setSelectedBreed(selectedBreed: string) {
    this.selectedBreed = selectedBreed;
    this.resetSelectedindex();
    dogStore.makeDogSearch();
  }

  setSelectedIndex(index: number) {
    this.selectedIndex = index;
    dogStore.makeDogSearch();
  }

  get searchParams() {
    const defaultParams = {
      from: (this.selectedIndex * DEFAULT_SEARCH_SIZE).toString(),
      size: DEFAULT_SEARCH_SIZE.toString(),
    };
    if (this.selectedBreed)
      return { breeds: this.selectedBreed, ...defaultParams };
    else return defaultParams;
  }

  get numPageSelector() {
    return Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE);
  }
}

const searchFiltersStore = new SearchFiltersStore();

export default searchFiltersStore;
