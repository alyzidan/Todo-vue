<template>
  <div>
    <form ref="createTaskForm" action="">
      <label
        v-if="!editMode"
        for="email1"
        class="block text-900 font-medium mb-2 text-left"
        >Title</label
      >
      <InputText
        v-model="name"
        size="large"
        id="email1"
        type="text"
        :invalid="nameError"
        class="w-full mb-3"
      />

      <label
        v-if="!editMode"
        for="password1"
        class="block text-900 font-medium mb-2 text-left"
        >Description</label
      >
      <!-- <p v-for="(error, index) of v$.name.$errors" :key="index"></p> -->
      <InputText
        v-model="description"
        size="large"
        id="description"
        type="text"
        aria-label="description"
        :invalid="descriptionError"
        class="w-full mb-3"
      />
      <div class="flex align-items-center justify-content-between">
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
          @click="createTask"
          type="submit"
        />
        <div v-else>
          <div class="flex flex-wrap gap-1 md:gap-4 xl:gap-8">
            <div
              class="border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center"
            >
              <Button
                label="Save"
                severiy="info"
                :disabled="!isEditComitted"
                @click="createTask"
                class="w-full"
                type="submit"
              />
            </div>
            <div
              class="border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center"
            >
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
    const editMode = ref(false);
    const isTodoExist = ref(false);
    const store = useStore();
    const resetValidation = (): void => {
      nameError.value = false;
      descriptionError.value = false;
      errorMessage.value = "";
    };
    onMounted(() => {
      if (props.id) {
        initialData.name = props.text || "";
        initialData.description = props.subtitle || "";
        editMode.value = true;
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

    // indicator if the todo exist
    const todoExists: Ref<string> = computed(() =>
      isTodoExist.value ? "todo already Exists" : ""
    );
    const updateTask = () => {
      store.commit(MutationType.UpdateItem, {
        id: props?.id || 0,
        text: name.value,
        subtitle: description.value,
      });
    };
    const createTask = async () => {
      if (name.value === "") {
        nameError.value = true;
        errorMessage.value = "name is Required";
        return;
      }

      if (description.value === "") {
        descriptionError.value = true;
        errorMessage.value = "Description is required";
        return;
      }

      if (validateinput()) {
        return;
      }

      isTodoExist.value = false;

      const value = name.value && name.value.trim();

      if (!value) {
        return;
      }

      //  Make sure state doesn't have identical todo's
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
        completed: checked.value,
      };
      store.commit(MutationType.CreateItem, item);

      description.value = "";
      name.value = "";
      checked.value = false;
      resetValidation();
    };
    // const validationState = reactive({});
    // const rules = {};
    // const v$ = useVuelidate(rules, validationState, { $lazy: true });
    // return { validationState, v$, filllll, checked };
    return {
      name,
      description,
      editMode,
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
