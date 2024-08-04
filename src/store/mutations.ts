import { MutationTree } from "vuex";
import { State, TodoItem } from "./state";

export enum MutationType {
  CreateItem = "CREATE_ITEM",
  SaveState = "SAVE_STATE",
  SetItems = "SET_ITEMS",
  RemoveItem = "REMOVE_ITEM",
  UpdateItem = "UPDATE_ITEM",
}
// defining method types and return type
export type Mutations = {
  [MutationType.CreateItem](state: State, item: TodoItem): void;
  [MutationType.SetItems](state: State, items: TodoItem[]): void;
  [MutationType.UpdateItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void;
  [MutationType.RemoveItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  // Create a new todo mutation
  [MutationType.CreateItem](state, item) {
    state.items.unshift(item);
  },
  // Set the Todos items array
  [MutationType.SetItems](state, items) {
    state.items = items;
  },
  //   mark completed change name and description
  [MutationType.UpdateItem](state, newItem) {
    const item = state.items.findIndex((s) => s.id === newItem.id);
    if (item === -1) return;
    state.items[item] = { ...state.items[item], ...newItem };
  },
  [MutationType.RemoveItem](state, newItem) {
    const clearedItem = state.items.filter((s) => s.id !== newItem.id);
    state.items = clearedItem;
  },
};
