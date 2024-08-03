<template>
  <div>
    <form ref="createTaskForm" action="">
      <!-- <label
        v-if="!editMode"
        for="email1"
        class="block text-900 font-medium mb-2 text-left"
        >Title</label
      > -->
      <InputText
        v-model="name"
        size="large"
        id="email1"
        placeholder="Task Name"
        type="text"
        :invalid="nameError"
        class="w-full mb-3"
      />

      <!-- <label
        v-if="!editMode"
        for="password1"
        class="block text-900 font-medium mb-2 text-left"
        >Description</label
      > -->
      <!-- <p v-for="(error, index) of v$.name.$errors" :key="index"></p> -->
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
                @click="$emit('cancelEdit')"
                class="w-full"
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <Message v-if="errorMessage" severity="error">{{
          errorMessage
        }}</Message>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, reactive, onMounted } from "vue";
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
  setup(props) {
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

    onMounted(() => {
      if (props.id) {
        initialData.name = props.text || "";
        initialData.description = props.subtitle || "";
        name.value = props.text || "";
        description.value = props.subtitle || "";
      }
    });
    const isEditComitted = computed(
      () =>
        initialData.name !== name.value ||
        initialData.description !== description.value
    );
    const items = computed(() => store.state.items);

    const validateinput = (): boolean => {
      resetValidation();
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

    const checked = ref();

    const updateTask = () => {
      if (!validateTask()) {
        return;
      }
      store.commit(MutationType.UpdateItem, {
        id: props?.id || 0,
        text: name.value,
        subtitle: description.value,
      });
      resetValidation();
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

    const createTask = () => {
      if (!validateTask()) {
        return;
      }

      isTodoExist.value = false;
      const value = name.value && name.value.trim();

      if (!value) {
        return;
      }

      //  Make sure state doesn't have identical todo's distingushed by task name
      const isTodoExists = items.value.find((todo) => todo.text === value);
      if (isTodoExists) {
        isTodoExist.value = true;
        errorMessage.value = "this task already exists";
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
    // Card,
    // InputGroup,
    Message,
    InputText,
    Button,
    Checkbox,
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
