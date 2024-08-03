<template>
  <div class="home">
    <TodoApp msg="Todo App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TodoApp from "../components/TodoApp.vue"; // @ is an alias to /src

export default defineComponent({
  name: "TodoAppView",
  components: {
    TodoApp,
  },
});
</script>
