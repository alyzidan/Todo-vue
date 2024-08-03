<template>
  <div class="surface-card p-4 surface-500 shadow-2 border-round w-full lg:w-7">
    <div class="text-center mb-5">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">ToDo App</div>

        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >Create today!</a
        >
        <TodoForm></TodoForm>

        <TodoItem v-for="item in items" :key="item" v-bind="item"></TodoItem>
        <div v-if="items.length < 1">
          <p>you don't have any todos yet</p>
          <p>start add by filling the form above</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import TodoForm from "@/components/Form/TodoForm.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useStore } from "@/store";
// import Checkbox from "primevue/checkbox";
// import InputText from "primevue/inputtext";
// import Button from "primevue/button";
// import Card from "primevue/card";
// import InputGroup from "primevue/inputgroup";
// import InputGroupAddon from "primevue/inputgroupaddon";
// import InputText from "primevue/inputtext";
// import DatePicker from "primevue/datepicker";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const filllll = ref();
    const store = useStore();
    const checked = ref();
    const items = computed(() => store.state.items);

    return { filllll, checked, items };
  },
  components: {
    TodoForm,
    TodoItem,
    // Card,
    // InputGroup,
    // InputGroupAddon,
    // InputText,
    // Button,
    // Checkbox,
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
