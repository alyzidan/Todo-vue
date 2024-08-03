<template>
  <form action="">
    <InputText
      v-model="name"
      size="large"
      id="email1"
      placeholder="Task Name"
      type="text"
      :invalid="nameError"
      class="w-full mb-3"
    />

    <InputText
      v-model="description"
      size="large"
      id="description"
      placeholder="Task Description"
      type="text"
      aria-label="description"
      :invalid="descriptionError"
      class="w-full mb-3"
    />
    <div class="w-full">
      <!-- Form has edit and create actions -->
      <div v-if="!editMode" class="flex align-items-center">
        <Checkbox
          id="completed"
          :binary="true"
          v-model="checked"
          class="mr-2"
        ></Checkbox>
        <label for="completed"> Completed </label>
      </div>
      <Button
        v-if="!editMode"
        label="Add +"
        severiy="success"
        class="w-full my-4"
        @click="createTask"
        type="submit"
      />
      <div v-else>
        <div class="grid">
          <div class="col-12 md:col-12 lg:col-6">
            <Button
              label="Save"
              severiy="info"
              :disabled="!isEditComitted"
              @click="updateTask"
              class="w-full"
              type="submit"
            />
          </div>
          <div class="col-12 md:col-12 lg:col-6">
            <Button
              label="Cancel"
              severity="secondary"
              raised
              @click="$emit('toggleEditMode')"
              class="w-full"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted } from "vue";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Button from "primevue/button";
import { TodoItem } from "@/store/state";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";

export default defineComponent({
  name: "TodoForm",
  props: {
    id: { type: Number },
    text: { type: String },
    subtitle: { type: String },
    completed: { type: Boolean },
    editMode: { type: Boolean },
  },
  setup(props, context) {
    const name = ref("");
    const description = ref("");
    const nameError = ref(false);
    const descriptionError = ref(false);
    const initialData = reactive<{ name: string; description: string }>({
      name: "",
      description: "",
    });
    const errorMessage = ref("");
    const isTodoExist = ref(false);
    const store = useStore();
    const checked = ref(false);

    onMounted(() => {
      // Filling the form in the edit mode
      if (props.id) {
        initialData.name = props.text || "";
        initialData.description = props.subtitle || "";
        name.value = props.text || "";
        description.value = props.subtitle || "";
      }
    });

    const resetValidation = (): void => {
      nameError.value = false;
      descriptionError.value = false;
      errorMessage.value = "";
    };
    const resetFormData = (): void => {
      description.value = "";
      name.value = "";
      checked.value = false;
    };

    const isEditComitted = computed(
      () =>
        initialData.name !== name.value ||
        initialData.description !== description.value
    );
    const items = computed(() => store.state.items);
    const validateinput = (): boolean => {
      resetValidation();
      //   this here to validate the input from ant special characters
      // eslint-disable-next-line
      const XSSformula = /[&/\\#,+()$~%.^'":*?<>{}]/;
      if (XSSformula.test(name.value)) {
        nameError.value = true;
        errorMessage.value = "Invalid Characters detected";
        return true;
      }

      if (XSSformula.test(description.value)) {
        descriptionError.value = true;
        errorMessage.value = "Invalid Characters detected";
        return true;
      }
      return false;
    };

    const validateTask = (): boolean => {
      if (name.value === "") {
        nameError.value = true;
        errorMessage.value = "name is Required";
        return false;
      }

      if (description.value === "") {
        descriptionError.value = true;
        errorMessage.value = "Description is required";
        return false;
      }

      if (validateinput()) {
        return false;
      }

      return true;
    };

    const updateTask = () => {
      if (!validateTask()) {
        return;
      }
      if (!checkForDublicates()) {
        return;
      }
      store.commit(MutationType.UpdateItem, {
        id: props?.id || 0,
        text: name.value,
        subtitle: description.value,
      });
      resetValidation();
      context.emit("toggleEditMode");
    };

    const checkForDublicates = (): boolean => {
      //  Make sure state doesn't have identical todo's distingushed by task name
      isTodoExist.value = false;
      const value = name.value && name.value.trim();
      const isTodoExists = items.value.find((todo) => todo.text === value);
      if (isTodoExists) {
        isTodoExist.value = true;
        errorMessage.value = "Task with the same name already exists";
        return false;
      }
      return true;
    };

    const createTask = (): void => {
      if (!validateTask()) {
        return;
      }
      if (!checkForDublicates()) {
        return;
      }
      const item: TodoItem = {
        id: Date.now(),
        text: name.value,
        subtitle: description.value,
        completed: checked.value || false,
      };
      store.commit(MutationType.CreateItem, item);
      resetValidation();
      resetFormData();
    };

    return {
      name,
      description,
      updateTask,
      checked,
      createTask,
      validateinput,
      isEditComitted,
      nameError,
      descriptionError,
      initialData,
      errorMessage,
    };
  },
  components: {
    Message,
    InputText,
    Button,
    Checkbox,
  },
});
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
