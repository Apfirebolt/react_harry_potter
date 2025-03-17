import { create } from "zustand";
import Character from "./types/Character.tsx";
import Spell from "./types/Spell.tsx";
import axiosInstance from "./plugins/interceptor.ts";

interface StoreState {
  characters: Character[];
  spells: Spell[];
  students: Character[];
  getCharacters: () => Character[];
  getSpells: () => Spell[];
  getStudents: () => Character[];
}

const useStore = create<StoreState>((set) => ({
  characters: [],
  spells: [],
  students: [],
  error: null,
  getCharacters: () => {
    const state = useStore.getState();
    return state.characters;
  },
  getSpells: () => {
    const state = useStore.getState();
    return state.spells;
  },
  getStudents: () => {
    const state = useStore.getState();
    return state.students;
  },
  fetchCharacters: async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`characters`);
      set({ characters: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchSpells: async () => {
    try {
      const { data } = await axiosInstance.get<Spell[]>(`spells`);
      set({ spells: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchStudents: async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(
        `characters/students`
      );
      set({ students: data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;
