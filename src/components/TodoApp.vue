<template>
  <div class="surface-card p-4 surface-500 shadow-2 border-round w-full lg:w-7">
    <div class="text-center mb-5">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">ToDo App</div>

        <a
          class="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
          >Create today!</a
        >
        <TodoForm></TodoForm>
        <!-- <draggable v-bind="options" :list="items">
          <template #item="{ index, element }">
            <p>{{ index + 1 }} . {{ element.text }}</p>
          </template>
        </draggable> -->
        <!-- <TodoItem
          draggable="true"
          v-for="item in items"
          :key="item.id"
          v-bind="item"
        ></TodoItem> -->
        <div v-if="items.length < 1">
          <p>you don't have any todos yet</p>
          <p>start add by filling the form above</p>
        </div>
        <div>
          <!-- <draggable
            v-model="items"
            group="name"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <div>{{ element.name }}</div>
            </template>
          </draggable> -->
        </div>
        <DragList></DragList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import TodoForm from "@/components/Form/TodoForm.vue";
// import TodoItem from "@/components/TodoItem.vue";
import DragList from "@/components/Drag.vue";
import { useStore } from "@/store";
// import Draggable from "vuedraggable";
import { MutationType } from "@/store/mutations";

import { TodoItem as TodoItemType } from "@/store/state";
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const store = useStore();

    // const items = computed(() => store.state.items);
    const items = computed({
      get() {
        return store.state.items;
      },
      set(newValue: TodoItemType[]) {
        store.commit(MutationType.SetItems, newValue);
      },
    });
    // const onDrop = (event: DragEvent, item: TodoItemType): void => {
    //   if (event.dataTransfer) {
    //     const itemID = event.dataTransfer.getData("itemID");
    //     const item = items.value.find((item) => item.id === Number(itemID));
    //   }
    // };
    // const startDrag = (event: DragEvent, item: any): void => {
    //   console.log(event, item);
    //   if (event.dataTransfer) {
    //     event.dataTransfer.dropEffect = "move";
    //     event.dataTransfer.effectAllowed = "move";
    //     event.dataTransfer.setData("itemID", item.id);
    //   }
    // };

    return {
      items,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.surface-card {
  margin: auto;
  background: #fff !important;
  min-height: 100vh;
  height: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
