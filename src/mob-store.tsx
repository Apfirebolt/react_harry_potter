import { makeAutoObservable, computed } from "mobx";
import Character from "./types/Character.tsx";
import Spell from "./types/Spell.tsx";
import axiosInstance from "./plugins/interceptor.ts";

class Store {
  characters: Character[] = [];
  character: Character | null = null;
  spells: Spell[] = [];
  students: Character[] = [];
  staff: Character[] = [];
  error: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  resetStudents = () => {
    this.students = [];
  };

  fetchCharacters = async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`characters`);
      this.characters = data;
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  };

  fetchSpells = async () => {
    try {
      const { data } = await axiosInstance.get<Spell[]>(`spells`);
      this.spells = data; // Direct mutation
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  };

  fetchStudents = async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(
        `characters/students`
      );
      this.students = data;
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  };

  fetchStaff = async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`characters/staff`);
      this.staff = data; // Direct mutation
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  };

  fetchCharacterById = async (id: string) => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`character/${id}`);
      this.character = data[0]; // Direct mutation
      return this.character;
    } catch (error) {
      console.error(error);
      this.error = error;
      throw error; // Re-throw so the component can handle it if needed
    }
  };

  fetchHouseStudents = async (house: string) => {
    try {
      const { data } = await axiosInstance.get<Character[]>(
        `characters/house/${house}`
      );
      this.students = data; // Direct mutation
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  };

  get getCharacters() {
    return this.characters;
  }

  get getSpells() {
    return this.spells;
  }

  get getStudents() {
    return this.students;
  }

  get getStaff() {
    return this.staff;
  }
}

// 1. Create a single instance of the store
const store = new Store();

// 2. Export the instance for use in components
export default store;