import { makeAutoObservable } from "mobx";
import dogStore from "./DogStore";

enum SearchParams {
  Breeds = "breeds",
  From = "from",
  Size = "size",
}

const DEFAULT_SEARCH_SIZE: number = 27;

class SearchFiltersStore {
  selectedIndex: number = 0;
  selectedBreed: string | undefined = undefined;
  minAge: number | undefined = undefined;
  maxAge: number | undefined = undefined;
  sortBreed: string = "asc";

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

  setMinAge(age: number) {
    this.minAge = age;
    dogStore.makeDogSearch();
  }

  setMaxAge(age: number) {
    this.maxAge = age;
    dogStore.makeDogSearch();
  }

  setSortBreed(order: string) {
    this.sortBreed = order;
    dogStore.makeDogSearch();
  }

  get searchParams() {
    const params = {
      from: (this.selectedIndex * DEFAULT_SEARCH_SIZE).toString(),
      size: DEFAULT_SEARCH_SIZE.toString(),
      breeds: this.selectedBreed,
      ageMin: this.minAge,
      ageMax: this.maxAge,
      sort: `breed:${this.sortBreed}`,
    };

    const keys: Array<SearchParams> = Object.keys(
      params
    ) as Array<SearchParams>;

    for (let i = 0; i < keys.length; i++) {
      if (params[keys[i]] === undefined) delete params[keys[i]];
    }

    return params;
  }

  get numPageSelector() {
    return Math.ceil(dogStore.dogSearch.total / DEFAULT_SEARCH_SIZE);
  }
}

const searchFiltersStore = new SearchFiltersStore();

export default searchFiltersStore;
