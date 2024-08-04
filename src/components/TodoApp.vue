<template>
  <div
    class="surface-card text-center p-4 surface-500 shadow-2 border-round w-full lg:w-full xl:w-7"
  >
    <div class="text-900 text-3xl font-medium mb-5">Todo App</div>
    <TodoForm></TodoForm>
    <DragList></DragList>

    <div class="text-center my-5" v-if="items.length < 1">
      <p>You don't have any todos yet</p>
      <p>Start add by filling the form above</p>
    </div>
    <div v-else>
      <p>You have {{ totalCount }} Tasks, and {{ completedCount }} Completed</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TodoForm from "@/components/Form/TodoForm.vue";
import DragList from "@/components/DragList.vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { TodoItem as TodoItemType } from "@/store/state";

export default defineComponent({
  setup() {
    const store = useStore();
    // Draggable item as computed getter and setter for testing puposes
    const completedCount = computed(() => store.getters["completedCount"]);
    const totalCount = computed(() => store.getters["totalCount"]);

    const items = computed({
      get() {
        return store.state.items;
      },
      set(newValue: TodoItemType[]) {
        store.commit(MutationType.SetItems, newValue);
      },
    });
    return {
      items,
      completedCount,
      totalCount,
    };
  },
  components: {
    TodoForm,
    DragList,
  },
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
.surface-card {
  margin: auto;
  background: #fff !important;
  min-height: 100vh;
  height: auto;
}
</style>
