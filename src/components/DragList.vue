<template>
  <div>
    <draggable
      v-bind="options"
      handle=".drag-cluster:not(button)"
      :list="items"
      itemKey="items"
    >
      <template #item="{ element }">
        <TodoItem :key="element.id" v-bind="element"> </TodoItem>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { ref, computed, reactive } from "vue";
import draggable from "vuedraggable";
import { useStore } from "@/store";
import TodoItem from "@/components/TodoItem.vue";
import { TodoItem as TodoItemType } from "@/store/state";
import { MutationType } from "@/store/mutations";

export default {
  name: "DragList",
  components: {
    draggable,
    TodoItem,
  },
  setup() {
    const store = useStore();
    const drag = ref(false);

    const options = reactive({
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    });
    const items = computed({
      get() {
        return store.state.items;
      },
      set(newValue: TodoItemType[]) {
        store.commit(MutationType.SetItems, newValue);
      },
    });
    const draggableList = ref([
      "AAAAAAAAA",
      "BBBBBBBBBBB",
      "CCCCCCCCCCC",
      "DDDDDDDDD",
      "EEEEEEEEEEE",
      "FFFFFFFFFFFF",
    ]);

    return {
      draggableList,
      options,
      items,
      drag,
    };
  },
};
</script>
