<template>
  <div class="mb-5">
    <div class="surface-card shadow-2 p-3 border-round">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-sm text-lg font-medium mb-3 text-left">{{
            text
          }}</span>
          <span class="text-500 font-medium mb-3 text-left">{{
            subtitle
          }}</span>
        </div>
        <div
          class="flex align-items-center justify-content-center bg-blue-100 border-round"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
        </div>
      </div>
      <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
      <p class="text-primary text-right font-medium">
        {{ completed ? "Done" : "inprogress" }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    subtitle: { type: String, required: false },
    completed: { type: Boolean, required: true },
  },
  components: {
    // Card,
    // InputGroup,
    // InputGroupAddon,
    // InputText,
    // Button,
    // Checkbox,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
