<template>
  <div class="home">
    <TodoApp msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoApp from "@/components/TodoApp.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    TodoApp,
  },
});
</script>
