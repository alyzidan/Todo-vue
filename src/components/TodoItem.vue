<template>
  <div class="mb-5">
    <div class="surface-card shadow-2 p-3 border-round">
      <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
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
              <div class="flex align-items-center text-700 flex-wrap">
                <div class="mr-5 flex align-items-center mt-3">
                  <!-- <i class="pi pi-users mr-2"></i> -->
                  <span>{{ subtitle }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 lg:mt-0">
            <Button
              label="Edit"
              raised
              class="p-button-outlined mr-2"
              icon="pi pi-file-edit"
              @click="toggleEdit"
            ></Button>

            <Button
              v-if="completed"
              raised
              label="In Progress"
              icon="pi pi-spinner"
              @click="toggleCompletion()"
              class="p-button-outlined mr-2"
            ></Button>
            <Button
              v-else
              raised
              label="Done"
              icon="pi pi-check"
              @click="toggleCompletion()"
              class="mr-2"
              severity="primary"
            ></Button>
            <Button
              raised
              icon="pi pi-times-circle"
              @click="removeTask()"
              label="Remove"
              severity="danger"
            />

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

// import Select from "primevue/select";
// import Checkbox from "primevue/checkbox";

// import Panel from "primevue/panel";

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
</style>
