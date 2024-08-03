<template>
  <div class="mb-5">
    <div class="surface-card shadow-2 p-1">
      <div class="surface-section px-1 py-3 md:px-2 border-round">
        <div
          class="flex align-items-start flex-column lg:justify-content-between lg:flex-row"
        >
          <div>
            <div v-if="editMode">
              <TodoForm
                @cancelEdit="toggleEdit"
                :editMode="editMode"
                :key="item"
                v-bind="item"
              ></TodoForm>
            </div>
            <div
              v-if="!editMode"
              :class="[
                { 'line-through': completed },
                'font-medium text-left text-3xl text-900',
              ]"
            >
              {{ text }}
              <p class="subtitle">{{ subtitle }}</p>
            </div>
          </div>

          <div class="mt-3 col-12 lg:col-6 lg:mt-0">
            <div class="grid">
              <div class="col-12 md:col-12 lg:col-4">
                <Button
                  label="Edit"
                  raised
                  class="p-button-outlined w-full"
                  icon="pi pi-file-edit"
                  @click="toggleEdit"
                ></Button>
              </div>
              <div class="col-12 md:col-12 lg:col-4">
                <Button
                  v-if="completed"
                  raised
                  label="In Progress"
                  icon="pi pi-spinner"
                  @click="toggleCompletion()"
                  class="p-button-outlined w-full"
                ></Button>
                <Button
                  v-else
                  raised
                  label="Done"
                  icon="pi pi-check"
                  @click="toggleCompletion()"
                  class="mr-2 w-full"
                  severity="primary"
                ></Button>
              </div>
              <div class="col-12 md:col-12 lg:col-4">
                <Button
                  raised
                  icon="pi pi-times-circle"
                  @click="removeTask()"
                  label="Remove"
                  class="mr-2 w-full"
                  severity="danger"
                />
              </div>
            </div>

            <!-- <Button label="Save" ></Button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import Button from "primevue/button";
import TodoForm from "@/components/Form/TodoForm.vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    subtitle: { type: String, required: false },
    completed: { type: Boolean, required: true },
  },
  components: {
    TodoForm,
    Button,
  },
  setup(props) {
    const store = useStore();
    const editMode = ref(false);

    const item = computed(() =>
      store.state.items.find((item) => item.id == props.id)
    );

    const controls = ref([
      { name: "In Progress", code: "IP" },
      { name: "Done", code: "DN" },
    ]);

    const toggleEdit = () => {
      editMode.value = !editMode.value;
      console.log(editMode.value);
    };
    const removeTask = () => {
      store.commit(MutationType.RemoveItem, {
        id: props.id,
      });
    };
    const toggleCompletion = () => {
      store.commit(MutationType.UpdateItem, {
        id: props.id,
        completed: !props.completed,
      });
    };

    return {
      toggleCompletion,
      removeTask,
      controls,
      item,
      editMode,
      toggleEdit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.subtitle {
  font-size: 15px;
}
</style>
