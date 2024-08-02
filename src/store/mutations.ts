import { MutationTree } from "vuex";
import { State, TodoItem } from "./state";

export enum MutationType {
  CreateItem = "CREATE_ITEM",
  SaveState = "SAVE_STATE",
  SetItems = "SET_ITEMS",
  CompleteItem = "COMPLETE_ITEM",
  SetLoading = "SET_LOADING",
}

export type Mutations = {
  [MutationType.CreateItem](state: State, item: TodoItem): void;
  [MutationType.SetItems](state: State, items: TodoItem[]): void;
  [MutationType.CompleteItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void;
  [MutationType.SetLoading](state: State, value: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  // Create a new todo mutation
  [MutationType.CreateItem](state, item) {
    state.items.unshift(item);
  },
  // Reset the items array
  [MutationType.SetItems](state, items) {
    state.items = items;
  },
  //   mark completed
  [MutationType.CompleteItem](state, newItem) {
    console.log(newItem);
    const item = state.items.findIndex((s) => s.id === newItem.id);
    if (item === -1) return;
    state.items[item] = { ...state.items[item], ...newItem };
  },
  //   Turn on loading indicator
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
};
