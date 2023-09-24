import { makeAutoObservable } from "mobx";

class SearchFiltersStore {
  selectedBreed: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedBreed(selectedBreed: string) {
    this.selectedBreed = selectedBreed;
  }
}

const searchFiltersStore = new SearchFiltersStore();

export default searchFiltersStore;
